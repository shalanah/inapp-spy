import { getIsTelegram } from "./detectionTelegram";
import { getUA } from "./utils";

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

// Good enough for our usage - no prerelease versions or alpha/beta versions
// -1 if a < b, 0 if a == b, 1 if a > b
export const compare = (a: string, b: string) => {
  return a.localeCompare(b, undefined, { numeric: true, sensitivity: "base" });
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
const pollForProperties = async ({
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

const consoleDebug = ({
  note,
  debug,
  last,
}: {
  note?: string;
  debug: boolean;
  last?: boolean;
}) => {
  if (debug) {
    console.log(
      note,
      "SchemaDataExtractor" in window || "MicrodataExtractor" in window
        ? "This is Safari"
        : last
          ? "Did not detect Safari - assuming SFSVC"
          : "Still checking if Safari",
      performance.now()
    );
  }
};

// !! Experimental !!
// *** Could give us a false positive ***
// *** Escape hatch is `maxVersion` - Max Safari Version ***
const minSafariVersion = "17"; // could possibly be lower would need to check 16
export const getSFSVCExperimental = async ({
  debug = false,
  maxVersion,
  maxTime = 300, // Max time to figure out if it is Safari (ie not SFSVC)
}: {
  debug?: boolean;
  maxTime?: number;
  maxVersion?: string;
} = {}) => {
  const ua = getUA();

  if (!ua) return false; // No user agent
  if (!isiOS(ua)) return false; // iPad or iPhone
  if (!getIsSafariUA(ua)) return false; // Safari
  if ("clearAppBadge" in (window?.navigator || {})) return false; // PWAs

  // Targeted versions of Safari that we'll check
  const version = getSafariVersion(ua);
  if (compare(version, minSafariVersion) < 0) return false;
  if (
    maxVersion !== undefined &&
    (compare(maxVersion, minSafariVersion) < 0 ||
      compare(version, maxVersion) > 0)
  )
    return false;

  if (getIsTelegram()) return false;

  // Wait for SchemaDataExtractor or MicrodataExtractor to be defined
  // This is experimental!
  await waitForPageLoad();
  if (debug) consoleDebug({ note: "Page loaded", debug });

  // Poll for the properties (SchemaDataExtractor or MicrodataExtractor)
  const isSafari = await pollForProperties({
    interval: 60,
    maxTime,
    properties: ["SchemaDataExtractor", "MicrodataExtractor"],
  });

  if (debug) consoleDebug({ note: "Extra polling done", debug, last: true });

  return !isSafari;
};
