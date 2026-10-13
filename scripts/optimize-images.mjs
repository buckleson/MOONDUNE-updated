// One-off asset optimizer: converts PNG/JPG in public/images to WebP and the
// behind-the-scenes .mov clips to MP4. Originals move to assets-src/ (not deployed).
// Usage: node scripts/optimize-images.mjs
import { execFileSync } from "node:child_process"
import fs from "node:fs"
import path from "node:path"
import sharp from "sharp"

const root = path.resolve(import.meta.dirname, "..")
const pub = path.join(root, "public")
const archive = path.join(root, "assets-src")

const maxWidth = (rel) => (rel.includes("/hero/") ? 2000 : rel.includes("/products/") ? 1200 : 1600)

const walk = (dir) =>
  fs.readdirSync(dir, { withFileTypes: true }).flatMap((e) => {
    const p = path.join(dir, e.name)
    return e.isDirectory() ? walk(p) : [p]
  })

let before = 0
let after = 0
for (const file of walk(path.join(pub, "images"))) {
  if (!/\.(png|jpe?g)$/i.test(file)) continue
  const rel = "/" + path.relative(pub, file).replaceAll("\\", "/")
  const out = file.replace(/\.(png|jpe?g)$/i, ".webp")
  before += fs.statSync(file).size
  await sharp(file).resize({ width: maxWidth(rel), withoutEnlargement: true }).webp({ quality: 80 }).toFile(out)
  after += fs.statSync(out).size
  const dest = path.join(archive, path.relative(pub, file))
  fs.mkdirSync(path.dirname(dest), { recursive: true })
  fs.renameSync(file, dest)
}

for (const file of walk(path.join(pub, "videos"))) {
  if (!/\.mov$/i.test(file)) continue
  const out = file.replace(/\.mov$/i, ".mp4")
  before += fs.statSync(file).size
  execFileSync("ffmpeg", ["-y", "-loglevel", "error", "-i", file, "-c:v", "libx264", "-crf", "28", "-preset", "slow",
    "-vf", "scale='min(1080,iw)':-2", "-an", "-movflags", "+faststart", out])
  after += fs.statSync(out).size
  const dest = path.join(archive, path.relative(pub, file))
  fs.mkdirSync(path.dirname(dest), { recursive: true })
  fs.renameSync(file, dest)
}

const mb = (n) => (n / 1048576).toFixed(1) + " MB"
console.log(`assets: ${mb(before)} -> ${mb(after)}`)
