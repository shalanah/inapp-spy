import InAppSpy from "../index";
import { getIsAppleDevice, WIN_ERROR } from "../utils";
import { appKeysDetectByUA } from "../regexAppName";
import { DESKTOP } from "./desktop";
import { MOBILE } from "./mobile";
import { TABLET } from "./tablet";
import { typedEntries, BrowserDetection } from "./utils";
import { appKeysDetectByCustom } from "../detectionCustom";
import { getIsSafariUA } from "../detectionSFSVC";
import { AppKey } from "../types";
import { getSFSVCExperimental } from "../detectionSFSVC";

type Callback = (args: {
  deviceName: string;
  cat: "not_inapp" | "inapp";
  app: string; // in-app browser key `appKey` or browser key like CHROME etc
  userAgent: string;
}) => void;

const allAppKeys = [...appKeysDetectByUA, ...appKeysDetectByCustom];

// Helper func to traverse all devices for testing
const traverseDevices = async (
  callback: (args: {
    userAgent: string;
    deviceName: string;
    cat: string;
    app: string;
  }) => Promise<void> | void
) => {
  for (const device of [DESKTOP, MOBILE, TABLET]) {
    for (const [deviceName, inappCats] of typedEntries(device)) {
      for (const [cat, browsers] of typedEntries(inappCats)) {
        for (const [app, detection] of typedEntries(
          browsers as {
            [app: string]: BrowserDetection[];
          }
        )) {
          for (const { useragents, window } of detection) {
            if (!useragents) continue;
            for (const userAgent of useragents) {
              // @ts-ignore
              global.window = {
                ...window,
                // @ts-ignore
                navigator: {
                  ...(window?.navigator || {}),
                  userAgent,
                },
                document: {
                  ...(window?.document || {}),
                  readyState: "complete", // just to make sure we don't wait for page load
                },
              };

              // Wait for the async callback to complete before continuing
              await callback({
                userAgent,
                deviceName: `${deviceName}`,
                cat,
                app: `${app}`,
              });
            }
          }
        }
      }
    }
  }
};

// TESTS
describe("InAppSpy", () => {
  // Uncomment for single UA test
  // it.only("test one", () => {
  //   // Pixel chrome
  //   const appKey = undefined;
  //   const appName = undefined;
  //   const isInApp = false;
  //   const ua = "";
  //   global.window = {
  //     // @ts-ignore
  //     navigator: {
  //       userAgent: ua,
  //     },
  //   };
  //   const res = InAppSpy();
  //   expect(res.appKey).toBe(appKey);
  //   expect(res.appName).toBe(appName);
  //   expect(res.isInApp).toBe(isInApp);
  //   expect(res.ua).toBe(ua);
  //   expect(res.skipped).toBe(false);
  // });

  // it("Detect error for no window.", () => {
  //   const consoleErrorSpy = jest.spyOn(console, "error");
  //   InAppSpy();

  //   // Check if console.warn was called with the expected message
  //   expect(consoleErrorSpy).toHaveBeenCalledWith(
  //     expect.stringContaining(WIN_ERROR)
  //   );
  // });

  it("Detect if user agent is in-app or not", () => {
    traverseDevices(({ cat }) => {
      const inapp = InAppSpy();
      expect(inapp.isInApp).toBe(cat === "inapp");
      if (!inapp.isInApp) {
        // should always be undefined if no inapp
        expect(inapp.appKey).toBe(undefined);
        expect(inapp.appName).toBe(undefined);
      }
    });
  });

  it("Detect SFSVC", async () => {
    await traverseDevices(async ({ app }) => {
      const isSFSVC = await getSFSVCExperimental();
      expect(isSFSVC).toBe(app === "SFSVC");
    });
  });

  it("Detect SFSVC with upper version limit", async () => {
    await traverseDevices(async () => {
      const isSFSVC = await getSFSVCExperimental({ maxVersion: "18" });
      expect(isSFSVC).toBe(false);
    });
  });

  it("Detect in-app key is in known list", () => {
    traverseDevices(({ app }) => {
      if (!(allAppKeys as string[]).includes(app.toLowerCase() as string))
        return; // not a known in-app key
      const inapp = InAppSpy();
      expect(inapp.appKey).toBe((app as string).toLocaleLowerCase());
    });
  });

  it("Test safari regex", () => {
    traverseDevices(({ deviceName, userAgent, app }) => {
      const isSafariUA = getIsSafariUA(userAgent);
      expect(isSafariUA).toBe(
        app === "SAFARI" ||
          (app === "TELEGRAM" && deviceName === "IPHONE") || // odd case where UA is unchanged for telegram
          app === "SFSVC" || // SFSVC has same UA as safari
          app === "PWA_SAFARI"
      );
    });
  });

  it("Test Apple Device", () => {
    traverseDevices(({ deviceName, userAgent }) => {
      const isAppleDevice = getIsAppleDevice(userAgent);
      expect(isAppleDevice).toBe(
        ["IPAD", "IPHONE", "MACOS"].includes(deviceName)
      );
    });
  });

  it("Test skip", () => {
    traverseDevices(({ deviceName, app }) => {
      if (!(allAppKeys as string[]).includes(app.toLowerCase() as string)) {
        // nothing should happen here since not in our inapp list
        const inapp = InAppSpy({ skip: [{ appKey: "facebook" }] });
        expect(inapp.isInApp).toBe(false);
        expect(inapp.skipped).toBe(false);
        return;
      }

      // Skip all platforms
      const inappSkipAllPlatforms = InAppSpy({
        skip: [{ appKey: app.toLowerCase() as AppKey }],
      });
      expect(inappSkipAllPlatforms.skipped).toBe(true);
      expect(inappSkipAllPlatforms.isInApp).toBe(false);
      const deviceType = ["IPAD", "IPHONE", "MACOS"].includes(deviceName);

      // Skip this platform
      const inappSkipThisPlatform = InAppSpy({
        skip: [
          {
            appKey: app.toLowerCase() as AppKey,
            platform: deviceType ? "apple" : "android",
          },
        ],
      });
      expect(inappSkipThisPlatform.skipped).toBe(true);
      expect(inappSkipThisPlatform.isInApp).toBe(false);

      // Skip opposite platform
      const inappSkipOppositePlatform = InAppSpy({
        skip: [
          {
            appKey: app.toLowerCase() as AppKey,
            platform: deviceType ? "android" : "apple",
          },
        ],
      });
      expect(inappSkipOppositePlatform.skipped).toBe(false);
      expect(inappSkipOppositePlatform.isInApp).toBe(true);
    });
  });
});
