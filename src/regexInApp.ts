// Quick in-app detection - should cover all specific in-app cases
const inAppRegExps = [
  "WebView",
  // Apple devices but not with "Safari/" following
  "(iPhone|iPod|iPad)(?!.*Safari/)",
  "Android.*wv\\)",
  // Match Facebook FB_ or FB then word char (Android)
  "FB_\\w|FB\\w",
  // Can end in Safari (iPhone)
  "Snapchat",
  "GSA",
  "Instagram",
] as const;

export const inappRegex = new RegExp(
  `${inAppRegExps.map((reg) => `(${reg})`).join("|")}`,
  "ig"
);
