// Catch all in-app webviews based on user agent patterns - not exhaustive, needs to be used in conjunction with app specific regexes
const inAppRegExps = [
  "WebView",
  // Apple devices but not with "Safari/" following
  "(iPhone|iPod|iPad)(?!.*Safari/)",
  // Android webview
  "Android.*wv\\)",
] as const;

export const inappRegex = new RegExp(
  `${inAppRegExps.map((reg) => `(${reg})`).join("|")}`,
  "i"
);
