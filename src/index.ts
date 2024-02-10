import { getAppName, inappRegex } from "./regex";
import { getUA } from "./utils";

console.log("here -test");

const InAppSpy = (options: { ua?: string } | undefined = {}) => {
  const { ua } = options;
  let userAgent = ua || getUA();
  if (!userAgent) {
    return {
      isInApp: false,
      appName: undefined,
      ua: userAgent,
    };
  }

  const isInApp = userAgent.match(inappRegex) !== null;
  return {
    isInApp,
    appName: isInApp ? getAppName(userAgent) : undefined,
    ua: userAgent,
  };
};

export default InAppSpy;
