import { getIsSafariPrivate } from "./detectSafariPrivate";
import { getIsTelegram } from "./detectTelegram";
import {
  getIsSafariUA,
  getSafariVersion,
  getUA,
  isiOS,
  pollForProperties,
  waitForPageLoad,
} from "./utils";

// Good enough for our usage - no prerelease versions or alpha/beta versions
// -1 if a < b, 0 if a == b, 1 if a > b
const compare = (a: string, b: string) => {
  return a.localeCompare(b, undefined, { numeric: true, sensitivity: "base" });
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

const minSafariVersion = "17"; // could possibly be lower would need to check 16

/**
 * Experimental function to detect SFSVC (Safari View Controller)
 * - !!! Can give false positives !!!
 * - Feedback welcome for better detection or improvements
 * - Checks for `SchemaDataExtractor` or `MicrodataExtractor` in window to determine if it is Safari
 */
export const getSFSVCExperimental = async ({
  debug = false,
  maxVersion,
  maxTime = 300, // Max time to figure out if it is Safari (ie not SFSVC)
}: {
  /** Turn on console logs while debugging */
  debug?: boolean;
  /** Increase polling to confirm this is Safari with the required window properties */
  maxTime?: number;
  /** Max Safari version you wish detect SFSVC - escape hatch for unpredictable Apple behavior */
  maxVersion?: string;
} = {}) => {
  const ua = getUA();

  // Early exit checks
  if (!ua) return false; // No user agent
  if (!isiOS(ua)) return false; // iPad or iPhone
  if (!getIsSafariUA(ua)) return false; // Safari
  if ("clearAppBadge" in (window?.navigator || {})) return false; // PWAs
  const isSafariPrivate = await getIsSafariPrivate();
  if (isSafariPrivate) return false;
  if (getIsTelegram()) return false;

  // Targeted versions of Safari that we'll check
  const version = getSafariVersion(ua);
  if (compare(version, minSafariVersion) < 0) return false;
  if (
    maxVersion !== undefined &&
    (compare(maxVersion, minSafariVersion) < 0 ||
      compare(version, maxVersion) > 0)
  )
    return false;

  await waitForPageLoad();
  if (debug) consoleDebug({ note: "Page loaded", debug });

  const isSafari = await pollForProperties({
    interval: 60,
    maxTime,
    properties: ["SchemaDataExtractor", "MicrodataExtractor"],
  });

  if (debug) consoleDebug({ note: "Extra polling done", debug, last: true });

  return !isSafari;
};
