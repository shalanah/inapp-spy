const appNameRegExps = {
  messenger: /\bFB[\w_]+\/(Messenger|MESSENGER)/,
  facebook: /\bFB[\w_]+\//,
  twitter: /\bTwitter/i,
  line: /\bLine\//i,
  wechat: /\bMicroMessenger\//i,
  instagram: /\bInstagram/i,
  tiktok: /musical_ly|Bytedance/i, // TODO: fix this
  snapchat: /Snapchat/i, // TODO: check this
} as const;

const inAppRegExps = [
  "WebView",
  "(iPhone|iPod|iPad)(?!.*Safari/)", // Apple devices but not with "Safari/" following
  "Android.*wv\\)",
  "FB_\\w|FB\\w", // Match Facebook FB_ or FB then word char
  "Snapchat",
] as const;

export const appNames = Object.keys(
  appNameRegExps
) as (keyof typeof appNameRegExps)[];

export const getAppName = (ua: string) =>
  appNames.find((appName) => appNameRegExps[appName].test(ua));

export const inappRegex = new RegExp(
  `${inAppRegExps.map((reg) => `(${reg})`).join("|")}`,
  "ig"
);
