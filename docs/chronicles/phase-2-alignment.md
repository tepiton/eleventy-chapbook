# Phase 2: Alignment

## Entry 1: Standardize across template family (2026-03-03)

**What**: Aligned chapbook with pamphlet and folio on chapter sorting, layout simplification, content files, and dark mode.

**Why**: Needed identical behavior for `content/` portability to be complete.

**How**:

- Added secondary sort by filename for deterministic tie-breaking (fallback 999 already set) — see DEC-006
- Renamed `index.njk` to `index.md` for consistency with pamphlet
- Simplified `chapters.11tydata.js` — removed `eleventyComputed` block, now just `layout:`
- Updated `chapter.njk` to use `{{ order }}` instead of `{{ chapterNumber }}`
- Updated `about.md` with colophon and GitHub source link
- Added dark mode with three-way toggle (light/dark/system)
- Added `details/summary` styling
- Removed leftover `_data/eleventyDataSchema.js` from base-blog

**Decisions**: DEC-006

**Files**: `eleventy.config.js`, `content/chapters/chapters.11tydata.js`, `_includes/layouts/chapter.njk`, `content/index.md`, `content/about.md`, `css/index.css`, `js/`
