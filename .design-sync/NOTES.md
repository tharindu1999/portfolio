# design-sync notes — tharindu portfolio

- This repo is an app, not a component library. The DS components were extracted into `src/components/` (barrel `src/components/index.ts`) and are pinned via `componentSrcMap` — the converter needs `--entry ./src/components/index.ts` (there is no dist library entry).
- `cssEntry` points at `.design-sync/.cache/app.css`, a copy of the hashed Vite CSS bundle. Always run `npm run build && node .design-sync/copy-css.mjs` (= `buildCmd`) before the converter, or the CSS goes stale.
- The shipped CSS is a Tailwind v4 compiled subset: only classes actually used in `src/` exist. If a preview or component uses a new utility class, rebuild the app first or the class silently won't resolve.
- Previews MUST wrap stories in a dark frame (`background: #0a0502`) — the glass components are translucent white and render invisible on the card's white background.
- Playwright: local chromium cache is build 1208 → `playwright@1.58.0` + `playwright-core@1.58.0` installed in `.ds-sync/`. Newer playwright-core pins 1228 and fails to launch.
- `@types/react@19` / `@types/react-dom@19` were added as devDeps during the first sync (repo had none; JSX was untyped and typed components exposed `key` prop errors).
- Overrides: `GradientHeading` needs `cardMode: column` + `viewport: 1280x760` (text-9xl hero crops at default width); `SectionHeading` needs `cardMode: column`.

## Known render warns
- `[FONT_REMOTE] "Inter", "Playfair Display"` — expected every run; fonts load from Google Fonts via remote `@import` in the app CSS, nothing ships locally.

## Re-sync risks
- ExperienceCard/InfoCard preview content mirrors the owner's real CV data — refresh `.design-sync/previews/*.tsx` if the CV content changes materially.
- `.design-sync/.cache/app.css` is machine state: on a fresh clone it doesn't exist until `buildCmd` runs.
- App refactors that stop using a utility class (e.g. removing the last `text-white/50` usage) silently drop it from the compiled CSS and can unstyle previews/designs that relied on it — re-validate after big App.tsx changes.
- The site itself (App.tsx) consumes these components; renaming/changing component props is a breaking change for both the site and the synced DS.
