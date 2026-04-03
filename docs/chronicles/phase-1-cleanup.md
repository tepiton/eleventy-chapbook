# Phase 1: Cleanup & Portability

## Entry 1: README and docs (2026-02-25)

**What**: Rewrote README to correctly document the repo and added chronicle.

**Why**: Initial README had incorrect name and paths.

**How**:

- Corrected title to `eleventy-chapbook`
- Documented metadata schema and project structure

**Files**: `README.md`, `docs/CHRONICLE.md`

---

## Entry 2: Fonts and Typekit (2026-02-27)

**What**: Replaced conditional `metadata.typekit` with baked-in Typekit `<link>` tags. See DEC-007.

**Why**: Conditional Typekit loading required config to enable fonts. Baking them in makes fonts always available.

**How**:

- Replaced `{% if metadata.typekit %}` block with unconditional `<link>` tags for kits `ztn6rcs` and `pgn7ley`
- Removed `typekit` field from `metadata.js`
- Set `metadata.url` to `https://orobia.dev/`

**Decisions**: DEC-007

**Files**: `_includes/layouts/base.njk`, `content/_data/metadata.js`

---

## Entry 3: Content portability (2026-02-28)

**What**: Made `content/` portable across all three templates.

**Why**: Goal was to let users swap templates without touching content. See DEC-001.

**How**:

- Moved `_data/metadata.js` to `content/_data/metadata.js`
- Switched chapters collection from tag-based to glob-based — see DEC-002
- Moved port from `eleventy.config.js` to `package.json` start script — see DEC-004
- Simplified `chapters.11tydata.js` — removed `tags`

**Decisions**: DEC-001, DEC-002, DEC-003, DEC-004, DEC-005

**Files**: `content/_data/metadata.js`, `content/chapters/chapters.11tydata.js`, `eleventy.config.js`, `package.json`
