# InApp Spy 🔎

Detect in-app browsers

<!-- TODO: BADGING -->

# Installation

`yarn add inapp-spy`

# Code Example

```js
import InAppSpy from "inapp-spy";

const { isInApp, appName, ua } = InAppSpy();
```

# API Reference

```js
InAppSpy(options: { ua?: string } | undefined)
```

### Options (optional)

```js
{
  ua?: string;
}
```

### Return properties

```js
isInApp: boolean;
```

```js
appName: "line" |
  "messenger" |
  "facebook" |
  "twitter" |
  "wechat" |
  "instagram" |
  "tiktok" |
  "snapchat" |
  undefined; // undefined when it doesn't match an known app above, `isInApp` can still be true
```

```js
ua: string; // user agent passed in or figured out by `InAppSpy()` function
```

# License

MIT License

# Related

- [Bowser](https://github.com/bowser-js/bowser) - Browser + OS detection
- [InAppDebugger](https://inappdebugger.com) - Easily debug in-app browsers. Uses both `bowser` and `inapp-spy` libraries.

# Thanks

`inapp-spy` is a fork of [`detect-inapp`](https://github.com/f2etw/detect-inapp) with modifications. This wouldn't exist without the original work of the `detect-inapp` contributors.

```

```
