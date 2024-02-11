# InApp Spy 🔎

Detect in-app browsers

<!-- TODO: BADGING -->

# Installation

`yarn add inapp-spy`

# Code Example

```js
import InAppSpy from "inapp-spy";

const { isInApp, appName } = InAppSpy();
```

# API Reference

```js
InAppSpy(options: { ua?: string } | undefined)
```

### Parameters (optional)

```js
{
  ua?: string;
}
```

### Return properties

#### `isInApp`

`boolean` - Whether the user is in an in-app browser

#### `appName`

Values: "messenger", "facebook", "twitter", "wechat", "instagram", "tiktok", "snapchat", "line", or `undefined`

Can be undefined even when `isInApp` is true.

#### `ua`

`string` - The user agent passed in or figured out by `InAppSpy()` function

# License

MIT License

# Related

- [Bowser](https://github.com/bowser-js/bowser) - Browser + OS detection
- [InAppDebugger](https://inappdebugger.com) - Easily debug in-app browsers. Uses both `bowser` and `inapp-spy` libraries.

# Thanks

`inapp-spy` is a fork of [`detect-inapp`](https://github.com/f2etw/detect-inapp) with modifications. This wouldn't exist without the original work of the `detect-inapp` contributors.

# Publishing Workflow

- Create a PR
- Include changeset in PR if needed (bot)
- Merge PR
- On main...
- Run `yarn versioning` to bump version
- Run `yarn publish` to publish to npm
- Run `git push origin main --tags` to push code + tags
