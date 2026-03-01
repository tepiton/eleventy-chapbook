# Content Interoperability Plan

Goal: Make content/ directories portable across pamphlet, chapbook, and folio templates.

## Vision

- **content/** = portable data unit (metadata, chapters, index, about)
- **repo** = theme/skin (layouts, CSS, plugins, personality)
- Swap repos to change look, not templates

## Standardized content/ structure

```
content/
  _data/
    metadata.js         # title, author, description, url, etc.
  chapters/
    chapters.11tydata.js  # sets layout only
    *.md                 # order + title in frontmatter
  index.md
  about.md
  404.md
```

## Key decisions

1. **Data location**: `content/_data/metadata.js` (all three)
2. **Chapters collection**: Glob-based `content/chapters/*.md` (no tags)
3. **Chapter frontmatter**: Minimal - just `order` and `title`
4. **Layout assignment**: Via `chapters.11tydata.js`, not in frontmatter
5. **Port setting**: In `package.json` start script, not eleventy.config.js
6. **Single metadata file**: No separate book.js

## Changes per repo

### pamphlet

1. Create `content/chapters/chapters.11tydata.js` to set layout
2. Remove layout from chapter frontmatter
3. Move port from `eleventy.config.js` to `package.json` start script

### chapbook

1. Move `_data/metadata.js` to `content/_data/metadata.js`
2. Update `eleventy.config.js` data path: `data: "../_data"` to `data: "_data"`
3. Change chapters collection from `getFilteredByTag("chapters")` to `getFilteredByGlob("content/chapters/*.md")`
4. Simplify `chapters.11tydata.js` - remove tags, keep layout only
5. Move port from `eleventy.config.js` to `package.json` start script

### folio

1. Merge `_data/book.js` into `content/_data/metadata.js`
2. Delete `_data/book.js`
3. Update `eleventy.config.js` data path
4. Change chapters collection from `getFilteredByTag("chapter")` to `getFilteredByGlob("content/chapters/*.md")`
5. Simplify `chapters.11tydata.js` - remove tags, keep layout only
6. Update `base.njk` to remove `book.` references
7. Move port from `package.json` to stay in `package.json` (already there)
8. Delete `content/blog/` directory
9. Delete unused files:
   - `content/blog.njk`
   - `content/tags.njk`
   - `content/tag-pages.njk`
   - `_includes/postslist.njk`
   - `_includes/layouts/post.njk`
   - `css/message-box.css`
   - `css/prism-diff.css`

## Ports

- pamphlet: 8086
- chapbook: 8082
- folio: 8084
