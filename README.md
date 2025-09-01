# InAppSpy 🔎

[![npm version](https://img.shields.io/npm/v/inapp-spy)](https://www.npmjs.com/package/inapp-spy) [![npm downloads](https://img.shields.io/npm/dw/inapp-spy)](https://www.npmjs.com/package/inapp-spy) [![last commit](https://img.shields.io/github/last-commit/shalanah/inapp-spy)](https://github.com/shalanah/inapp-spy) [![changesets](https://img.shields.io/badge/changesets-enabled-brightgreen)](https://github.com/changesets/changesets) [![maintenance](https://img.shields.io/badge/maintained-yes-brightgreen)](#) [![license](https://img.shields.io/github/license/shalanah/inapp-spy)](LICENSE) [![GitHub Repo stars](https://img.shields.io/github/stars/shalanah/inapp-spy?style=social)](https://github.com/shalanah/inapp-spy/stargazers)

`inapp-spy` helps developers detect when a website is opened inside an in-app browser (e.g. Instagram, Facebook, TikTok, Telegram).

It’s a maintained and refactored alternative to `detect-inapp`, with TypeScript support and regular updates – and it powers [inappdebugger.com](https://inappdebugger.com) — a live testing tool for in-app browser detection.

# Installation

```sh
npm install inapp-spy
```

Or via CDN

```html
<script src="https://cdn.jsdelivr.net/npm/inapp-spy@latest/dist/index.global.min.js"></script>
```

# Code Examples

## Basic

```js
import InAppSpy from "inapp-spy";

const { isInApp, appKey, appName } = InAppSpy();
```

# API Reference

## Return Propertiess

#### isInApp

True if in-app browser has been detected

#### appKey

Machine-friendly key (use for logic)

- `facebook`
- `gsa`
- `instagram`
- `line`
- `linkedin`
- `snapchat`
- `telegram`
- `threads`
- `tiktok`
- `twitter`
- `wechat`
- `messenger`

Can be undefined if `isInApp` is true.

#### appName

Human-readable name (e.g. "TikTok")

#### ua

Resolved or provided user agent string.

#### skipped

True if detection was bypassed via skip.

## Optional Parameters

```ts
InAppSpy({
  // Provide a UA string (server-side detection). Leave blank on client for better accuracy.
  ua?: string;
  // Exclude certain apps or platforms from detection.
  skip?: {
    appKey: AppKey;
    platform?: "apple" | "android";
  }[];
})
```

## SFSafariViewController Detection (Experimental)

Detect when a page is opened inside **SFSafariViewController** (helps with issues like [awkward download UX](https://bsky.app/profile/shalanah.bsky.social/post/3las76tply22p)).

⚠️ `SFSVCExperimental` may return false positives (e.g. Safari itself) and could change with future iOS updates. Always test on real devices.

💡 Tip: If you use escape links, add a query string — if present, skip detection to avoid false positives.

### Usage

**JavaScript**

```ts
import InAppSpy, { SFSVCExperimental } from "inapp-spy";

const { isInApp } = InAppSpy(); // normal detection

// Detects in Safari 17+ - requires async
SFSVCExperimental().then((isSFSVC) => {
  /* ... */
});
```

**React**

```ts
import InAppSpy, { SFSVCExperimental } from "inapp-spy";

export const App = () => {
  const [{ isInApp }] = useState(() => InAppSpy());
  const [isSFSVC, setIsSFSVC] = useState(false);

  useEffect(() => {
    // Detects in Safari 17+ - requires async
    SFSVCExperimental().then(setIsSFSVC);
  }, []);

  ...
};
```

#### Debugging Options

If detection fails on your app (but not on [InAppDebugger](https://inappdebugger.com)), try adjusting options:

```ts
SFSVCExperimental({
  debug?: boolean; // log details (default: false)
  maxTime?: number; // ms before assuming Safari (default: 300)
  maxVersion?: string; // e.g. "21.5.1" (default: none)
});
```

# License

[MIT](https://github.com/shalanah/inapp-spy/blob/main/LICENSE)

# Related

- [InAppDebugger](https://inappdebugger.com) - Debug in-app browsers. Uses both `bowser` and `inapp-spy` libraries.
- [Bowser](https://github.com/bowser-js/bowser) - Browser + OS detection
