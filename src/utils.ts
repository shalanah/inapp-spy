import { AppKey, Skip } from "./types";

export const WIN_ERROR =
  "Window is not available and no user agent was provided.";

export const getUA = (): string => {
  if (typeof window !== "undefined") {
    const ua =
      window?.navigator?.userAgent ||
      window?.navigator?.vendor ||
      // @ts-ignore
      window?.opera;
    if (ua) return ua;
  }
  console.error(WIN_ERROR);
  return "";
};

export const empty = {
  isInApp: false,
  appKey: undefined,
  appName: undefined,
  skipped: false,
};

export const getIsAppleDevice = (ua: string) => {
  return ua.match(/(iPhone|iPad|iPod|Macintosh)/) !== null;
};

export const checkSkip = ({
  skip,
  appKey,
  ua,
}: {
  skip?: Skip;
  appKey: AppKey;
  ua: string;
}) => {
  if (!skip || skip.length === 0) return false;
  const isApple = getIsAppleDevice(ua);
  return skip.some(
    ({ appKey: excludeAppKey, platform }) =>
      appKey === excludeAppKey &&
      (!platform ||
        (isApple && platform === "apple") ||
        (!isApple && platform === "android"))
  );
};

// True for Safari on iOS, iPadOS, macOS
const isSafariRegex = new RegExp(
  /Mozilla\/5\.0 \([^\)]+\) AppleWebKit\/[^\s]+ \(KHTML, like Gecko\) Version\/[^\s]+ (Mobile\/[^\s]+ )?Safari\/[^\s]+$/
);

export const getIsSafariUA = (ua: string) => {
  return isSafariRegex.test(ua);
};

// source https://github.com/bowser-js/bowser/issues/510
export const isiOS = (ua: string) => {
  return (
    [
      "iPad Simulator",
      "iPhone Simulator",
      "iPod Simulator",
      "iPad",
      "iPhone",
      "iPod",
    ].includes(ua) ||
    // iPad on iOS 13 detection
    (window &&
      window.document &&
      ua.includes("Mac") &&
      "ontouchend" in window.document)
  );
};

export const getSafariVersion = (ua: string) => {
  const match = [...ua.matchAll(/Version\/([^\s]+)/g)];
  return match[0][1]; // right now just returns 17 or 18 etc (major version) but could be more specific
};

export const delay = (ms: number) => new Promise((res) => setTimeout(res, ms));

export async function waitForPageLoad() {
  return new Promise((resolve) => {
    if (window.document.readyState === "complete") {
      // Resolve immediately if readyState is already 'complete'
      resolve(true);
    } else {
      // Otherwise, listen for the load event
      const onLoad = () => {
        resolve(true);
        window.removeEventListener("load", onLoad);
      };
      window.addEventListener("load", onLoad);
    }
  });
}

// Function to poll for properties on the window object
export const pollForProperties = async ({
  maxTime,
  properties,
  interval,
}: {
  properties: string[];
  maxTime: number;
  interval: number;
}) => {
  let elapsed = 0;

  return new Promise((resolve) => {
    const intervalId = setInterval(() => {
      elapsed += interval;

      // Check if any of the properties exist on window
      for (const property of properties) {
        if (property in window) {
          clearInterval(intervalId);
          resolve(true); // Resolve if the property is found
          return;
        }
      }

      // If time exceeds the timeout, stop polling and resolve false
      if (elapsed >= maxTime) {
        clearInterval(intervalId);
        resolve(false);
      }
    }, interval);
  });
};
