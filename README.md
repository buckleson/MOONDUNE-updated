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

## Conversion polish (Oct 2026)
- **Unified CTAs**: `Button` gained `gold` / `wine` variants and a `cta` size (48px, press state); hand-rolled buttons now use them.
- **Home**: hero secondary CTA goes to the routine finder ("Find my match"); the AM to PM Combo is a featured bento card; a new **proof bento** (`home/ProofBento.tsx`) replaces the moving lab-report marquee with tappable tiles and chips; a closing combo CTA; a mobile sticky add-to-cart once the hero scrolls away (WhatsApp steps above it).
- **Feedback**: "Added" state on add-to-cart buttons, cart-icon bump, routine match scrolls into view on phones.
- **Product page**: live "usually delivered by {date}" line (client-only, never in the prerendered HTML).
- **Cart**: "You save" line, payment/delivery reassurance under Checkout, tumbler cross-sell when the combo nudge doesn't apply.
- **Motion**: CSS-only scroll reveals (`components/Reveal.tsx`) that hide nothing until JS runs and respect reduced motion; shared `--ease-out` token.
- **Analytics hooks**: `lib/track.ts` pushes `add_to_cart`, `begin_checkout`, `routine_match`, `combo_upgrade`, `email_offer_submit`, `whatsapp_click` to `window.dataLayer` once a tag manager is added (no script shipped).

## Before launch
- Replace placeholder reviews in `src/data/reviews.ts` and set `REVIEWS_ARE_SAMPLES = false`; then add `aggregateRating` to `productSchema`.
- Wire `EmailOffer` / `NewsletterSignup` to the store's email platform; wire checkout to Shopify/Stripe.
- Add essence bottle sizes (ml) to `facts` in `src/data/products.ts`.
- Install GA4 / GTM to receive the `track()` events.
