# Content Interoperability

**Status: Complete**

The `content/` directory is now portable across pamphlet, chapbook, and folio templates.

## Vision

- **content/** = portable data unit (metadata, chapters, index, about)
- **repo** = theme/skin (layouts, CSS, plugins, personality)
- Swap repos to change look, not content

## Standardized content/ structure

```
content/
  _data/
    metadata.js         # title, author, description, url, etc.
  chapters/
    chapters.11tydata.js  # sets layout: layouts/chapter.njk
    *.md                 # order + title in frontmatter
  content.11tydata.js    # sets layout: layouts/base.njk (default)
  index.md
  about.md
  404.md
```

## Requirements for portability

All three templates must have:

1. `content/_data/metadata.js` (same path, same schema)
2. `_includes/layouts/base.njk` (default layout for all content)
3. `_includes/layouts/chapter.njk` (layout for chapters, extends base.njk)
4. `chapters` collection via `getFilteredByGlob("content/chapters/*.md")`
5. Port in `package.json` start script (not eleventy.config.js)

## Key decisions

1. **Data location**: `content/_data/metadata.js` (all three)
2. **Chapters collection**: Glob-based `content/chapters/*.md` (no tags)
3. **Chapter frontmatter**: Minimal - just `order` and `title`
4. **Layout assignment**: Via `chapters.11tydata.js`, not in frontmatter
5. **Port setting**: In `package.json` start script, not eleventy.config.js
6. **Single metadata file**: No separate book.js
7. **Chapter number**: Use `{{ order }}` in templates (not `chapterNumber`)

## Template responsibilities

Each template provides:
- `_includes/layouts/base.njk` - shell for all pages
- `_includes/layouts/chapter.njk` - chapter-specific wrapper (extends base)
- `css/` - typography and styling
- `js/` - any client-side functionality
- `eleventy.config.js` - plugins, collections, build config

## Content responsibilities

The `content/` directory contains:
- `_data/metadata.js` - site metadata
- `chapters/*.md` - chapter content with `order` and `title` frontmatter
- `chapters/chapters.11tydata.js` - points to `layouts/chapter.njk`
- `content.11tydata.js` - points to `layouts/base.njk` (default)
- `index.md`, `about.md`, `404.md` - standard pages

## Ports

- pamphlet: 8086
- chapbook: 8082
- folio: 8084

## Single-page works

For single-page works, omit the `chapters/` directory. `index.md` will inherit `layouts/base.njk` from `content.11tydata.js`.
