---
phase: 4
phase_name: Maintenance
updated: 2026-10-03
last_commit: c15d230
---

## Current Focus

npm 12 install-hygiene pass complete (Phase 4): fresh installs are
silent, no fixable advisories remain, Node floor is truthful. Template
is in maintenance mode.

## Active Tasks

- [ ] None — drop `audit=false` from `.npmrc` when eleventy 4 ships
      (DEC-009).

## Blockers

None.

## Context

- chapbook serves from orobia.dev, port 8082
- `content/` is portable: copy to pamphlet or folio unchanged
- npm 12: `allowScripts` pins `fsevents@2.3.3`; sharp 0.35.x needs no
  pin (no install script)
- eleventy-img@7 requires node >=22 (`engines` and `.nvmrc` say so)
- Remaining audit findings are braces→chokidar, dev-server-only and
  unfixable on eleventy 3; hidden from install output only (DEC-009)
- Chapter sort: `order` fallback 999 + secondary sort by filename;
  OG image conditional on `metadata.image`; Typekit kits `ztn6rcs`
  and `pgn7ley` baked into `base.njk`

## Next Session

Nothing queued. Phase 5 ideas in `docs/IMPLEMENTATION.md`.
