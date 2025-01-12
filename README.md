# InAppSpy 🔎

Detect in-app browsers (a maintained fork and refactor of `detect-inapp`)

# Installation

```sh
pnpm add inapp-spy
yarn add inapp-spy
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

## Return properties

```ts
{
  isInApp: boolean;

  appKey: "facebook" |
    "gsa" |
    "instagram" |
    "line" |
    "linkedin" |
    "snapchat" |
    "telegram" |
    "threads" |
    "tiktok" |
    "twitter" |
    "wechat" |
    "messenger" |
    undefined; // can be undefined even if `isInApp: true`

  // Pretty printed app name
  // - `appKey: 'tiktok', appName: 'TikTok'`
  // - May change, use `appKey` for programmatic use
  appName: string;

  ua: string; // The user agent figured out by `InAppSpy()`

  skipped: boolean; // debugging, if decided to skip this will be true
}
```

## Parameters (optional)

```ts
InAppSpy({
  // User agent for server side - leave blank for better client in-app detection
  ua?: string;
  // Skip a specific appKey from detection
  skip?: {
    appKey: AppKey; // "messenger" | "facebook" etc
    platform?: "apple" | "android"; // use undefined for all platforms or leave blank
  }[];
})
```

## NEW SFSafariViewController detection

> **With escape link usage:** Always include a query string on escape links just in case false positives occur. If query string is present - ignore the detection.

This is a new experimental method to help you mitigate SFSafariViewController issues - ie [awkward downloading experience](https://bsky.app/profile/shalanah.bsky.social/post/3las76tply22p)

`SFSVCExperimental` may give false positives on Safari browser or change with OS updates. Test code on devices before pushing to prod. Feedback is appreciated!

#### JS usage

```ts
import InAppSpy, { SFSVCExperimental } from "inapp-spy";

const { isInApp, appKey, appName } = InAppSpy(); // normal detection

// Async needed - targets Safari 17+
SFSVCExperimental().then((isSFSVC) => /* ...`*/);

```

#### React usage

```tsx
import InAppSpy, { SFSVCExperimental } from "inapp-spy";

export const App = () => {
  const [{ isInApp }] = useState(() => InAppSpy());
  const [isSFSVC, setIsSFSVC] = useState(false);

  useEffect(() => {
    // Async needed - targets Safari 17+
    SFSVCExperimental().then(setIsSFSVC);
  }, []);

  ...
};
```

#### Debugging

If `SFSVCExperimental` returns false positives on your app but not on [InAppDebugger](https://inappdebugger.com), try increasing the `maxTime` along with `debug: true`. You are possibly loading additional scripts dynamically immediately after the page loads that is delaying detection.

```ts
SFSVCExperimental({
  debug?: boolean; // (default: false) Debug mode - logs to console
  maxTime?: number; // (default: 300 (ms)) This is the max time used to detect if this is Safari and not SFSVC. If you are getting false positives try increasing this number first.
  maxVersion?: string; // (ie: "21.5.1", default: undefined) Max version of Safari to use this detection type - I hope it works forever! This is just in case stop gap if detection stops working :)
});
```

# License

MIT License

# Related

- [InAppDebugger](https://inappdebugger.com) - Debug in-app browsers. Uses both `bowser` and `inapp-spy` libraries.
- [Bowser](https://github.com/bowser-js/bowser) - Browser + OS detection

# Thanks

`inapp-spy` is a fork of [`detect-inapp`](https://github.com/f2etw/detect-inapp) with modifications. This wouldn't exist without the original work of the `detect-inapp` contributors.
