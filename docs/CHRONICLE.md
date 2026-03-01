# Chronicle

A record of what was done to transform `eleventy-base-blog` v9 into this literary chaptered site base.

---

## Starting point

`eleventy-base-blog` v9 — Eleventy v3, ESM. A generic blog starter with RSS feed, syntax highlighting, tag pages, a posts collection, and Luxon date formatting.

---

## Files deleted

- `content/feed/` — Atom feed template and XSL stylesheet
- `content/blog/` — all sample blog posts
- `content/blog.njk` — blog archive page
- `content/tag-pages.njk` — tag archive pages
- `content/tags.njk` — tags index
- `_includes/layouts/post.njk` — blog post layout
- `_includes/postslist.njk` — post list partial
- `css/message-box.css` — setup instructions component
- `css/prism-diff.css` — syntax highlighting diff styles

---

## `package.json`

- Removed deps: `@11ty/eleventy-plugin-rss`, `@11ty/eleventy-plugin-syntaxhighlight`, `prismjs`, `luxon`, `@zachleat/heading-anchors`
- Added dep: `markdown-it` (explicit)
- Renamed: `eleventy-base-blog` → `eleventy-literary-chaptered-base`
- Updated description

---

## `eleventy.config.js`

- Removed: `feedPlugin`, `pluginSyntaxHighlight` imports and registrations
- Removed: passthrough copy for `content/feed/pretty-atom-feed.xsl`
- Added: `import markdownIt from "markdown-it"`
- Added: markdown-it configured with `{ html: true, breaks: false, linkify: true, typographer: true }` and `.disable("code")` so inline code fences don't interfere with literary HTML
- Added: `chapters` collection sorted ascending by `order` front matter (fallback `999`)
- Added: `eleventyConfig.setServerOptions({ showAllHosts: true, port: 8082 })` — binds to all interfaces (LAN, Tailscale, etc.) on port 8082

---

## `_config/filters.js`

- Removed: `readableDate` (used Luxon), `filterTagList`, `sortAlphabetically`
- Kept: `head`, `min`, `getKeys`
- Added: `htmlDateString` reimplemented with native `Date.toISOString()` (no Luxon) — required by `content/sitemap.xml.njk`

---

## `_data/metadata.js`

New shape:

```js
export default {
  title: "Your Literary Work",
  siteName: "yoursite.lol",
  url: "https://example.com/",
  language: "en",
  description: "A description of this work.",
  author: {
    name: "Author Name",
    url: "https://example.com/about/",
  },
  typekit: {
    serif: "",   // Adobe Fonts kit ID, e.g. "ztn6rcs" for p22-stickley-pro-text
    sans: "",    // Adobe Fonts kit ID, e.g. "pgn7ley" for neue-kabel
  }
}
```

Leave `typekit.serif` / `typekit.sans` as empty strings to skip the Typekit `<link>` tags and fall back to the CSS font stacks.

---

## `_includes/layouts/base.njk`

- Removed: Atom feed `<link rel="alternate">`, `<heading-anchors>` web component wrapper, heading-anchors JS bundle include
- Added: conditional Typekit `<link>` tags — only rendered when kit IDs are non-empty
- Header: site title links to `/`, nav via `eleventyNavigation`
- Footer: author name only
- Kept: CSS bundle injection, skip link, JS bundle script tag

---

## `_includes/layouts/home.njk`

Replaced setup message box with:

- Renders `{{ content | safe }}` (the markdown body of `index.njk` — opening prose, epigraph, etc.)
- Renders a `<nav class="chapter-list">` TOC iterating `collections.chapters`, showing chapter number and title per row

---

## `_includes/layouts/chapter.njk` (new)

- Extends `layouts/base.njk`
- `<header class="chapter-header">` with chapter number and title
- Renders `{{ content | safe }}`
- Prev/next nav via `getPreviousCollectionItem` / `getNextCollectionItem` on `collections.chapters`

---

## `content/content.11tydata.js`

Changed default layout from `layouts/home.njk` to `layouts/base.njk`. (The home page sets its own layout explicitly.)

---

## `content/index.njk`

Rewritten: nav key "Home" order 1, layout `layouts/home.njk`. Body contains opening prose with a `.drop` paragraph and a blockquote — replace with your own epigraph or foreword.

---

## `content/about.md`

