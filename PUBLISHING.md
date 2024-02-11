# Publishing Workflow

- Create a PR
- Include changeset in PR if needed (bot)
- Merge PR
- On main...
- Run `yarn versioning` to bump version
- Run `git add .`, `git commit -m 'version notes'`, `git push`, `git push origin --tags`  to push code + tags
- Run `yarn release` to publish to npm
