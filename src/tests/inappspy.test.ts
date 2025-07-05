import InAppSpy from "../index";
import { getIsAppleDevice, WIN_ERROR, getIsSafariUA } from "../utils";
import { appKeysDetectByUA } from "../regexAppName";
import { DESKTOP } from "./desktop";
import { MOBILE } from "./mobile";
import { TABLET } from "./tablet";
import { typedEntries, BrowserDetection } from "./utils";
import { appKeysDetectByCustom } from "../detectClientSide";
import { AppKey } from "../types";
import { getSFSVCExperimental } from "../detectSFSVC";

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
              const win: any = window;
              const mockWindow = {
                ...win,
                navigator: {
                  ...(win?.navigator || {}),
                  userAgent,
                },
                document: {
                  ...(win?.document || {}),
                  readyState: "complete", // just to make sure we don't wait for page load
                },
              };

              // @ts-ignore
              global.window = mockWindow;

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

  // TODO: Share beforeEach + afterEach for the window/ua existence tests?
  it("Error for no window with no ua", () => {
    const consoleErrorSpy = jest.spyOn(console, "error");
    InAppSpy();
    expect(consoleErrorSpy).toHaveBeenCalledWith(
      expect.stringContaining(WIN_ERROR)
    );
    consoleErrorSpy.mockRestore();
  });

  it("NO error if given a ua", () => {
    const consoleErrorSpy = jest.spyOn(console, "error");
    InAppSpy({ ua: "test" });
    expect(consoleErrorSpy).not.toHaveBeenCalled();
    consoleErrorSpy.mockRestore();
  });

  it("NO error if given a window with ua", () => {
    const consoleErrorSpy = jest.spyOn(console, "error");
    global.window = {
      // @ts-ignore
      navigator: {
        userAgent: "test",
      },
    };
    InAppSpy();
    expect(consoleErrorSpy).not.toHaveBeenCalled();
    // @ts-ignore
    global.window = undefined;
    consoleErrorSpy.mockRestore();
  });

  it("Detect if in-app or not", async () => {
    await traverseDevices(({ cat, userAgent, app }) => {
      // Global window object
      let inapp = InAppSpy();
      expect(inapp.isInApp).toBe(cat === "inapp");
      if (!inapp.isInApp) {
        // should always be undefined if no inapp
        expect(inapp.appKey).toBe(undefined);
        expect(inapp.appName).toBe(undefined);
      }

      // Server-side UA
      // @ts-ignore
      global.window = {}; // clear this out for just UA testing
      inapp = InAppSpy({ ua: userAgent });
      // Exclude custom detection keys since they include the full window
      if ((appKeysDetectByCustom as string[]).includes(app.toLowerCase())) {
        expect(inapp.isInApp).toBe(false);
        expect(inapp.appKey).toBe(undefined);
        expect(inapp.appName).toBe(undefined);
        return;
      }
      // Regular UA detection
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

  it("Detect in-app key is in known list", async () => {
    await traverseDevices(async ({ app }) => {
      if (!(allAppKeys as string[]).includes(app.toLowerCase() as string))
        return; // not a known in-app key
      const inapp = InAppSpy();
      expect(inapp.appKey).toBe((app as string).toLowerCase());
    });
  });

  it("Test safari regex", async () => {
    await traverseDevices(async ({ deviceName, userAgent, app }) => {
      const isSafariUA = getIsSafariUA(userAgent);
      expect(isSafariUA).toBe(
        ["SAFARI", "PWA_SAFARI", "PRIVATE_SAFARI", "SFSVC"].includes(app) ||
          (app === "TELEGRAM" && deviceName === "IPHONE") // odd case where UA is unchanged for telegram
      );
    });
  });

  it("Test Apple device", async () => {
    await traverseDevices(async ({ deviceName, userAgent }) => {
      const isAppleDevice = getIsAppleDevice(userAgent);
      expect(isAppleDevice).toBe(
        ["IPAD", "IPHONE", "MACOS"].includes(deviceName)
      );
    });
  });

  it("Test skip", async () => {
    await traverseDevices(async ({ deviceName, app }) => {
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
