import { checkSkip, getUA } from "./utils";
import { appNameCustom, getDetectClientSide } from "./detectClientSide";
import { AppKey, AppName, Skip } from "./types";
import { empty } from "./utils";
import { appNameRegExps, getAppKey } from "./regexAppName";
import { inappRegex } from "./regexInApp";
import { getSFSVCExperimental } from "./detectSFSVC";

declare const __GLOBAL__: boolean;

const InAppSpy = (
  options: {
    ua?: string;
    skip?: Skip;
  } = {}
): {
  ua: string;
  isInApp: boolean;
  appKey: AppKey;
  appName: AppName;
  skipped: boolean; // a helper to know if we successfully skipped the app
} => {
  const { skip, ua = "" } = options;
  const userAgent = ua || getUA();

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
  const uaAppKey = getAppKey(userAgent);
  if (uaAppKey || userAgent.match(inappRegex) !== null) {
    if (skipFn(uaAppKey)) return { ...empty, ua: userAgent, skipped: true };
    return {
      isInApp: true,
      appKey: uaAppKey,
      appName: uaAppKey ? appNameRegExps[uaAppKey]!.name : undefined,
      ua: userAgent,
      skipped: false,
    };
  }

  // Client side only detections (needs window)
  const clientAppKey = getDetectClientSide();
  if (clientAppKey) {
    if (skipFn(clientAppKey)) return { ...empty, ua: userAgent, skipped: true };
    return {
      isInApp: true,
      appKey: clientAppKey,
      appName: appNameCustom?.[clientAppKey]?.name,
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

// Only attach if UMD build (CDN build)
if (typeof window !== "undefined" && __GLOBAL__) {
  (window as any).InAppSpy = InAppSpy; // Default export
  (window as any).SFSVCExperimental = SFSVCExperimental; // Named export
}
