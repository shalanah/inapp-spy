# InAppSpy 🔎

Detect in-app browsers - fork of `detect-inapp` with API modifications + additions

# Installation

```sh
yarn add inapp-spy
npm install inapp-spy
```

# Code Example

```js
import InAppSpy from "inapp-spy";

const { isInApp, appKey, appName } = InAppSpy();
```

# API Reference

## Return properties

```ts
{
  // Detected in-app browser
  isInApp: boolean;

  // Recognized app with in-app browser
  appKey: "messenger" |
    "facebook" |
    "twitter" |
    "wechat" |
    "instagram" |
    "tiktok" |
    "snapchat" |
    "line" |
    undefined; // can be undefined if `isInApp: true`

  // Pretty printed app name
  // - ie `appKey: 'tiktok', appName: 'TikTok'`
  // - Subject to change, use `appKey` for programmatic use
  appName: string;

  ua: string; // The user agent passed in or figured out by `InAppSpy()` function
}
```

## Parameters (optional)

```ts
InAppSpy({
  ua?: string; // not required
})
```

# License

MIT License

# Related

- [Bowser](https://github.com/bowser-js/bowser) - Browser + OS detection
- [InAppDebugger](https://inappdebugger.com) - Easily debug in-app browsers. Uses both `bowser` and `inapp-spy` libraries.

# Thanks

`inapp-spy` is a fork of [`detect-inapp`](https://github.com/f2etw/detect-inapp) with modifications. This wouldn't exist without the original work of the `detect-inapp` contributors.
