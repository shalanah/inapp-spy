// NOTE: Consider getting the versions of known in-app browsers
export const appNameRegExps = {
  messenger: {
    regex:
      /(\bFB[\w_]+\/(Messenger))|(^(?!.*\buseragents)(?!.*\bIABMV).*(FB_IAB|FBAN).*)/i, // Experimental for newer UAs - don't have `"useragents:" or end in "IABMV"
    name: "Facebook Messenger",
  },
  instagram: {
    regex: /\bInstagram/i,
    name: "Instagram",
  },
  facebook: {
    regex: /\bFB[\w_]+\//,
    name: "Facebook",
  },
  twitter: {
    regex: /\bTwitter/i,
    name: "Twitter",
  },
  line: {
    regex: /\bLine\//i,
    name: "Line",
  },
  wechat: {
    regex: /\bMicroMessenger\//i,
    name: "WeChat",
  },
  threads: {
    regex: /\bBarcelona/i,
    name: "Threads",
  },
  tiktok: {
    regex: /musical_ly|Bytedance/i,
    name: "TikTok",
  },
  snapchat: {
    regex: /Snapchat/i,
    name: "Snapchat",
  },
  linkedin: {
    regex: /LinkedInApp/i,
    name: "LinkedIn",
  },
  gsa: {
    regex: /GSA/i,
    name: "Google Search App",
  },
} as const;

export const appKeysDetectByUA = Object.keys(
  appNameRegExps
) as (keyof typeof appNameRegExps)[];

export const getAppKey = (ua: string) => {
  return appKeysDetectByUA.find((appName) =>
    appNameRegExps[appName].regex.test(ua)
  );
};
