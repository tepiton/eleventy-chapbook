---
phase: 3
phase_name: Schema Parity
updated: 2026-03-30
last_commit: 73636b6
---

## Current Focus

All three templates (folio, pamphlet, chapbook) are now aligned on metadata schema, OG meta, and CSS vars. The template family is stable and `content/` is fully portable across all three.

## Active Tasks

- [ ] No active tasks — templates are in maintenance mode

## Blockers

None.

## Context

- chapbook serves from orobia.dev, port 8082
- `content/` is portable: copy to pamphlet or folio unchanged
- Chapter sort: `order` fallback 999 + secondary sort by filename
- OG image is conditional — only rendered when `metadata.image` is set
- Typekit kits `ztn6rcs` and `pgn7ley` baked into `base.njk`

## Next Session

Review `docs/IMPLEMENTATION.md` for planned future work, or read `docs/chronicles/` for history. Start any new feature work by creating a Phase 4 section in IMPLEMENTATION.md.
