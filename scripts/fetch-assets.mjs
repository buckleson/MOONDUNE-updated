// One-time asset fetch: downloads Moondune site + product images into public/images.
import { mkdir, writeFile } from 'node:fs/promises'
import path from 'node:path'

const OUT = path.resolve('public/images')
const SITE = 'https://www.moondune.co/cdn/shop/files/'
const PAGES = 'https://moondune.b-cdn.net/pages/'

const site = [
  'logo-original-174px.png', 'favicon-48.png', 'bannerbg_final.png', 'moondune-hero-3.jpg',
  'Stripe-logo.webp', 'aramex-logo.png',
  'featured-beautymatter.png', 'featured-gulftimesnow.png', 'featured-beautyworld.jpg',
  'featured-falconsofmajlis.jpg', 'featured-reel-5.jpg',
  'date.jpg', 'coffee.jpg', 'hone.jpg', 'centell.jpg', 'bifid.jpg', 'multi-molecule.jpg',
]
const pages = [
  '1781708636000-k2gr27.png', '1781708721359-95pec.png', '1781708741193-fzca1s.png',
  '1781709929374-lks0ij.png', '1786482843926-04a8l9.png', '1786482939821-y1yk2g.png',
  '1786483010113-c1wi5.png',
]

async function get(url, dest) {
  const res = await fetch(url)
  if (!res.ok) throw new Error(`${res.status} ${url}`)
  await mkdir(path.dirname(dest), { recursive: true })
  await writeFile(dest, Buffer.from(await res.arrayBuffer()))
  console.log('ok', path.relative(OUT, dest))
}

const jobs = [
  ...site.map((f) => [`${SITE}${f}?width=1400`, path.join(OUT, 'site', f)]),
  ...pages.map((f) => [`${PAGES}${f}`, path.join(OUT, 'hero', f)]),
]

const { products } = await (await fetch('https://www.moondune.co/products.json')).json()
for (const p of products) {
  p.images.forEach((img, i) => {
    const ext = path.extname(new URL(img.src).pathname) || '.jpg'
    jobs.push([`${img.src.split('?')[0]}?width=1000`, path.join(OUT, 'products', p.handle, `${i + 1}${ext}`)])
  })
}

for (let i = 0; i < jobs.length; i += 6) {
  await Promise.all(jobs.slice(i, i + 6).map(([u, d]) => get(u, d).catch((e) => console.error('FAIL', e.message))))
}
