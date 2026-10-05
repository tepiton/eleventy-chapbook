---
phase: 4
phase_name: Maintenance
updated: 2026-10-04
last_commit: 982c377
---

## Current Focus

dek ported from folio, transform dropped (Entry 2), and `content/img`
passthrough added (Entry 3) — chapbook is the literary chaptered
template and enforces the content contract with pamphlet and the
blogs. Template is in maintenance mode.

## Active Tasks

- [ ] None — drop `audit=false` from `.npmrc` when eleventy 4 ships
      (DEC-009).

## Blockers

None.

## Context

- chapbook serves from orobia.dev, port 8082
- `content/` is portable: copy to pamphlet unchanged
- Chapters support `dek` — subtitle under the heading and in the TOC;
  README documents the field
- No image transform (DEC-010): `content/img/` copies to `_site/img/`
  verbatim (DEC-012); 141 packages; `engines.node` stays >=22
  (DEC-011)
- npm 12: `allowScripts` pins `fsevents@2.3.3`
- Remaining audit findings are braces→chokidar, dev-server-only and
  unfixable on eleventy 3; hidden from install output only (DEC-009)
- Chapter sort: `order` fallback 999 + secondary sort by filename;
  OG image conditional on `metadata.image`; Typekit kits `ztn6rcs`
  and `pgn7ley` baked into `base.njk`

## Next Session

Nothing queued. Phase 5 ideas in `docs/IMPLEMENTATION.md`.
