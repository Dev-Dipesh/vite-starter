# Directory Expectations

This repository keeps the default Vite starter layout, but agents should understand where new artifacts belong before adding files.

## Primary locations
- `src/`: Application code, entry points, and component sets belong here. Keep components focused, co-locate light styles (CSS or modules) with the owning component or under `src/styles/` when shared.
- `public/`: Static files that bypass the bundler are stored here. Reference them with root-relative URLs (e.g., `/icons.svg`) and avoid moving logic into this location.
- `docs/standards/`: All agent-facing policies, coding guidelines, and workflows live inside this tree. Update them alongside code changes so the guidance stays accurate.
- `AGENTS.md`: The index for the documentation tree. Any shift in the docs or their filenames must be reflected in this file so future agents can locate instructions without guessing.
- `/home/daytona/run-artifacts/`: Not part of the Git repo, but it captures execution artifacts (implementation plans, agent summaries, automation outputs). Writers should still read and update these files when requested by the story.

## Adding new directories
1. Favor existing locations. For example, place new components under `src/feature/Name` rather than creating unexpected roots.
2. If you need a new shared folder (e.g., `src/hooks` or `src/fixtures`), document it in `docs/standards/directory-expectations.md` and update `AGENTS.md` so agents know where to look.
3. Keep supporting directories small and descriptive. Avoid untracked temporary folders; clean up compiler outputs (like `dist/`) before committing.

## Navigation note
Use this document and `AGENTS.md` together: `AGENTS.md` links directly to the documents listed under **Standards Index**, so you can jump from the index to the relevant section.

See also: [Coding Patterns](coding-patterns.md), [Verification Workflow](verification-workflow.md), [Standards Updates](standards-update.md).
