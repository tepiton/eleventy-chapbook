# Phase 3: Schema Parity

## Entry 1: Harmonize CSS vars, metadata schema, and OG meta (2026-03-30)

**What**: Final alignment pass across all three templates, plus CSS var rename to match folio/pamphlet naming.

**Why**: Chapbook had `--font-serif`/`--font-sans` while folio/pamphlet used `--font-body`/`--font-heading`. Also needed to align metadata schema for full portability. See DEC-008.

**How**:

- Renamed `--font-serif` → `--font-body` and `--font-sans` → `--font-heading` throughout `css/index.css`
- Dropped `siteName` from `content/_data/metadata.js`
- Added `subtitle: ""` and `image: ""` to metadata schema
- Added OG meta tags to `base.njk`
- Made `og:image` conditional — see DEC-008

**Decisions**: DEC-008

**Files**: `css/index.css`, `content/_data/metadata.js`, `_includes/layouts/base.njk`
