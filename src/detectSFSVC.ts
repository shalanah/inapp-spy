import { getIsIOSArc } from "./detectIOSArc";
import { getIsPWA } from "./detectPWA";
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
  if (!ua) return false;
  if (!isiOS(ua)) return false; // iPad or iPhone
  if (!getIsSafariUA(ua)) return false;
  if (getIsPWA()) return false;
  if (getIsTelegram()) return false;
  if (getIsIOSArc()) return false;

  // Targeted versions of Safari that this check is valid for
  const version = getSafariVersion(ua);
  if (compare(version, minSafariVersion) < 0) return false;

  // User specified max version
  if (maxVersion !== undefined && compare(version, maxVersion) > 0)
    return false;

  // Detection for Safari 26.4+
  // - Safari + private safari has `browser` object in window starting in 26.4, SFSVC does not
  if (compare(version, "26.4") >= 0) {
    return !("browser" in window) || !window.browser;
  }

  // Detection for Safari 17-26.3
  const isSafariPrivate = await getIsSafariPrivate();
  if (isSafariPrivate) return false;

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
