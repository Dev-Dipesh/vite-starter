# Verification Workflow for Agents

The repository verification command is `npm ci && npm test && npm run build`. Follow this order when closing a story to prove both the documentation controls and the standard build path continue to work.

## Automated checks
1. `npm ci` installs the baseline dependencies, leaving `node_modules/` clean before you run any commands.
2. `npm test` currently runs `scripts/verify-docs.mjs`, which ensures that `AGENTS.md` lists every document inside `docs/standards/`, that each file exists, and that the README mentions the standards directory. Always rerun this check when any doc, filename, or link changes.
3. `npm run build` exercises TypeScript and Vite. Since this template ships with TypeScript checks (`tsc -b`) and Vite's production bundle, the build ensures your code respects the existing toolchain.

## When to add new checks
- If a story introduces runtime behavior beyond documentation (e.g., new interactive widgets), add the matching unit/integration test in the same commit so future agents can see the verification pattern. Document new tests in `docs/standards/verification-workflow.md` and update `AGENTS.md`.
- Keep the Git history tidy: avoid committing `node_modules/` or other transient outputs; rely on `npm ci` for clean installs.

## Manual review steps
- Read `AGENTS.md` and the standard doc that relates to your change before editing.
- When editing docs, rerun `npm test` immediately so `scripts/verify-docs.mjs` flags any missing cross-references while the files are fresh in your editor.

See also: [Directory Expectations](directory-expectations.md), [Coding Patterns](coding-patterns.md), [Standards Updates](standards-update.md).
