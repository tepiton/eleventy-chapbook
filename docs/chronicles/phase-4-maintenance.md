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
