# Coding Patterns and Quality Controls

This template is intentionally minimal. Agents should keep that focus by enhancing the code only when the story demands it and by honoring the following patterns:

## Component and state habits
- Favor function components with hooks rather than class components; keep components small and single-purpose.
- Lift state up only when multiple children need it. Prefer `useMemo` and `useCallback` sparingly and only after profiling indicates repeated work.
- Keep the UI tree flat; avoid deeply nested structures that make small changes harder to reason about.
- Document non-obvious business rules with short comments, but otherwise let expressive naming carry the intent.

## TypeScript expectations
- Keep `tsconfig.app.json` strict; add new types next to their usage so future agents can quickly understand the surface area.
- Export only what other teams need. Use `interface` for public props and `type` for internal unions when a discriminant is useful.
- Prefer `Readonly` types for props when data should not mutate, and `Record`/`Map` when keyed collections appear.

## Styling, assets, and accessibility
- Co-locate CSS near the component it styles, unless the styles are shared globally (then add them to `src/styles/`).
- Use semantic HTML (`<section>`, `<button>`, `<label>`, etc.) and keep `aria-*` attributes aligned with the visible states.
- Keep color usage tied to the existing `src/assets` palette; when adding new assets, drop them into `public/` or `src/assets/` and document the intent in `directory-expectations.md`.

## Dependency discipline
- Before adding a dependency, double-check that React, Vite, or the browser already provide the needed primitives.
- For small helpers that can be written in a few lines, prefer in-repo utils over inhaling another package. When a dependency is necessary, document why in the story and mention it in the relevant standards doc.

See also: [Directory Expectations](directory-expectations.md), [Verification Workflow](verification-workflow.md), [Standards Updates](standards-update.md).
