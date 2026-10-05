# Phase 4: Maintenance

## Entry 1: npm 12 install hygiene (2026-10-03)

**What**: Fresh `npm install` is silent — no warnings, no funding
notice, no audit block — and the tree carries no fixable advisories.

**Why**: npm v12 (2026-07) blocks dependency install scripts by default,
and node 24 (CI's runtime) bundles it. The install output had drifted
noisy and two dependencies carried high-severity advisories.

**How**:

- Added pinned `allowScripts` (`fsevents@2.3.3`); sharp 0.35.x needs no
  entry — it has no install script
- `@11ty/eleventy-img` ^6.0.4 → ^7.0.0: sharp resolves to 0.35.5
  (patched libvips/libheif), image-size drops out of the tree; the
  sharp allowScripts pin went with it
- `.npmrc`: `fund=false` + `audit=false` (see DEC-009)
- `engines.node` >=18 → >=22 (img@7's real floor); `.nvmrc` 20 → 24

**Decisions**: DEC-009.

**Files**: commits 47a1d4e, 310515d, d133909, 438f054, 0b6149a

## Entry 2: dek ported from folio; image transform dropped (2026-10-04)

**What**: Chapters support a `dek` front-matter subtitle — rendered
under the chapter heading and in the home TOC — and the eleventy-img
transform plugin is gone from the build.

**Why**: folio retires (its only feature chapbook lacked was `dek`;
chapbook inherits it). The transform processed nothing — the demo
content has no images — while adding 18MB of prebuilt `@img/` binaries
plus sharp to every install.

**How**:

- `chapter.njk` gains the conditional dek line under the `h1`;
  `home.njk`'s TOC stacks the dek under the title in a
  `.chapter-entry` column; `css/index.css` styles both
- `ch01-the-beginning.md` carries a demo dek; README documents the
  field
- `eleventy.config.js`: import and `addPlugin` block removed;
  `@11ty/eleventy-img` dropped from devDependencies — 141 packages
  (folio's tree measured 137); build output verified byte-identical
  before and after the drop

**Decisions**: DEC-010, DEC-011.

**Files**: commits 89c7ad4, dbfa114

## Entry 3: content/img passthrough (2026-10-04)

**What**: Images in `content/img/` copy to `_site/img/` unchanged.

**Why**: The content contract (tepiton/content-fixture) expects
literary templates to serve content-shipped images verbatim. DEC-010
era left chapbook with no image handling at all — Eleventy 3 copies a
file only when its extension is in `templateFormats` or an explicit
passthrough covers it, so a content image simply did not land.

**How**: `addPassthroughCopy("content/img")`, the same line pamphlet
carries; README documents the convention. Verified with the fixture
corpus: `content/img/fixture.png` lands verbatim, no plugin, no
weight.

**Decisions**: DEC-012.

**Files**: this commit.
