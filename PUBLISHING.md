# Publishing Workflow

- Create a PR
- Include changeset in PR if needed (bot) `pnpm changeset`
- Merge PR
- Checkout `main` branch
- Run `pnpm versioning` to bump version
- Add files (same commit), `git push`
- Run `pnpm release` to publish to npm
- `git push origin --tags`
