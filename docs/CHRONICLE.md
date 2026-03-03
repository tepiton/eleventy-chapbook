# Chronicle

## Overview

`eleventy-chapbook` is an Eleventy v3 starter for literary chaptered sites. One of three interoperable templates (pamphlet, chapbook, folio) that share portable `content/` directories. Served from orobia.dev.

## Origin

Converted from `eleventy-base-blog` v9 into a literary starter. See `docs/THREE-TAKES.md` for comparison with parallel implementations.

## Key Architecture

- **Single input dir**: `content/`
- **Layouts**: `_includes/layouts/base.njk`, `home.njk`, `chapter.njk`
- **Chapters collection**: Glob-based `content/chapters/*.md` (no tags)
- **Chapter frontmatter**: Just `order` and `title`
- **Layout assignment**: Via `chapters.11tydata.js` and `content.11tydata.js`
- **Port**: 8082 in `package.json` start script
- **Fonts**: Typekit kits `ztn6rcs` and `pgn7ley` baked into `base.njk`
- **CSS vars**: `--font-serif` and `--font-sans` in `:root`

## Directory Structure

```
content/
  _data/metadata.js
  chapters/
    chapters.11tydata.js    # layout: layouts/chapter.njk
    *.md
  content.11tydata.js       # layout: layouts/base.njk
  index.njk, about.md, 404.md
_includes/layouts/
  base.njk, home.njk, chapter.njk
css/index.css
```

## CSS Features

- Drop cap: `.drop::first-letter` with small-caps first line
- Scene headings: `h4` centered italic with em-dash decoration
- Character headings: `h3` italic sans-serif
- Section break: `h2` small-caps centered
- Blockquote: italic with left border
- Chapter nav: `.links-nextprev` flex row

---

## Recent Changes

### 2026-03-03: Simplify chapter layout

Aligned with pamphlet and folio for full portability.

1. Removed `eleventyComputed` block from `chapters.11tydata.js` - now just `layout: "layouts/chapter.njk"`
2. Updated `chapter.njk` to use `{{ order }}` instead of `{{ chapterNumber }}`

### 2026-02-28: Content portability

Made `content/` portable across all three templates.

1. Moved `_data/metadata.js` to `content/_data/metadata.js`
2. Changed chapters collection from `getFilteredByTag("chapters")` to `getFilteredByGlob("content/chapters/*.md")`
3. Simplified `chapters.11tydata.js` - removed `tags`
4. Moved port from `eleventy.config.js` to `package.json`

### 2026-02-27: Fonts and Typekit

Replaced conditional `metadata.typekit` with baked-in Typekit `<link>` tags. Removed `typekit` from `metadata.js`. Set `metadata.url` to `https://orobia.dev/`.

### 2026-02-25: README rewrite

Corrected title to `eleventy-chapbook`, documented metadata schema.
