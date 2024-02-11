# Publishing Workflow

- Create a PR
- Include changeset in PR if needed (bot)
- Merge PR
- On main...
- Run `yarn versioning` to bump version
- Run `yarn release` to publish to npm
- Run `git push origin main --tags` to push code + tags