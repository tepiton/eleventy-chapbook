# Implementation — eleventy-chapbook

## Phase Overview

| # | Name | Status | Date Range |
|---|------|--------|------------|
| 0 | Foundation | ✅ Complete | 2026-02-23 |
| 1 | Cleanup & Portability | ✅ Complete | 2026-02-25–28 |
| 2 | Alignment | ✅ Complete | 2026-03-03 |
| 3 | Schema Parity | ✅ Complete | 2026-03-30 |

---

## Completed Phases

### Phase 0: Foundation (2026-02-23)

- Converted `eleventy-base-blog` v9 into literary chaptered starter
- Added GitHub Actions workflow for Eleventy deployment
- Set title to Chapbook, URL to orobia.dev, port 8082
- Three-layout structure: `base.njk`, `home.njk`, `chapter.njk`
- Rich CSS literary features: drop caps, scene headings (h4 em-dash), character headings

See: chronicles/phase-0-foundation.md

### Phase 1: Cleanup & Portability (2026-02-25–28)

- Rewrote README to match repo name and document actual structure
- Moved `_data/metadata.js` to `content/_data/metadata.js`
- Switched chapters collection from tag-based to glob-based
- Moved port from `eleventy.config.js` to `package.json` start script
- Replaced conditional `metadata.typekit` with baked-in Typekit `<link>` tags

See: chronicles/phase-1-cleanup.md

### Phase 2: Alignment (2026-03-03)

- Standardized chapter sort: secondary sort by filename (fallback 999 already set)
- Renamed `index.njk` to `index.md` for consistency with pamphlet
- Simplified `chapters.11tydata.js` — removed `eleventyComputed` block
- Updated `chapter.njk` to use `{{ order }}` (not `chapterNumber`)
- Updated `about.md` with colophon and GitHub source link
- Added dark mode with three-way toggle (light/dark/system)
- Added `details/summary` styling

See: chronicles/phase-2-alignment.md

### Phase 3: Schema Parity (2026-03-30)

- Renamed `--font-serif` to `--font-body` and `--font-sans` to `--font-heading` throughout CSS
- Dropped `siteName` from metadata, added `subtitle: ""` and `image: ""`
- Added OG meta tags to `base.njk`; `og:image` conditional
- Aligned CSS vars, metadata schema, and OG meta with folio and pamphlet

See: chronicles/phase-3-parity.md

---

## Current State

The template family is stable. All three templates (folio, pamphlet, chapbook) share:

- Identical `content/` structure (fully portable)
- Identical metadata schema in `content/_data/metadata.js`
- Identical chapter sort behavior
- Identical OG meta conditional rendering

chapbook has the richest CSS (drop caps, scene headings, character headings) and serves as the reference for literary CSS features.

No active feature work. Future changes should track as Phase 4.

---

## Future Phases

### Phase 4: (Unplanned)

Ideas if needed:

- Port literary CSS features back to folio/pamphlet
- RSS/Atom feed for chapters
- Pagination for long chapter lists
