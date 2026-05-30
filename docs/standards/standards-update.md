# Standards Update Workflow

Sometimes a story requires updating the directories, coding patterns, or verification steps documented in this repo. When that happens, follow this workflow so future agents understand both the new standard and why it changed.

## When to update
- A story introduces a new directory, feature pattern, or build requirement that is not already described in `docs/standards/`.
- A toolchain change (e.g., adding a linter rule or new verification step) alters how agents should approach development or testing.
- A standard no longer reflects the actual intent of the codebase (e.g., the repo shifts from CSS modules to utility classes).

## Update steps
1. **Change the relevant doc** inside `docs/standards/`. Keep each document focused: directories, coding patterns, verification, and the update policy should remain separate but cross-reference one another.
2. **Add a rationale entry to AGENTS.md** describing the story or reason for the change. Cite the acceptance criteria, and mention what else was touched (e.g., `AGENTS.md` entry `- Added verification workflow note because story XYZ introduced script ABC`).
3. **Update README.md** if agents should access the changed standard from the landing page.
4. **Verify links** by running `npm test` (this runs `scripts/verify-docs.mjs` to ensure AGENTS lists every standard file and README mentions the standards directory).
5. **Document the change** in `/home/daytona/run-artifacts/agent-summary.md` so the automation record can surface the reason to reviewers.

## Recording reasoning
Keep a short log in AGENTS.Versioned entries should resemble the following:

```
- [2026-05-XX] Story ABC-123: Introduced new verification script to validate docs so agents can rely on consistent references.
```

The goal is to make the rationale discoverable without searching through Git history. Each entry should link to the story (if available) and emphasize why the repository-wide standard needed updating.

See also: [Directory Expectations](directory-expectations.md), [Coding Patterns](coding-patterns.md), [Verification Workflow](verification-workflow.md).
