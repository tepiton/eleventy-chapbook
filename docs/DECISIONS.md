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

---

### DEC-009: Quiet installs — fund/audit silenced in committed .npmrc (2026-10-03)

**Status**: Active — revisit when eleventy 4 ships

**Context**: npm audit reports high-severity findings rooted in
braces→chokidar under eleventy/dev-server/nunjucks. No fixed release
exists (braces 3.0.3 is latest; npm's only suggested fix is downgrading
to eleventy 0.6.0). The chain runs only in the `--serve` file watcher —
it never loads during build or CI. Consumers cannot remediate it either.

**Decision**: Commit `.npmrc` with `fund=false` and `audit=false` so
install-time output is silent. `npm audit` still reports on demand.
Drop `audit=false` when eleventy 4 (chokidar 5) lands.

**Alternatives**: `npm audit fix --force` (eleventy 0.6.0 — absurd);
forcing chokidar 4/5 via overrides (breaks glob-based watching on
eleventy 3); leaving the report visible (alarms consumers who cannot
act on it).

---

### DEC-010: Image transform plugin removed (2026-10-04)

**Status**: Active

**Context**: The template shipped `eleventyImageTransformPlugin`, but
its demo content contains no images — the plugin processed nothing in
the shipped build while adding 18MB of prebuilt `@img/` binaries plus
sharp to every install.

**Decision**: Remove the import, the `addPlugin` call, and the
`@11ty/eleventy-img` devDependency. Images in `content/` still copy
through to `_site/` unchanged.

**Alternatives**: keep the plugin for users who add chapter art — every
install pays 19MB for a capability the demo never exercises. A site
that wants optimized images adds the transform back: an import and one
`addPlugin` call.

**Consequences**: Install drops 159 → 141 packages. Image optimization
remains in the fleet where it runs on real content (the blogs;
product/service generate icons with sharp in a script).

---

### DEC-011: engines.node stays >=22 after the img drop (2026-10-04)

**Status**: Active

**Context**: The >=22 floor was raised for eleventy-img@7 (commit
d133909). DEC-010 removed that dependency; chapbook's remaining tree
needs no more than eleventy's own >=18.

**Decision**: Keep `engines.node` >=22 (`.nvmrc` 24, CI 24) — one
floor across the six surviving templates instead of five-and-one.

**Alternatives**: return to >=18 — splits the fleet's floor for no
operational gain; CI still runs node 24.

**Consequences**: Users on node 18–21 must upgrade even though the
build itself would run. Settles OD 6 in mimeo's
TEMPLATE_CONSOLIDATION.md.

---

### DEC-012: Images ship with content, copied verbatim (2026-10-04)

**Status**: Active

**Context**: With DEC-010 the image transform plugin is gone, and
Eleventy 3 copies a file only when its extension appears in
`templateFormats` or an explicit passthrough covers it — chapbook had
neither for content images, so a chapter image silently never landed
in `_site/`.

**Decision**: `addPassthroughCopy("content/img")`, matching
pamphlet's convention: images ship inside `content/`, land in
`_site/img/` unchanged, and cost nothing (no plugin, no binaries).
Optimized output is opt-in: add the eleventy-img transform plugin (an
import and one `addPlugin` call).

**Alternatives**: re-add the transform plugin for everyone (19MB of
install for a demo with no images — the DEC-010 rationale); list
image extensions in `templateFormats` (copies images from anywhere
under `content/`, but leaves each template with its own convention
instead of one shared with pamphlet).

**Consequences**: One directory convention to document; users wanting
AVIF/WebP add the plugin themselves.
