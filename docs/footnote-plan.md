# Plan: Add Footnote Support to eleventy-chapbook, eleventy-folio, eleventy-pamphlet

## Context

The eleventy-prose-blog and eleventy-tech-blog templates have a full footnote system: `markdown-it-footnote` for parsing, a JSDOM-based `separateFootnotes` Eleventy filter that embeds footnote content as data attributes, a client-side JS class (`FootnoteInteractions`) that creates popovers, and CSS for styling. The literary templates (chapbook, folio, pamphlet) currently have no footnote support. The goal is to port the prose-blog footnote system to all three, adapted for the literary context.

## Key Differences to Account For

- **Folio**: No markdown-it at all — uses default Eleventy markdown. Needs `markdown-it` added as a dependency and configured in `eleventy.config.js`.
- **Chapbook & Pamphlet**: Both already have markdown-it installed and configured with `setLibrary`.
- **Layout structure**: The prose-blog applies `separateFootnotes` in `post.njk`. The literary templates render content in `chapter.njk` (for chapters) and `base.njk` (for other pages). The filter needs to go in `chapter.njk`, not `base.njk` — footnotes are a chapter-level concern.
- **CSS files**: chapbook and folio use `css/index.css`; pamphlet uses `css/style.css`.
- **JS passthrough**: All three already have `eleventyConfig.addPassthroughCopy("js")`.
- **`jsdom` dep**: Not currently in any of the three; needs adding.

## What to Copy Verbatim From prose-blog

- `js/footnote-interactions.js` — copy as-is to each repo's `js/` directory
- The `separateFootnotes` filter block from `eleventy.config.js` (lines 139–189) — identical in all three
- The footnote CSS block (lines 651–845 of prose-blog `css/index.css`) — copy to each repo's CSS file, adapted to use existing CSS vars (`--color-bg`, `--color-border`, `--color-text`, `--color-muted`, `--font-mono`)

## Per-Repo Changes

### All three repos

1. **`package.json`**: Add `markdown-it-footnote` and `jsdom` to dependencies
2. **`eleventy.config.js`**:
   - Add imports: `import markdownFootnote from "markdown-it-footnote"` and `import jsdom from "jsdom"` + `const { JSDOM } = jsdom`
   - Add `eleventyConfig.addFilter("separateFootnotes", ...)` (copy from prose-blog)
   - Wire `markdownFootnote` plugin into the markdown-it instance
3. **`_includes/layouts/chapter.njk`**: Replace `{{ content | safe }}` with the footnote-aware pattern (set footnoteData, render `footnoteData.content`, hidden fallback div, sr announcer div)
4. **CSS**: Append footnote + popover CSS block
5. **`_includes/layouts/base.njk`**: Add `<script type="module" src="/js/footnote-interactions.js"></script>` before closing `</body>`

### Folio-specific

- Add `import markdownIt from "markdown-it"` (folio has no markdown-it config at all)
- Add `npm install markdown-it` to folio's `package.json` (in addition to the two new deps above)
- Configure markdown-it instance matching chapbook's pattern: `markdownIt({ html: true, breaks: false, linkify: true, typographer: true }).disable("code")`
- Then `.use(markdownFootnote)` on the instance

### Chapbook-specific

- Already has `const md = markdownIt(...).disable("code")` then `eleventyConfig.setLibrary("md", md)`
- Change to: `const md = markdownIt(...).disable("code").use(markdownFootnote)`

### Pamphlet-specific

- Same pattern as chapbook for wiring the plugin

## Critical Files

| File | Chapbook | Folio | Pamphlet |
|------|----------|-------|---------|
| eleventy.config.js | `/Users/philip/projects/mimeo-sites/TEMPLATES/eleventy-chapbook/eleventy.config.js` | `/Users/philip/projects/mimeo-sites/TEMPLATES/eleventy-folio/eleventy.config.js` | `/Users/philip/projects/mimeo-sites/TEMPLATES/eleventy-pamphlet/eleventy.config.js` |
| chapter.njk | `/Users/philip/projects/mimeo-sites/TEMPLATES/eleventy-chapbook/_includes/layouts/chapter.njk` | `/Users/philip/projects/mimeo-sites/TEMPLATES/eleventy-folio/_includes/layouts/chapter.njk` | `/Users/philip/projects/mimeo-sites/TEMPLATES/eleventy-pamphlet/_includes/layouts/chapter.njk` |
| base.njk | `/Users/philip/projects/mimeo-sites/TEMPLATES/eleventy-chapbook/_includes/layouts/base.njk` | `/Users/philip/projects/mimeo-sites/TEMPLATES/eleventy-folio/_includes/layouts/base.njk` | `/Users/philip/projects/mimeo-sites/TEMPLATES/eleventy-pamphlet/_includes/layouts/base.njk` |
| CSS | `css/index.css` | `css/index.css` | `css/style.css` |
| package.json | each repo's root | | |
| JS (new) | `js/footnote-interactions.js` | | |

**Source files (read-only reference):**
- `eleventy-prose-blog/eleventy.config.js` lines 1–9 (imports), 139–198 (filter + md config)
- `eleventy-prose-blog/js/footnote-interactions.js` (copy verbatim)
- `eleventy-prose-blog/css/index.css` lines 651–845 (footnote CSS)
- `eleventy-prose-blog/_includes/layouts/post.njk` lines 22–35 (chapter.njk template pattern)

## chapter.njk Pattern (for all three)

Replace `{{ content | safe }}` with:

```njk
{%- set footnoteData = content | separateFootnotes -%}
{{ footnoteData.content | safe }}
{%- if footnoteData.footnotes -%}
<div id="footnotes-section" class="footnotes-fallback" style="display: none;">
  {{ footnoteData.footnotes | safe }}
</div>
<div class="sr-only" aria-live="polite" id="footnote-announcer"></div>
{%- endif -%}
```

## Execution Order

1. Copy `footnote-interactions.js` to all three `js/` directories
2. Update `package.json` in all three (add deps)
3. `npm install` in all three
4. Update `eleventy.config.js` in all three (imports + filter + md plugin)
5. Update `chapter.njk` in all three
6. Update `base.njk` in all three (add script tag)
7. Append CSS to each repo's CSS file

## Verification

- `npm start` in each repo — should build without errors
- Add a test footnote to a chapter file: `word[^1]` and `[^1]: footnote text`
- Verify: superscript appears inline, clicking it shows popover, fallback section exists (hidden), Escape closes
- Check dark mode styling
- Check mobile (resize to <640px) — popover should anchor to bottom
