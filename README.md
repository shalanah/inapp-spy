# InApp Spy 🔎

Detect in-app browsers

<!--
[![Build Status](https://travis-ci.org/f2etw/detect-inapp.svg?branch=master)](https://travis-ci.org/f2etw/detect-inapp)
[![codecov](https://codecov.io/gh/f2etw/detect-inapp/branch/master/graph/badge.svg)](https://codecov.io/gh/f2etw/detect-inapp)
[![npm](https://img.shields.io/npm/v/detect-inapp.svg)](https://npmjs.org/package/detect-inapp)
[![downloads](https://img.shields.io/npm/dm/detect-inapp.svg)](https://npmjs.org/package/detect-inapp)
[![js-standard-style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg)](http://standardjs.com)
[![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/)
[![semantic-release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg)](https://github.com/semantic-release/semantic-release) -->

# Installation

`yarn add inapp-spy`

# Code Example

```js
import InAppSpy from "inapp-spy";

const { isInApp, appName, ua } = InAppSpy();
```

# API Reference

```typescript
InAppSpy(options: { ua?: string } | undefined)
```

### Options (optional)

````typescript
{
  ua?: string;
}

### Return properties

```js
isInApp: boolean;
````

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
