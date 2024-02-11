import { inappRegex } from "./regexInApp";
import { getUA } from "./utils";
import { getAppKey, appNameRegExps } from "./regexAppName";

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
  return {
    isInApp,
    appKey,
    appName: appKey ? appNameRegExps[appKey].name : undefined,
    ua: userAgent,
  };
};

export default InAppSpy;
