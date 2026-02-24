# eleventy-literary-chaptered-base

A base for literary chaptered sites built with [Eleventy v3](https://www.11ty.dev/) (ESM). Designed for serialized fiction, novellas, and other long-form prose — in the style of twohorses.lol and esther.lol.

## Features

- Per-chapter markdown files with automatic prev/next navigation
- Table of contents on the home page
- Literary CSS: cream background, fluid type, drop caps, scene/character headings, em-dash decorations
- Adobe Fonts (Typekit) support with graceful fallback stacks
- Drafts support (`draft: true` in front matter — excluded from production builds)
- Automatic image optimization via `@11ty/eleventy-img`
- Dev server binds to all interfaces (LAN, Tailscale) on port 8082

---

## Quick start

```
git clone <this-repo> my-project
cd my-project
npm install
npm run start
```

Then open `http://localhost:8082`.

---

## Customization

### 1. Site metadata

Edit `_data/metadata.js`:

```js
export default {
  title: "Your Work's Title",
  siteName: "yoursite.lol",
  url: "https://yoursite.lol/",
  language: "en",
  description: "A description of this work.",
  author: {
    name: "Your Name",
    url: "https://yoursite.lol/about/",
  },
  typekit: {
    serif: "",   // Adobe Fonts kit ID, e.g. "ztn6rcs"
    sans: "",    // Adobe Fonts kit ID, e.g. "pgn7ley"
  }
}
```

Leave `typekit.serif` / `typekit.sans` as empty strings to skip loading Adobe Fonts and use the CSS fallback stacks (`Palatino, Georgia, serif` / `Gill Sans, Calibri, sans-serif`).

### 2. Home page opening prose

Edit `content/index.njk`. The body of this file is freeform markdown/HTML rendered above the chapter list. Put your epigraph, foreword, or dedication here.

### 3. Chapters

Add files to `content/chapters/`. Each file needs this front matter:

```yaml
---
title: The Title of This Chapter
order: 1
description: Optional. Used in the HTML meta description tag.
---
```

- `order` controls the sort order in the TOC and prev/next navigation.
- The filename determines the URL: `ch04-the-storm.md` → `/chapters/ch04-the-storm/`
- Chapters are automatically tagged `chapters` and use `layouts/chapter.njk`.

### 4. Literary markdown features

Since `markdown-it` is configured with `html: true`, you can use raw HTML in your markdown:

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

**Blockquote dialogue**:

```markdown
> "What are you doing here?"
>
> "Looking for something I lost."
```

### 5. About / credits page

Edit `content/about.md`. This is the colophon and credits page. It uses nav key "About" order 2.

### 6. Fonts

To use Adobe Fonts, get a kit ID from [fonts.adobe.com](https://fonts.adobe.com) and put it in `metadata.js`. The kit ID is the hash in the `use.typekit.net/<id>.css` URL.

To use different fonts entirely, update the `--font-serif` and `--font-sans` CSS variables in `css/index.css`.

---

## Project structure

```
content/
  index.njk              # Home page (opening prose + TOC)
  about.md               # Credits / colophon
  chapters/
    chapters.11tydata.js # Directory data: tags, layout, chapterNumber
    ch01-*.md            # Chapter files
    ch02-*.md
    ...
_includes/
  layouts/
    base.njk             # Root HTML shell
    home.njk             # Home page (extends base, adds TOC)
    chapter.njk          # Chapter page (extends base, adds prev/next)
_data/
  metadata.js            # Site title, author, Typekit IDs
css/
  index.css              # All literary styles
```

---

## npm scripts

| Command | Description |
|---|---|
| `npm run start` | Dev server at `0.0.0.0:8082` with live reload |
| `npm run build` | Production build to `_site/` |
| `npm run debug` | Build with Eleventy debug output |

---

## Drafts

Add `draft: true` to any file's front matter. Drafts are visible during `npm run start` but excluded from `npm run build`.

---

## Content Security Policy

The default setup inlines CSS via `{% getBundle "css" %}`. If your host enforces a strict CSP, switch to an external stylesheet in `_includes/layouts/base.njk`:

```njk
{# replace this: #}
<style>{% getBundle "css" %}</style>

{# with this: #}
<link rel="stylesheet" href="{% getBundleFileUrl "css" %}">
```