Rewritten as a literary credits/colophon page. Nav key "About" order 2.

---

## `content/chapters/` (new directory)

### `chapters.11tydata.js`

Directory data file applied to all chapter files:

```js
export default {
  tags: ["chapters"],
  layout: "layouts/chapter.njk",
  eleventyComputed: {
    chapterNumber: data => data.order
  }
}
```

### Chapter front matter convention

```yaml
---
title: The Beginning
order: 1
description: How it all started.   # optional
---
```

URLs are filename-based: `/chapters/ch01-the-beginning/`

### Sample chapters

- `ch01-the-beginning.md` — order: 1. Drop cap opening, scene heading (h4), blockquote dialogue. No prev link.
- `ch02-the-middle.md` — order: 2. Character voice headings (h3), blockquote speeches, section break (h2). Has both prev and next.
- `ch03-the-end.md` — order: 3. Mixed narrative, closing passage. No next link.

---

## `css/index.css`

Complete replacement with literary CSS:

- `--color-bg: #fffff8` cream background
- Fluid font: `clamp(1rem, .8rem + 1vw, 1.25rem)`
- `--measure: min(90%, 52ch)` constrained line length; `main` centered to this measure
- Font vars: `p22-stickley-pro-text, Palatino, Georgia, serif` / `neue-kabel, "Gill Sans", Calibri, sans-serif`
- Drop cap: `.drop::first-letter` large float-left initial; `.drop::first-line` small-caps
- Scene headings: `h4` centered italic, `::before`/`::after` em-dash decoration
- Character headings: `h3` italic sans-serif, muted color
- Section break: `h2` small-caps sans, centered, muted
- Blockquote: italic, left border, indented, muted
- Chapter nav: `.links-nextprev` flex row, prev left / next right
- TOC: `.chapter-list` with chapter number + italic title per row
- Header/footer: sans-serif, minimal

---

## Dev server

```
npm run start
```

Binds to `0.0.0.0:8082`. On startup, Eleventy prints all available host addresses (loopback, LAN, Tailscale, etc.).

---

## Post-build

- `README.md` rewritten from scratch — replaced the original eleventy-base-blog README with setup and customization instructions for the literary base.
- `docs/THREE-TAKES.md` added — comparative review of this implementation against two parallel implementations of the same plan by other LLMs (codex-tree, opencode-tree).

---

## README rewrite (2026-02-25)

Rewrote `README.md`. Previous version had the title `eleventy-literary-chaptered-base` (the old package name) and was longer than necessary.

New README covers:
- Correct repo name `eleventy-chapbook` as title
- `_data/metadata.js` schema including the `typekit` block and `siteName` field
- Chapters, home page, about page, and fonts documented
- Literary markdown features (drop cap, scene headings, character voice, section breaks) preserved from the old README
- Project structure tree
- npm scripts table
- Deploy section

---

## Font parameterization and Typekit (2026-02-27)

CSS was already parameterized with `--font-serif` and `--font-sans` custom properties and already referenced `p22-stickley-pro-text` and `neue-kabel`. The only change was in `base.njk`: replaced the conditional `metadata.typekit` template logic with two baked-in Typekit `<link>` tags (kit IDs `ztn6rcs` and `pgn7ley`). Removed the `typekit` object from `metadata.js`.

## Site URL, title, and nav (2026-02-27)

- Set `metadata.url` to `https://orobia.dev/`
- Set `metadata.siteName` to `"orobia.dev"`
- Set `metadata.title` to `"Chapbook"`
- Updated author URL to `https://orobia.dev/about/`
- Updated `content/about.md` to reference orobia.dev

---

## Content portability (2026-02-28)

Made `content/` fully portable across the three template family (pamphlet, chapbook, folio).

### Changes

1. Moved `_data/metadata.js` to `content/_data/metadata.js`
2. Updated `eleventy.config.js` data path from `../_data` to `_data`
3. Changed chapters collection from `getFilteredByTag("chapters")` to `getFilteredByGlob("content/chapters/*.md")`
4. Simplified `chapters.11tydata.js` - removed `tags`, kept layout only
5. Moved port from `eleventy.config.js` to `package.json` start script

### Result

The `content/` directory is now self-contained. Drop it into any of the three templates and it works. Each template provides its own layouts, CSS, and personality.
