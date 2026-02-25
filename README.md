# eleventy-chapbook

An Eleventy v3 starter for chaptered literary sites. Designed for serialized fiction, novellas, and other long-form prose.

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

Edit `_data/metadata.js`:

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
    serif: "",   // Adobe Fonts kit ID, e.g. "ztn6rcs"
    sans: "",    // Adobe Fonts kit ID, e.g. "pgn7ley"
  }
}
```

Leave `typekit.serif` / `typekit.sans` as empty strings to use the CSS fallback stacks instead of Adobe Fonts.

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

### Fonts

To use Adobe Fonts, get a kit ID from [fonts.adobe.com](https://fonts.adobe.com) and put it in `metadata.js`. The kit ID is the hash in the `use.typekit.net/<id>.css` URL. To use different fonts entirely, update the `--font-serif` and `--font-sans` CSS variables in `css/index.css`.

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
  index.njk              # Home page (opening prose + chapter list)
  about.md               # Credits / colophon
  chapters/
    chapters.11tydata.js # Tags, layout for all chapters
    ch01-the-beginning.md
    ch02-the-middle.md
    ...
_data/
  metadata.js            # Title, author, URL, Typekit IDs
_includes/
  layouts/
    base.njk             # HTML shell
    home.njk             # Home page layout
    chapter.njk          # Chapter layout with prev/next
css/
  index.css              # All literary styles
```

## npm scripts

| Command | Description |
|:--------|:------------|
| `npm run start` | Dev server at `0.0.0.0:8082` with live reload |
| `npm run build` | Production build to `_site/` |
| `npm run debug` | Build with Eleventy debug output |

## Deploy

The included `.github/workflows/pages.yml` builds and deploys to GitHub Pages on push to `main`. No configuration needed for custom domains — the workflow detects the repo name and sets the path prefix automatically.
