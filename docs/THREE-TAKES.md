# Three Takes

The same plan — transform `eleventy-base-blog` v9 into a literary chaptered site base — was given to three LLMs simultaneously. This document compares results across all three trees.

- **claude-tree** — Claude (Sonnet 4.6, this session)
- **codex-tree** — OpenAI Codex
- **opencode-tree** — OpenCode (unknown model)

---

## Completion

| Area | claude | codex | opencode |
|---|---|---|---|
| Files deleted | Yes | Partial — blog/feed kept | Yes |
| markdown-it configured | Yes | No | Yes |
| Typekit support | Yes | No | Partial (single ID) |
| Chapters collection | Yes | Yes (wrong tag) | Yes |
| chapter.njk layout | Yes | Yes | No — baked into base.njk |
| home.njk layout | Yes | Minimal | No — no home.njk |
| chapters.11tydata.js | Yes | Yes | No |
| 3 sample chapters | Yes | Yes | Yes |
| Drop cap CSS | Yes | No | Yes |
| Scene headings (h4 em-dash) | Yes | No | Yes |
| Literary CSS (cream bg, fluid type) | Yes | Partial | Yes |
| Dev server all-hosts + port | Yes (8082) | Partial (8084, no host bind) | Yes (8086, showAllHosts) |
| README rewritten | Yes | No | Unknown |
| docs/CHRONICLE.md | Yes | Yes | Yes |

---

## Architectural choices

### Layout structure

**Claude** uses three layouts: `base.njk` → `home.njk` → `chapter.njk`, each extending the previous via Eleventy's layout chaining. Clean separation — chapter-specific markup lives in `chapter.njk`, home TOC logic lives in `home.njk`.

**Codex** uses the same three-layout chain but keeps `home.njk` as a near-empty pass-through, putting TOC rendering back in `content/index.njk` instead. Chapter layout exists and works but the home layout adds no value.

**OpenCode** collapses everything into a single `base.njk`. Chapter nav is rendered conditionally based on an `isChapter: true` front matter flag. No `home.njk`, no `chapter.njk`. Fewer files, but the base layout carries conditional logic that the other approaches put in dedicated templates.

### Chapter defaults

**Claude** and **Codex** both use `chapters.11tydata.js` to set `tags`, `layout`, and `chapterNumber` via `eleventyComputed` for the whole directory — no per-file repetition.

**OpenCode** has no `chapters.11tydata.js`. Every chapter file manually declares `layout: base.njk` and `isChapter: true`. More front matter noise, more opportunity for inconsistency.

### Chapter collection tag

**Claude** tags chapters as `"chapters"` (plural) and queries `getFilteredByTag("chapters")`.

**Codex** tags chapters as `"chapter"` (singular) but queries `getFilteredByTag("chapter")` — consistent within itself, just a different convention.

**OpenCode** has no `chapters.11tydata.js` so the collection is built by filtering all markdown files in `content/chapters/*.md` directly in `eleventy.config.js`.

### Metadata shape

**Claude** adds a `typekit` object with separate `serif` and `sans` kit IDs, conditionally rendering two `<link>` tags:
```js
typekit: { serif: "", sans: "" }
```

**Codex** has no Typekit support at all — uses system serif fonts hardcoded in CSS.

**OpenCode** has a single `typekit` string (one kit ID), which only supports one kit. If you need separate serif and sans kits, you'd need to modify the template.

**Codex** also introduces a separate `_data/book.js` alongside `metadata.js`, separating site infrastructure metadata from book content metadata. Interesting pattern if you're hosting multiple works on one site, but adds indirection for the single-work case.

### Cleanup

**Claude** fully deleted all blog/feed/tag/post files and removed their deps from `package.json`.

**Codex** left the blog posts, `post.njk`, `postslist.njk`, RSS plugin, syntax highlighter, Luxon, Prism, and `@zachleat/heading-anchors` in `package.json` as dead weight. The CHRONICLE notes this was intentional ("for reference") but it means `npm install` pulls in ~4 extra packages for nothing.

