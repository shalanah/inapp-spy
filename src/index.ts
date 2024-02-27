import { inappRegex } from "./regexInApp";
import { getUA } from "./utils";
import { getAppKey, appNameRegExps } from "./regexAppName";
import { getIsSFSafariViewController } from "./regexSFSafariViewController";

const InAppSpy = (options: { ua?: string } | undefined = {}) => {
  const { ua } = options;
  let userAgent = ua || getUA();
  if (!userAgent) {
    return {
      isInApp: false,
      appKey: undefined,
      appName: undefined,
      ua: userAgent,
    };
  }

  const isInApp = userAgent.match(inappRegex) !== null;
  const appKey = isInApp ? getAppKey(userAgent) : undefined;

  // Experimental: SFSafariViewController detection 👩🏻‍🔬
  const isSFSafariViewController = getIsSFSafariViewController({
    ua: userAgent,
    isInApp,
  });

  return {
    isInApp,
    appKey,
    appName: appKey ? appNameRegExps[appKey].name : undefined,
    isSFSafariViewController, // Experimental
    ua: userAgent,
  };
};

export default InAppSpy;
