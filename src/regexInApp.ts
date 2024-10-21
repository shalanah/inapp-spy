const inAppRegExps = [
  "WebView",
  "(iPhone|iPod|iPad)(?!.*Safari/)", // Apple devices but not with "Safari/" following
  "Android.*wv\\)",
  "FB_\\w|FB\\w", // Match Facebook FB_ or FB then word char
  "Snapchat",
  "GSA",
] as const;

export const inappRegex = new RegExp(
  `${inAppRegExps.map((reg) => `(${reg})`).join("|")}`,
  "ig"
);
