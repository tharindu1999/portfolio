// Copies the hashed Vite CSS bundle to a stable path for design-sync's cssEntry.
import { readdirSync, mkdirSync, copyFileSync } from "node:fs";

const dist = "dist/assets";
const css = readdirSync(dist).find((f) => f.endsWith(".css"));
if (!css) throw new Error("no CSS bundle in dist/assets — run `npm run build` first");
mkdirSync(".design-sync/.cache", { recursive: true });
copyFileSync(`${dist}/${css}`, ".design-sync/.cache/app.css");
console.log(`copied ${dist}/${css} -> .design-sync/.cache/app.css`);
