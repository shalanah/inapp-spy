# Publishing Workflow

- Create a PR
- Include changeset in PR if needed (bot)
- Merge PR
- Checkout `main` branch
- Run `yarn versioning` to bump version
- Add files (same commit), `git push`
- Run `yarn release` to publish to npm
- `git push origin --tags` 
