import { checkSkip, getUA } from "./utils";
import { appNameCustom, getDetectionCustom } from "./detectionCustom";
import { AppKey, AppName, Skip } from "./types";
import { empty } from "./utils";
import { appNameRegExps, getAppKey } from "./regexAppName";
import { inappRegex } from "./regexInApp";
import { getSFSVCExperimental } from "./detectionSFSVC";

const InAppSpy = (
  options: {
    skip?: Skip;
  } = {}
): {
  ua: string;
  isInApp: boolean;
  appKey: AppKey;
  appName: AppName;
  skipped: boolean; // a helper to know if we successfully skipped the app
} => {
  const { skip } = options;
  const userAgent = getUA();

  // No userAgent
  if (!userAgent)
    return {
      ...empty,
      ua: userAgent,
    };

  // If user provides a list of apps to skip
  const skipFn = (key: AppKey) =>
    checkSkip({ skip, appKey: key, ua: userAgent });

  // UA detection method (most common)
  // - This method should be used first - order matters
  if (userAgent.match(inappRegex) !== null) {
    const appKey = getAppKey(userAgent);
    if (skipFn(appKey)) return { ...empty, ua: userAgent, skipped: true };
    return {
      isInApp: true,
      appKey: appKey,
      appName: appKey ? appNameRegExps[appKey]!.name : undefined,
      ua: userAgent,
      skipped: false,
    };
  }

  // Custom detection
  // - Cannot be parsed via ua only (ie via window keys instead)
  const appKey = getDetectionCustom();
  if (appKey) {
    if (skipFn(appKey)) return { ...empty, ua: userAgent, skipped: true };
    return {
      isInApp: true,
      appKey: appKey,
      appName: appNameCustom?.[appKey]?.name,
      ua: userAgent,
      skipped: false,
    };
  }

  // Didn't find anything
  return {
    ...empty,
    ua: userAgent,
  };
};

// Separate exports for experimental detection
export const SFSVCExperimental = getSFSVCExperimental;
export default InAppSpy;

// For our global exports
if (typeof window !== "undefined") {
  (window as any).InAppSpy = InAppSpy; // Default export
  (window as any).SFSVCExperimental = SFSVCExperimental; // Named export
}
