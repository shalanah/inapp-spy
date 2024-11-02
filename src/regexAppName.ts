export const appNameRegExps = {
  messenger: {
    regex: /(\bFB[\w_]+\/(Messenger))|(\s\s\[FB_IAB)/i, // newer UAs on Android harder to detect - the two spaces is experimental however if UA changes will get picked up by facebook regex
    name: "Facebook Messenger",
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
  instagram: {
    regex: /\bInstagram/i,
    name: "Instagram",
  },
  threads: {
    regex: /Barcelona/i,
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
