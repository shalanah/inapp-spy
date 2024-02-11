import InAppSpy from "../index";
import { WIN_ERROR } from "../utils";
import { appKeys } from "../regexAppName";
import { DESKTOP, MOBILE, TABLET } from "./useragents";

describe("InAppSpy", () => {
  // Uncomment for single UA test
  // it.only("Detect error for no window.", () => {
  //   // Pixel chrome
  //   const appKey = undefined;
  //   const appName = undefined;
  //   const isInApp = false;
  //   const ua =
  //     "Mozilla/5.0 (Linux; Android 12; Pixel 3) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/102.0.0.0 Mobile Safari/537.36";

  //   const res = InAppSpy({ ua });
  //   expect(res.appKey).toBe(appKey);
  //   expect(res.appName).toBe(appName);
  //   expect(res.isInApp).toBe(isInApp);
  //   expect(res.ua).toBe(ua);
  // });

  it("Detect error for no window.", () => {
    const consoleErrorSpy = jest.spyOn(console, "error");
    InAppSpy();

    // Check if console.warn was called with the expected message
    expect(consoleErrorSpy).toHaveBeenCalledWith(
      expect.stringContaining(WIN_ERROR)
    );
  });

  it("Detect if user agent is in-app or not", () => {
    [DESKTOP, MOBILE, TABLET].forEach((device) => {
      Object.values(device).forEach((inappCats) => {
        Object.entries(inappCats).forEach(([cat, browsers]) => {
          let isInApp: boolean | undefined;
          if (cat === "inapp") isInApp = true;
          if (cat === "not_inapp") isInApp = false;
          if (isInApp === undefined)
            throw new Error("key invalid: needs to be `inapp` or `not_inapp`");
          Object.entries(browsers).forEach(([, useragents]) => {
            (useragents as string[]).forEach((useragent) => {
              const inapp = InAppSpy({ ua: useragent });
              if (inapp.isInApp !== isInApp)
                expect(inapp.isInApp).toBe(isInApp);
            });
          });
        });
      });
    });
  });

  it("Detect in-app app name is in known list", () => {
    [DESKTOP, MOBILE, TABLET].forEach((device) => {
      Object.values(device).forEach((inappCats) => {
        Object.entries(inappCats).forEach(([cat, browsers]) => {
          let isInApp: boolean | undefined;
          if (cat === "inapp") isInApp = true;
          if (cat === "not_inapp") isInApp = false;
          if (isInApp === undefined)
            throw new Error("key invalid: needs to be `inapp` or `not_inapp`");
          Object.entries(browsers).forEach(([browserName, useragents]) => {
            (useragents as string[]).forEach((useragent) => {
              const { appKey } = InAppSpy({ ua: useragent });
              const hasItem = appKey ? appKeys.includes(appKey) : false;
              expect(hasItem).toBe(isInApp); // make sure in known list
              if (hasItem)
                expect(appKey).toBe(browserName.toLocaleLowerCase()); // make sure in our useragents we use the right key
            });
          });
        });
      });
    });
  });
});
