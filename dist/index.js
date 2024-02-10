"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/index.ts
var src_exports = {};
__export(src_exports, {
  default: () => src_default
});
module.exports = __toCommonJS(src_exports);

// src/regex.ts
var appNameRegExps = {
  messenger: /\bFB[\w_]+\/(Messenger|MESSENGER)/,
  facebook: /\bFB[\w_]+\//,
  twitter: /\bTwitter/i,
  line: /\bLine\//i,
  wechat: /\bMicroMessenger\//i,
  instagram: /\bInstagram/i,
  tiktok: /musical_ly|Bytedance/i,
  // TODO: fix this
  snapchat: /Snapchat/i
  // TODO: check this
};
var inAppRegExps = [
  "WebView",
  "(iPhone|iPod|iPad)(?!.*Safari/)",
  // Apple devices but not with "Safari/" following
  "Android.*wv\\)",
  "FB_\\w|FB\\w",
  // Match Facebook FB_ or FB then word char
  "Snapchat"
];
var appNames = Object.keys(
  appNameRegExps
);
var getAppName = (ua) => appNames.find((appName) => appNameRegExps[appName].test(ua));
var inappRegex = new RegExp(
  `${inAppRegExps.map((reg) => `(${reg})`).join("|")}`,
  "ig"
);

// src/utils.ts
var WIN_ERROR = "Window is not available and no user agent was provided.";
var getUA = () => {
  var _a, _b;
  if (typeof window !== "undefined") {
    const ua = ((_a = window == null ? void 0 : window.navigator) == null ? void 0 : _a.userAgent) || ((_b = window == null ? void 0 : window.navigator) == null ? void 0 : _b.vendor) || // @ts-ignore
    (window == null ? void 0 : window.opera);
    if (ua)
      return ua;
  }
  console.error(WIN_ERROR);
  return "";
};

// src/index.ts
var InAppSpy = (options = {}) => {
  const { ua } = options;
  let userAgent = ua || getUA();
  if (!userAgent) {
    return {
      isInApp: false,
      appName: void 0,
      ua: userAgent
    };
  }
  const isInApp = userAgent.match(inappRegex) !== null;
  return {
    isInApp,
    appName: isInApp ? getAppName(userAgent) : void 0,
    ua: userAgent
  };
};
var src_default = InAppSpy;
//# sourceMappingURL=index.js.map