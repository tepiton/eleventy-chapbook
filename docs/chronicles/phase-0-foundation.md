# Phase 0: Foundation

## Entry 1: Initial setup (2026-02-23)

**What**: Converted `eleventy-base-blog` v9 into a literary chaptered starter with the richest CSS feature set of the three templates. Added GitHub Actions CI.

**Why**: Needed a full-featured base for literary/chaptered sites. Chapbook is the reference implementation for literary CSS features. Part of a three-template family (pamphlet, chapbook, folio). See docs/THREE-TAKES.md.

**How**:

- Forked from `eleventy-base-blog` v9
- Three-layout chain: `base.njk` → `home.njk` → `chapter.njk`
- Set title=Chapbook, URL=orobia.dev, port=8082
- Literary CSS: drop caps (`.drop::first-letter`), scene headings (h4 em-dash), character headings (h3 italic), section breaks (h2 small-caps)
- Added GitHub Actions workflow for Eleventy deployment to GitHub Pages

**Files**: `eleventy.config.js`, `_includes/layouts/`, `css/index.css`, `.github/workflows/`