**OpenCode** removed the blog content but kept the RSS plugin — and actually re-wired it to produce a chapter feed, which is a reasonable creative reuse.

---

## CSS

All three go for cream backgrounds and serif body text. The differences are in the details.

### Variables

**Claude** uses CSS custom properties throughout (`--color-bg`, `--font-serif`, `--measure`, etc.), making theming straightforward.

**Codex** also uses custom properties with a warmer, more developed palette: `--bg: #faf6ee`, `--paper: #fffdf8`, `--ink`, `--muted`, `--rule`, `--accent`. Two-tone background (body vs. main content area) creates a subtle paper effect.

**OpenCode** hardcodes most color values — no custom properties for colors. More brittle to retheme.

### Fluid type

**Claude**: `clamp(1rem, .8rem + 1vw, 1.25rem)` — modest range, 16–20px.

**OpenCode**: `clamp(5px, .8rem + 1vw, 92px)` — taken directly from the reference sites (twohorses.lol). The `5px` floor and `92px` ceiling are vestigial from a different context and make no sense here. In practice the `1vw` term keeps it sane at normal viewport widths, but this is copy-paste without understanding.

**Codex**: `clamp(16px, 0.95rem + 0.25vw, 20px)` — tightest range, most conservative.

### Drop cap

**Claude** and **OpenCode** both implement `.drop::first-letter` (large floated initial) and `.drop::first-line` (small-caps). OpenCode's version is closer to the reference sites — `400%` font size vs Claude's `3.5em`.

**Codex** has no drop cap implementation despite it being in the spec.

### Scene headings (h4)

**Claude** and **OpenCode** both implement the `h4::before`/`h4::after` em-dash decoration from the spec. Claude's is centered and italic; OpenCode's matches the reference sites more closely.

**Codex** does not implement this.

---

## Dev server

All three use `showAllHosts: true`. Ports were assigned externally: **8082** (claude), **8084** (codex), **8086** (opencode).

**Claude** and **OpenCode** use `eleventyConfig.setServerOptions()` (correct Eleventy v3 API). **Codex** also uses `setServerOptions` but only sets `showAllHosts` — it doesn't bind to `0.0.0.0`, so it may not be reachable on Tailscale/LAN depending on the OS default.

---

## Sample chapters

All three wrote original prose for the sample chapters rather than filler text.

**Claude**'s chapters are a short narrative about a woman and two horses at dawn — tightly focused, demonstrates all the CSS features (drop cap, h4 scene heading, h3 character heading, blockquote dialogue).

**Codex**'s chapters (`01-threshold.md`, `02-orchard.md`, `03-lantern-room.md`) are atmospheric literary vignettes — good prose, but don't demonstrate the CSS features because the drop cap and scene heading styles don't exist in that CSS.

**OpenCode**'s chapters are meta-instructional — they explain what the template does while being formatted as fiction. Chapter 3 ends with a small-font signature block dated 2026. Clever, but mixes documentation with sample content.

---

## What each got right that the others didn't

**Claude**: Most complete implementation of the spec. Typekit dual-kit support, full CSS feature set, correct API usage, clean dependency cleanup, rewritten README.

**Codex**: The `_data/book.js` separation is a genuinely good idea for multi-work sites. The two-tone color palette (`--bg` / `--paper`) is more developed than the others.

**OpenCode**: Re-wiring the RSS feed for chapters is smart. The single-layout approach with `isChapter` flag is simpler to reason about for small sites. CSS is closest to the reference sites in feel.

---

## Summary

Claude followed the spec most faithfully and produced the most complete implementation. Codex did the least cleanup and missed several CSS features but had the most interesting metadata architecture. OpenCode took the most opinionated deviations — collapsing layouts, skipping data cascade files, keeping RSS — some of which are defensible simplifications and some of which create maintenance friction.

None of them are wrong. They're three reasonable interpretations of the same brief.
