# InApp Spy 🔎

Detect in-app browsers - fork of `detect-inapp` with API modifications + additions

# Installation

`yarn add inapp-spy`

# Code Example

```js
import InAppSpy from "inapp-spy";

const { isInApp, appName } = InAppSpy();
```

# API Reference

## Return properties

### isInApp

Detected in-app browser

`boolean`

### appName

Recognized app name with in-app browser

```ts
"messenger" |
  "facebook" |
  "twitter" |
  "wechat" |
  "instagram" |
  "tiktok" |
  "snapchat" |
  "line" |
  undefined;
```

Can be `undefined` if `isInApp: true`.

### ua

The user agent passed in or figured out by `InAppSpy()` function

`string`

## Parameters (optional)

```ts
{
  ua?: string;
}
```

# License

MIT License

# Related

- [Bowser](https://github.com/bowser-js/bowser) - Browser + OS detection
- [InAppDebugger](https://inappdebugger.com) - Easily debug in-app browsers. Uses both `bowser` and `inapp-spy` libraries.

# Thanks

`inapp-spy` is a fork of [`detect-inapp`](https://github.com/f2etw/detect-inapp) with modifications. This wouldn't exist without the original work of the `detect-inapp` contributors.
