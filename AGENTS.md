# AGENTS Index

This file is the entry point for AI agents working in the Vite Starter workspace. It maps the essential controls and captures why standards evolve so that a new agent can immediately follow the repository's expectations without guessing.

## Standards Index (per-document links)
- [Directory Expectations](docs/standards/directory-expectations.md) — describes how the repository is organized, where new directories belong, and how to grow the tree safely.
- [Coding Patterns and Quality Controls](docs/standards/coding-patterns.md) — outlines component structure, TypeScript preferences, styling guidance, accessibility expectations, and dependency discipline.
- [Verification Workflow for Agents](docs/standards/verification-workflow.md) — explains the scripted checks (`npm test` runs `scripts/verify-docs.mjs`), how to exercise the build, and how to extend verification when features expand.
- [Standards Update Workflow](docs/standards/standards-update.md) — records the procedures for changing any standard, including how to document rationale and keep references in sync.

## Navigation and usage notes
1. Read this index before editing so you understand which document to consult for directory layout, coding styles, or verification expectations.
2. Follow the quick links above to jump from AGENTS.md directly into each control document. Each document also references the others to provide context.
3. Before finishing a story, run the verification command (`npm ci && npm test && npm run build`). `npm test` runs `scripts/verify-docs.mjs`, which ensures `AGENTS.md` lists every file in `docs/standards/` and that `README.md` references the standards tree.
4. When a story requires changes to any listed standard, update the relevant markdown, log the rationale in AGENTS, and rerun `npm test` so `scripts/verify-docs.mjs` confirms the references stay aligned.

## Standards updates (rationale log)
- [2026-06-02] Agentic SDLC PoC story: Documented that `npm test` now runs `test:unit`/Vitest before the doc verification step so interactive counter changes ship with repeatable unit-test evidence, and linked the updated verification workflow guidance for future agents.
- [2026-06-01] Agentic SDLC PoC story: Introduced the structured docs tree, validation script, and README guidance so every agent can find the directory, coding, and verification standards in one place.
- [2026-05-30] Agentic SDLC PoC story: Reiterated that agents must update the relevant markdown, log the rationale entry, and rerun `scripts/verify-docs.mjs` when any standard changes so future agents can adopt the control without guessing.
- [2026-05-30] Agentic SDLC PoC story: Added a Vitest-backed `npm run test:unit` check for the new confetti milestone and recorded the script in `docs/standards/verification-workflow.md` so the interactive behavior remains covered by automated verification.
- [2026-06-02] Agentic SDLC PoC story: Updated `npm test` so `scripts/verify-docs.mjs` and `vitest run` execute together, keeping the mandated `npm ci && npm test && npm run build` workflow aligned with the documented verification steps and reinforcing the confetti milestone coverage.


When you bump any of the standards above:
1. Update the relevant document under `docs/standards/`.
2. Add an entry here (one bullet per story or change) describing what changed, why, and which acceptance criteria forced it.
3. Re-run `npm test` to confirm `scripts/verify-docs.mjs` still sees every linked file, and describe the reasoning in the bullet for future agents.

Any story that requires updating these standards must document the valid reasoning above and in the touched markdown so future agents can adopt the new expectations without guessing.

The guidance above ensures that standards and their history are discoverable without inspecting Git history or juggling multiple files.
