# Social card assets

Used by `src/lib/og/post-card.tsx` to draw the per-post Open Graph and Twitter cards at
build time. `blog-base.png` is rendered from `scripts/og/og-default.html?variant=blog`
by `node scripts/og/render.mjs`; regenerate it when the card's look changes.

Fonts are the Google Fonts builds, all under the SIL Open Font License 1.1:

- Syne ExtraBold and DM Mono Medium: the site's own faces (Latin).
- Inter ExtraBold and JetBrains Mono Medium: per-glyph fallbacks for Cyrillic titles.
