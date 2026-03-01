# eleventy-chapbook

An Eleventy v3 starter for chaptered literary sites. Designed for serialized fiction, novellas, and other long-form prose.

Part of a family of interoperable templates:
- **eleventy-pamphlet** - minimal, single layout
- **eleventy-chapbook** (this) - separate layouts, feature-rich
- **eleventy-folio** - polished, with extras

The `content/` directory is portable across all three. Swap templates to change the presentation without touching your content.

## Quick start

```
git clone <this-repo> my-project
cd my-project
npm install
npm run start
```

Then open `http://localhost:8082`.

## Customization

### Site metadata

Edit `content/_data/metadata.js`:

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
}
```

Note: `metadata.js` lives inside `content/_data/` so the entire `content/` directory is self-contained and portable.

### Chapters

Add files to `content/chapters/`. Each needs front matter:

```yaml
---
title: The Title of This Chapter
order: 1
description: Optional. Used in the HTML meta description tag.
---
```

- `order` controls sort order in the TOC and prev/next navigation
- Filename determines the URL: `ch04-the-storm.md` → `/chapters/ch04-the-storm/`

### Home page

Edit `content/index.njk`. Freeform markdown/HTML rendered above the chapter list. Put your epigraph, foreword, or dedication here.

### About page

Edit `content/about.md`. Colophon and credits. Uses nav key "About" order 2.

### Fonts, colors, and styles

All typographic and color tokens are CSS custom properties at the top of `css/index.css`:

```css
:root {
  --font-serif: p22-stickley-pro-text, Palatino, "Palatino Linotype", Georgia, serif;
  --font-sans: neue-kabel, "Gill Sans", "Gill Sans MT", Calibri, sans-serif;
  --color-bg: #fffff8;
  --color-text: #1a1a18;
  --color-muted: #666;
  --color-link: #2a2a20;
  --color-border: #ccc;
}
```

Change any of these to retheme the site without touching the rest of the stylesheet.

**Adobe Fonts (Typekit):** This template uses `p22-stickley-pro-text` and `neue-kabel` from Adobe Fonts. The kit IDs are baked into `_includes/layouts/base.njk`. To use different fonts, replace the Typekit `<link>` tags and update the CSS variables.

**Other web fonts:** Add a `<link>` to your font provider in `_includes/layouts/base.njk` and update the `--font-serif` or `--font-sans` variable in `css/index.css` to match.

### Literary markdown features

`markdown-it` is configured with `html: true`, so raw HTML works in markdown:

**Drop cap** (large decorated first letter + small-caps first line):

```html
<p class="drop">It was a dark and stormy night...</p>
```

**Scene heading** (centered italic with em-dash decoration, renders as `h4`):

```markdown
#### The Road at Midnight
```

**Character voice heading** (italic sans-serif, renders as `h3`):

```markdown
### The Stranger
```

**Section break** (centered small-caps, renders as `h2`):

```markdown
##
```

## Project structure

```
content/
  _data/
    metadata.js          # Title, author, URL
  index.njk              # Home page (opening prose + chapter list)
  about.md               # Credits / colophon
  chapters/
    chapters.11tydata.js # Layout for all chapters
    ch01-the-beginning.md
    ch02-the-middle.md
    ...
_includes/
  layouts/
    base.njk             # HTML shell
    home.njk             # Home page layout
    chapter.njk          # Chapter layout with prev/next
css/
  index.css              # All literary styles
```

The `content/` directory is designed to be portable. Copy it to eleventy-pamphlet or eleventy-folio to get a different presentation with the same content.

## npm scripts

| Command | Description |
|:--------|:------------|
| `npm run start` | Dev server at `0.0.0.0:8082` with live reload |
| `npm run build` | Production build to `_site/` |
| `npm run debug` | Build with Eleventy debug output |

## Deploy

The included `.github/workflows/pages.yml` builds and deploys to GitHub Pages on push to `main`. No configuration needed for custom domains — the workflow detects the repo name and sets the path prefix automatically.
