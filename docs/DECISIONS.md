# Decisions — eleventy-chapbook

Architectural decisions for this project. Search with `grep -i "keyword" docs/DECISIONS.md`.

These decisions apply across the template family (folio, pamphlet, chapbook) unless noted.

---

## Active Decisions

### DEC-001: content/ as portable data unit (2026-02-28)

**Status**: Active

**Context**: Three templates (folio, pamphlet, chapbook) needed to share content without duplication or awkward syncing.

**Decision**: `content/` is a self-contained portable directory — copy it intact from one template to another to change the look without touching the content.

**Alternatives considered**:
- Git submodules: too much overhead for a simple starter template
- Shared npm package: overkill, adds release cycle
- Manual copy: chosen — simple, no tooling required

**Consequences**: All three templates must maintain identical `content/` structure. Template-specific files (CSS, layouts, JS) live outside `content/`.

---

### DEC-002: Glob-based chapters collection (2026-02-28)

**Status**: Active

**Context**: Base blog used tag-based collection (`getFilteredByTag("chapter")`). Tags require per-file frontmatter and create coupling between content and template.

**Decision**: Collect chapters via `getFilteredByGlob("content/chapters/*.md")` — no tags in frontmatter.

**Alternatives considered**:
- Tag-based: requires `tags: chapter` in every chapter file; breaks portability if tag names diverge
- Directory-based glob: chosen — implicit from file location, no frontmatter noise

**Consequences**: Chapter files need no `tags` frontmatter. Layout assigned via `chapters.11tydata.js`.

---

### DEC-003: Layout assignment via directory data files (2026-02-28)

**Status**: Active

**Context**: Chapters needed a dedicated layout without requiring `layout:` in every frontmatter.

**Decision**: Use `chapters/chapters.11tydata.js` to set `layout: "layouts/chapter.njk"` for all files in that directory. Use `content.11tydata.js` for the default layout.

**Alternatives considered**:
- Frontmatter in every file: repetitive, fragile if layout name changes
- Single base layout with `isChapter` flag: fewer files but conditional logic in base layout

**Consequences**: Adding a new chapter requires only `order` and `title` frontmatter. No layout boilerplate.

---

### DEC-004: Port in package.json, not eleventy.config.js (2026-02-28)

**Status**: Active

**Context**: Having multiple templates running simultaneously requires distinct ports. Port was originally in `eleventy.config.js` via `setServerOptions`.

**Decision**: Port defined in `package.json` start script: `npx @11ty/eleventy --serve --port=8082`.

**Ports**: chapbook=8082, pamphlet=8086, folio=8084

**Alternatives considered**:
- `eleventy.config.js` `setServerOptions`: works, but less visible and can't override from CLI
- `.env` file: adds tooling, unnecessary for a simple starter

**Consequences**: Port is visible in `package.json`. Override with `--port` on the CLI.

---

### DEC-005: Single metadata file at content/_data/metadata.js (2026-02-28)

**Status**: Active

**Context**: Base blog had `_data/metadata.js` at root. An earlier approach added a separate `_data/book.js` for book-specific fields. Having two files split what should be one concern.

**Decision**: Single `content/_data/metadata.js` with all site metadata including book-specific fields (title, author, description, subtitle, image, url).

**Alternatives considered**:
- Separate `book.js`: cleaner separation for multi-work sites, but adds indirection for single-work starters
- Root-level `_data/`: requires path adjustment when input dir is `content/`

**Consequences**: One file to edit when setting up a new site. Schema must be maintained identically across all three templates.

---

### DEC-006: Chapter order via frontmatter order field, fallback 999 (2026-03-03)

**Status**: Active

**Context**: Chapters needed a stable, predictable sort order. Using filename alone is fragile; using a sequential integer allows reordering without renaming files.

**Decision**: Sort by `order` frontmatter (ascending), fallback 999 for chapters without order, secondary sort by filename for deterministic tie-breaking.

**Alternatives considered**:
- Filename-only sort: simple but requires rename to reorder
- Date-based sort: irrelevant for literary works

**Consequences**: Chapters without `order` sort to end. Filename provides stable tiebreak when orders collide.

---

### DEC-007: Typekit kits baked into base.njk (2026-02-27)

**Status**: Active

**Context**: Earlier versions used a `metadata.typekit` field to conditionally load Typekit. This required config to enable fonts and was easy to accidentally omit.

**Decision**: Typekit kit IDs (`ztn6rcs` and `pgn7ley`) baked directly into `base.njk` as unconditional `<link>` tags. Removed `typekit` from `metadata.js`.

**Alternatives considered**:
- Conditional via metadata: opt-in, but adds friction for the common case
- CSS `@import`: works but slower than `<link rel="preconnect">`

**Consequences**: Fonts load on every page. To change fonts, edit `base.njk` directly.

---

### DEC-008: og:image conditional on metadata.image (2026-03-30)

**Status**: Active

**Context**: OG image meta tag with an empty `src=""` is worse than no tag. Templates ship with `image: ""` in metadata to avoid requiring immediate customization.

**Decision**: `og:image` tag only rendered when `metadata.image` is set (non-empty).

**Alternatives considered**:
- Always render: pollutes OG previews with empty or broken image
- Require image: raises barrier to initial setup

**Consequences**: New sites work correctly out of the box with no OG image. Set `metadata.image` to enable.
