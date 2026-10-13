# Moondune — updated storefront

React 19 + TypeScript + Vite + shadcn/ui front-end for [moondune.co](https://www.moondune.co), rebuilt for conversion, SEO and GEO (generative-engine optimisation). Front-end only: cart, wishlist, accounts, orders and newsletter are simulated in `localStorage`.

## Scripts
| Command | What it does |
|---|---|
| `npm run dev` | Dev server |
| `npm run build` | Production build → type-check, Vite build, **prerender every route to static HTML**, write `sitemap.xml`, `robots.txt`, `llms.txt` (canonical origin `https://www.moondune.co`) |
| `npm run build:pages` | Same, for the GitHub Pages preview (`/MOONDUNE-updated/` base, preview URLs, every page `noindex`) |
| `npm run optimize:images` | One-off: PNG/JPG → WebP, `.mov` → `.mp4`; originals move to `assets-src/` |
| `node scripts/make-thumbs.mjs` | 600px product thumbnails + 828px mobile hero art |

Prerendering needs a local Chrome (auto-detected, or set `CHROME_PATH`).

## What changed vs. the first remake
**SEO / GEO**
- Every route is prerendered: crawlers and AI engines get full HTML instead of an empty `<div id="root">`.
- Per-route `<title>`, meta description, canonical, Open Graph/Twitter tags (`src/components/Seo.tsx`).
- JSON-LD (`src/lib/schema.ts`): Organization, WebSite + SearchAction, Product with AED offers & free-shipping details, BreadcrumbList, FAQPage.
- `robots.txt` welcoming Googlebot, Bingbot, GPTBot, OAI-SearchBot, ClaudeBot, PerplexityBot, Google-Extended; `sitemap.xml`; `llms.txt` fact sheet.
- Answer-first content: "Why does skin behave differently in the UAE?" explainer, per-product **Quick facts**, product Q&A.
- One `<h1>` per page; transactional pages are `noindex`.

**Conversion**
- Hero with a working "Add bestseller" button + price in the first viewport, and a proof bar (Beautyworld finalist, 7 lab tests, free 2-day delivery, COD).
- "As featured in" strip, skin-type **routine finder**, reviews section (placeholder content, clearly labelled).
- Product page: sticky add-to-cart bar, sticky gallery, payment/delivery reassurance under the CTA, combo upsell, lab-report chips.
- Cart: one-tap upgrade to the AM to PM Combo, tap-to-apply SAVE15.
- First-visit email offer (non-blocking slide-in, once per visitor) and a WhatsApp chat button.

**Speed**
- Assets 72.7 MB → ~6 MB (WebP, MP4, 600px thumbnails with `srcset`, lazy images & videos), route-level code splitting, non-blocking fonts. Lighthouse mobile: page weight 26 MB → 0.8 MB, LCP 58 s → ~5 s, SEO 92 → 100.

## Before launch
- Replace placeholder reviews in `src/data/reviews.ts` and set `REVIEWS_ARE_SAMPLES = false`; then add `aggregateRating` to `productSchema`.
- Wire `EmailOffer` / `NewsletterSignup` to the store's email platform; wire checkout to Shopify/Stripe.
- Add essence bottle sizes (ml) to `facts` in `src/data/products.ts`.
