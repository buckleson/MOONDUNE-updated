// Post-build: render every route in headless Chrome and save static HTML so search
// engines and AI crawlers get real content, then emit sitemap.xml, robots.txt and llms.txt.
// Usage: node scripts/prerender.mjs [--mode pages]
import fs from "node:fs"
import path from "node:path"
import puppeteer from "puppeteer-core"
import { loadEnv, preview } from "vite"

const mode = process.argv.includes("--mode") ? process.argv[process.argv.indexOf("--mode") + 1] : "production"
const root = path.resolve(import.meta.dirname, "..")
const dist = path.join(root, "dist")
const env = loadEnv(mode, root, "VITE_")
const SITE = (env.VITE_SITE_URL || "https://www.moondune.co").replace(/\/$/, "")
const NOINDEX = env.VITE_NOINDEX === "true"

const products = [...fs.readFileSync(path.join(root, "src/data/products.ts"), "utf8").matchAll(/handle: "([^"]+)"/g)].map((m) => m[1])
const policies = ["shipping-and-returns", "terms-and-conditions", "privacy-policy"]
const indexable = ["/", "/shop", ...products.map((h) => `/products/${h}`), "/about", "/ingredients", "/faqs", "/contact", ...policies.map((s) => `/policies/${s}`)]
const routes = [...indexable, "/account", "/checkout"]

const chromePath =
  process.env.CHROME_PATH ||
  [
    "C:/Program Files/Google/Chrome/Application/chrome.exe",
    "/usr/bin/google-chrome",
    "/usr/bin/google-chrome-stable",
    "/usr/bin/chromium-browser",
    "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
  ].find((p) => fs.existsSync(p))
if (!chromePath) throw new Error("Chrome not found; set CHROME_PATH")

// The un-rendered shell doubles as the SPA fallback for routes we don't prerender (e.g. /order/:id).
fs.copyFileSync(path.join(dist, "index.html"), path.join(dist, "404.html"))

const server = await preview({ mode, preview: { port: 4179, strictPort: true }, logLevel: "warn" })
const base = server.config.base.replace(/\/$/, "")
const origin = `http://localhost:4179${base}`
const browser = await puppeteer.launch({ executablePath: chromePath, headless: true, args: ["--no-sandbox"] })
const jsonLd = {}

try {
  for (const route of routes) {
    const page = await browser.newPage()
    await page.setViewport({ width: 1280, height: 900 })
    // Keep first-visit UI (email offer) out of the snapshot.
    await page.evaluateOnNewDocument(() => localStorage.setItem("moondune.offerSeen", "true"))
    const errors = []
    page.on("pageerror", (e) => errors.push(e.message))
    await page.goto(origin + route, { waitUntil: "networkidle0", timeout: 60000 })
    await page.waitForSelector("main h1", { timeout: 15000 })
    if (errors.length) throw new Error(`${route}: ${errors.join("; ")}`)
    jsonLd[route] = await page.$$eval('script[type="application/ld+json"]', (els) => els.map((e) => JSON.parse(e.textContent)))
    const html = "<!doctype html>\n" + (await page.evaluate(() => {
      localStorage.removeItem("moondune.offerSeen")
      return document.documentElement.outerHTML
    }))
    const out = route === "/" ? path.join(dist, "index.html") : path.join(dist, route, "index.html")
    fs.mkdirSync(path.dirname(out), { recursive: true })
    fs.writeFileSync(out, html)
    await page.close()
    console.log("prerendered", route)
  }
} finally {
  await browser.close()
  await new Promise((r) => server.httpServer.close(r))
}

// sitemap.xml
const today = new Date().toISOString().slice(0, 10)
const priority = (r) => (r === "/" ? "1.0" : r.startsWith("/products/") ? "0.9" : r === "/shop" ? "0.8" : "0.5")
fs.writeFileSync(
  path.join(dist, "sitemap.xml"),
  `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${indexable.map((r) => `  <url><loc>${SITE}${r === "/" ? "/" : r}</loc><lastmod>${today}</lastmod><priority>${priority(r)}</priority></url>`).join("\n")}
</urlset>
`,
)

// robots.txt — explicitly welcome search and AI answer engines.
const bots = ["Googlebot", "Bingbot", "GPTBot", "OAI-SearchBot", "ChatGPT-User", "ClaudeBot", "Claude-SearchBot", "PerplexityBot", "Google-Extended", "Applebot-Extended"]
fs.writeFileSync(
  path.join(dist, "robots.txt"),
  `${NOINDEX ? "# Preview build: pages carry noindex; production is https://www.moondune.co\n" : ""}${bots.map((b) => `User-agent: ${b}`).join("\n")}
Allow: /

User-agent: *
Allow: /
Disallow: /checkout
Disallow: /account
Disallow: /order/

Sitemap: ${SITE}/sitemap.xml
`,
)

// llms.txt — a plain-language fact sheet for AI engines, assembled from the pages' JSON-LD.
const org = jsonLd["/"].find((d) => d["@type"] === "Organization")
const faq = jsonLd["/faqs"].find((d) => d["@type"] === "FAQPage")
const productLines = products.map((h) => {
  const p = jsonLd[`/products/${h}`].find((d) => d["@type"] === "Product")
  const prices = p.offers.map((o) => `${o.name}: AED ${o.price}`).join("; ")
  const actives = p.additionalProperty?.[0]?.value
  return `- [${p.name}](${SITE}/products/${h}): ${p.description}${actives ? ` Key actives: ${actives}.` : ""} Price: ${prices}. Free 2-day UAE delivery.`
})
fs.writeFileSync(
  path.join(dist, "llms.txt"),
  `# Moondune

> ${org.description}

Moondune (legal entity: ${org.legalName}) is a UAE skincare brand founded by ${org.founder.name}, based in Masdar City, Abu Dhabi. It makes all-in-one AM and PM essences that pair Arabic botanicals (dates, coffee, honey) with Korean bio-science (fermented extracts, ceramides, beta-glucan, multi-molecular hyaluronic acid), formulated for skin dealing with UAE heat, humidity and air-conditioning.

## Key facts
- Recognition: ${org.award}. Featured in BeautyMatter (https://beautymatter.com/articles/the-end-of-one-size-fits-all-beauty-in-the-middle-east) and Gulf Times Now.
- Testing: independently lab-tested in South Korea — stability (including high-heat conditions similar to the Middle East), primary skin irritation, challenge (preservative efficacy), compatibility, microbiology, non-nano statement, no animal testing.
- Delivery: free tracked delivery across the UAE via Aramex, usually within 2 days. VAT and duties included. Cash on delivery available.
- Contact: ${org.email}, ${org.telephone} (WhatsApp), Instagram @moondune.ae.

## Products
${productLines.join("\n")}

## Frequently asked questions
${faq.mainEntity.map((q) => `- **${q.name}** ${q.acceptedAnswer.text}`).join("\n")}

## Pages
- [Shop](${SITE}/shop)
- [Ingredients](${SITE}/ingredients)
- [About](${SITE}/about)
- [FAQs](${SITE}/faqs)
- [Shipping & returns](${SITE}/policies/shipping-and-returns)
`,
)
console.log(`sitemap.xml, robots.txt, llms.txt written for ${SITE}${NOINDEX ? " (noindex preview)" : ""}`)
