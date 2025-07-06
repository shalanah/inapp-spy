# inapp-spy

## 5.0.1

### Patch Changes

- ae45f3e: Fix iOS Safari in Private mode false positive in SFSVCExperimental

## 5.0.0

### Major Changes

- 95c2027: Fix global access to InAppSpy for non-global import/requires

## 4.4.0

### Minor Changes

- 72e877c: Removes browser field from package, adds explicit bundles for jsdelivr, unpkg, and adds exports for global

## 4.3.1

### Patch Changes

- 9c7bfd5: fix url for cdn in readme

## 4.3.0

### Minor Changes

- b6a51b3: Add ua optional param, update Readme with CDN

## 4.2.1

### Patch Changes

- 95ac4f9: Fix exports

## 4.2.0

### Minor Changes

- 6634e0f: Create iife build for CDNs

## 4.1.1

### Patch Changes

- e1f11ac: Update readme with bsky link over x link and order appkeys in alpha order

## 4.1.0

### Minor Changes

- 3c381dd: - Add recent Meta UAs to tests
  - Add `threads` appKey
  - Adjust messenger regex for newer UAs

## 4.0.2

### Patch Changes

- dc218c7: Removes post-install script that was only used for branch deploys

## 4.0.1

### Patch Changes

- 5e281f0: - Remove src from build (was only used in branch builds temporarily)

## 4.0.0

### Major Changes

- e5c457c: - Adds detection for `telegram`, `gsa`, and `linkedin`
  - Adds property `skip` and return property `skipped`
  - Adds `SFSVCExperimental` method
  - Removes (breaking) property `ua` for `InAppSpy` method
  - Refactors tests

## 3.0.1

### Patch Changes

- 98f9b98: Fix main path for commonjs

## 3.0.0

### Major Changes

- 59fb3bd: Remove isSFSafariViewController - still testing

## 2.1.1

### Patch Changes

- fd3bed2: return isSFSafariViewController always

## 2.1.0

### Minor Changes

- 09ac525: Adds experimental detection of `SFSafariViewController`

## 2.0.4

### Patch Changes

- cd2b859: edit readme for npm

## 2.0.3

### Patch Changes

- d5b926a: edit readme

## 2.0.2

### Patch Changes

- update readme for npm

## 2.0.1

### Patch Changes

- 0f5d5a6: Update readme for package

## 2.0.0

### Major Changes

- 166ce90: `appName` is not a pretty printed version of found app and `appKey` is the former `appName`

## 1.0.7

### Patch Changes

- e775e7d: Test out publishing workflow

## 1.0.6

### Patch Changes

- c1623de: Test workflow

## 1.0.5

### Patch Changes

- c18d453: Release testing

## 1.0.4

### Patch Changes

- Test out manual workflow
- d781f07: More deploy testing
- 223a227: More workflow testing
- 07249f0: More workspace
- dc91fba: Working on deploy setup
- 2ab6131: more tests

## 1.0.3

### Patch Changes

- 57d318b: Work on deployment

## 1.0.2

### Patch Changes

- 16b2c8b: Testing out npm package publishing

## 1.0.1

### Patch Changes

- 2d2134e: Initial version
