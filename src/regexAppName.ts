export const appNameRegExps = {
  messenger: {
    regex:
      /(\bFB[\w_]+\/(Messenger))|(^(?!.*\buseragents)(?!.*\bIABMV).*FB_IAB.*)/i, // Experimental for newer UAs - don't have `"useragents:" or end in "FB_IAB"
    name: "Facebook Messenger",
    // version: /FBAV\/(\d+)/, -- stubbing in version testing if we decide to add that for meta products
  },
  facebook: {
    regex: /\bFB[\w_]+\//,
    name: "Facebook",
    // version: /FBAV\/(\d+)/,
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
    // version: /Instagram\s+\/(\d+)/i,
  },
  threads: {
    regex: /\bBarcelona/i,
    name: "Threads",
    // version: /Barcelona\s+\/(\d+)/i,
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
