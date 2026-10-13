// Responsive variants: 600px "-600.webp" thumbnails for every product image (used via
// srcset on cards, cart, search), and 828px-wide mobile hero slides.
// Usage: node scripts/make-thumbs.mjs   (re-runnable; skips files already generated)
import fs from "node:fs"
import path from "node:path"
import sharp from "sharp"

sharp.cache(false)

const pub = path.resolve(import.meta.dirname, "../public/images")

for (const dir of fs.readdirSync(path.join(pub, "products"))) {
  const d = path.join(pub, "products", dir)
  for (const f of fs.readdirSync(d)) {
    if (!f.endsWith(".webp") || f.endsWith("-600.webp")) continue
    const out = path.join(d, f.replace(/\.webp$/, "-600.webp"))
    if (!fs.existsSync(out)) await sharp(path.join(d, f)).resize({ width: 600, withoutEnlargement: true }).webp({ quality: 78 }).toFile(out)
  }
}

// Mobile hero art (portrait files referenced as `mobile` in src/data/content.ts).
const content = fs.readFileSync(path.resolve(import.meta.dirname, "../src/data/content.ts"), "utf8")
for (const [, rel] of content.matchAll(/mobile: asset\("\/images\/(hero\/[^"]+\.webp)"\)/g)) {
  const file = path.join(pub, rel)
  const meta = await sharp(file).metadata()
  if (meta.width <= 828) continue
  const buf = await sharp(file).resize({ width: 828 }).webp({ quality: 76 }).toBuffer()
  fs.writeFileSync(file, buf)
  console.log("mobile hero", rel, meta.width, "-> 828")
}
console.log("thumbnails ready")
