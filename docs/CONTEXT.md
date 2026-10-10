---
phase: 4
phase_name: Maintenance
updated: 2026-10-09
last_commit: ad9ae71
---

## Current Focus

folio references purged from README.md and CLAUDE.md (Entry 4),
completing the 2026-10-04 folio retirement. chapbook is one of four
document templates (with pamphlet, prose-blog, tech-blog) under the
content contract. Template is in maintenance mode.

## Active Tasks

- [ ] None — drop `audit=false` from `.npmrc` when eleventy 4 ships
      (DEC-009).

## Blockers

None.

## Context

- chapbook serves from orobia.dev, port 8082
- `content/` is portable: copy to any document template under the
  content contract; folio retired 2026-10-04
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
