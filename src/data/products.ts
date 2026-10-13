import { asset } from "@/lib/asset"
import productImages from "./productImages.json"

export type Category = "essence" | "combo" | "accessory"

export interface Variant {
  id: string
  title: string
  price: number
  compareAt: number | null
}

export interface Product {
  handle: string
  title: string
  shortTitle: string
  tagline: string
  category: Category
  tags: string[]
  bestseller?: boolean
  badges: string[]
  images: string[]
  variants: Variant[]
  description: string[]
  features: string[]
  careGuide: string[]
  highlights?: { title: string; text: string }[]
  /** Answer-first fact sheet (rendered on the product page, llms.txt and JSON-LD). Only verified copy. */
  facts?: { keyActives?: string[]; rows: { label: string; value: string }[] }
  seo: { title: string; description: string }
}

const labTested = "Independent lab in South Korea — incl. high-heat stability, skin irritation & microbiology"

const images = Object.fromEntries(
  Object.entries(productImages as Record<string, string[]>).map(([k, list]) => [k, list.map(asset)]),
)

const essenceCare = [
  "For external use only.",
  "Patch test recommended before use.",
  "Store in a cool, dry place.",
  "Avoid application on the lips and around eyes.",
]

export const products: Product[] = [
  {
    handle: "am-to-pm-combo",
    title: "AM to PM Combo - All skincare in 2 bottles",
    shortTitle: "AM to PM Combo",
    tagline:
      "Your complete day-to-night ritual in one set. Pair the lightweight, brightening Sunrise (AM) Essence with the comforting, barrier-restoring Sunset (PM) Essence for round-the-clock hydration, protection and repair!",
    category: "combo",
    tags: ["Combo", "Essence"],
    badges: ["All Types of Skin", "Restoring", "Hydrating"],
    images: images["am-to-pm-combo"],
    variants: [{ id: "am-to-pm-combo-default", title: "Default", price: 380, compareAt: 440 }],
    description: [
      "Includes both Sunrise (AM) and Sunset (PM) Essences for a complete routine.",
      "Sunrise Essence delivers lightweight, breathable hydration and antioxidant support for daytime wear.",
      "Sunset Essence repairs and strengthens the skin barrier overnight.",
      "Designed to work together for round-the-clock barrier care and hydration.",
      "Buy combo for a discounted price.",
    ],
    features: [
      "Complete AM + PM ritual in a single set",
      "Day and night formulas that complement each other",
      "Continuous barrier support and hydration around the clock",
      "Better value than purchasing essences individually",
      "Includes a free gift worth 50 AED",
    ],
    facts: {
      keyActives: ["Dates", "Coffee", "Honey", "Multi-ceramides", "Beta-glucan", "Fermented extracts"],
      rows: [
        { label: "What's inside", value: "Sunrise (AM) Essence + Sunset (PM) Essence, plus a free gift worth 50 AED" },
        { label: "Best for", value: "All skin types wanting one complete day-to-night routine" },
        { label: "When to use", value: "Sunrise every morning, Sunset every night" },
        { label: "Replaces", value: "A multi-step AM and PM routine" },
        { label: "Tested", value: labTested },
      ],
    },
    seo: {
      title: "AM to PM Combo — Day & Night Skincare for UAE Skin",
      description:
        "Dates & Coffee AM Essence + Dates & Honey PM Essence: round-the-clock hydration and barrier repair built for UAE heat and AC. Save Dhs. 60, free gift, free 2-day UAE delivery.",
    },
    careGuide: essenceCare,
  },
  {
    handle: "dates-coffee-am-essence",
    title: "Dates & Coffee - All in one AM essence",
    shortTitle: "Dates & Coffee AM Essence",
    tagline:
      "A lightweight essence for brightening and hydration. Skip your multi-step AM routine for one product that takes care of your skin throughout the day!",
    category: "essence",
    tags: ["AM", "Essence"],
    badges: ["All Types of Skin", "Restoring", "Hydrating"],
    images: images["dates-coffee-am-essence"],
    variants: [
      { id: "dates-coffee-am-essence-regular", title: "Regular", price: 200, compareAt: 220 },
      { id: "dates-coffee-am-essence-refill", title: "Refill", price: 120, compareAt: 150 },
    ],
    description: [
      "Combines antioxidant-rich dates and coffee with Korean bio-science inclusions like fermented extracts, plant derived exosomes and multi-molecular actives.",
      "Supports microbiome balance while improving overall skin clarity and smoothness.",
      "Provides breathable hydration suited for daytime wear.",
      "Helps reinforce the skin barrier against everyday environmental stress.",
      "Leaves skin feeling awake, soft and naturally radiant.",
    ],
    features: [
      "Lightweight daily hydration replacing multiple AM steps into one",
      "Antioxidant support to help defend against environmental stress",
      "Helps maintain microbiome balance for smoother, healthier skin",
      "Fast-absorbing texture ideal for layering under sunscreen or makeup",
      "Supports barrier function while keeping skin balanced and energised",
    ],
    facts: {
      keyActives: ["Dates", "Coffee", "Fermented extracts", "Plant-derived exosomes", "Multi-molecular actives"],
      rows: [
        { label: "Best for", value: "All skin types; dehydrated skin, or skin that struggles under sunscreen and makeup" },
        { label: "When to use", value: "Morning (AM), before sunscreen and makeup" },
        { label: "Texture", value: "Lightweight, breathable, fast-absorbing — made for heat and humidity" },
        { label: "Replaces", value: "Multiple AM steps in one essence" },
        { label: "Tested", value: labTested },
      ],
    },
    seo: {
      title: "Dates & Coffee AM Essence — Lightweight Day Hydration",
      description:
        "An all-in-one morning essence with dates, coffee and Korean bio-science. Breathable hydration that sits well under sunscreen in UAE heat. Lab-tested in Korea. Free 2-day UAE delivery.",
    },
    careGuide: essenceCare,
    highlights: [
      {
        title: "All AM skincare in 1 formula",
        text: "Replaces multiple steps in the AM — does the job in one formula, with the actives needed in the right quantities.",
      },
      {
        title: "Lightweight Hydration",
        text: "Provides long-lasting hydration with a lightweight feel that absorbs easily and sits well under makeup or sunscreen.",
      },
      {
        title: "Barrier Support",
        text: "Supports the skin barrier, helping reduce moisture loss and keeping skin supple through the day.",
      },
    ],
  },
  {
    handle: "dates-honey-pm-essence",
    title: "Dates & Honey - All in one PM Essence",
    shortTitle: "Dates & Honey PM Essence",
    tagline:
      "All PM skincare in 1 essence for deep hydration. Skip multiple steps for one product that works on your skin while you sleep!",
    category: "essence",
    tags: ["Bestseller", "Essence", "PM"],
    bestseller: true,
    badges: ["All Types of Skin", "Restoring", "Hydrating"],
    images: images["dates-honey-pm-essence"],
    variants: [
      { id: "dates-honey-pm-essence-regular", title: "Regular", price: 200, compareAt: 220 },
      { id: "dates-honey-pm-essence-refill", title: "Refill", price: 120, compareAt: 150 },
    ],
    description: [
      "Blends nutrient-rich dates and honey with Korean bio-science inclusions like fermented extracts, multi-Ceramides, and beta-glucan.",
      "Essence replacing your entire PM layering to repair the skin barrier.",
      "Improves moisture retention over time.",
      "Calms dryness and strengthens skin against daily environmental stress.",
      "Skin feels softer, resilient, and comfortably replenished.",
    ],
    features: [
      "Barrier-strengthening hydration powered by ceramides and nourishing actives",
      "Helps restore moisture balance and reinforce the skin's protective layer",
      "Deep nourishment with a lightweight, comfortable texture",
      "Calms dryness and supports long-lasting skin softness",
      "Designed to leave skin stronger, smoother, and well-protected",
    ],
    facts: {
      keyActives: ["Dates", "Honey", "Multi-ceramides", "Beta-glucan", "Fermented extracts"],
      rows: [
        { label: "Best for", value: "All skin types; sensitive, tired or easily irritated skin" },
        { label: "When to use", value: "Night (PM), as your overnight barrier step" },
        { label: "Texture", value: "Lightweight and comfortable, deeply nourishing" },
        { label: "Replaces", value: "Your entire PM layering routine" },
        { label: "Tested", value: labTested },
      ],
    },
    seo: {
      title: "Dates & Honey PM Essence — Overnight Barrier Repair",
      description:
        "Our bestselling night essence: dates, honey, ceramides and beta-glucan repair a skin barrier stressed by UAE heat and air-conditioning. Lab-tested in Korea. Free 2-day UAE delivery.",
    },
    careGuide: essenceCare,
    highlights: [
      {
        title: "Multi-performing formula",
        text: "Replaces multiple PM routine steps in one overnight formula that restores your skin as you sleep.",
      },
      {
        title: "Lightweight Hydration",
        text: "Provides long-lasting hydration with a lightweight feel that absorbs easily and instantly hydrates your skin.",
      },
      {
        title: "Barrier Support",
        text: "Supports the skin barrier, helping reduce moisture loss and keeping the skin supple throughout the night.",
      },
    ],
  },
  {
    handle: "sip-and-glow-combo",
    title: "Sip and Glow combo",
    shortTitle: "Sip and Glow Combo",
    tagline:
      "Pair the Dates & Coffee AM Essence — lightweight, brightening, barrier-supporting from the outside — with the SkinSip Quencher, a 1200ml insulated tumbler that keeps water cold through UAE's heat and AC swings, to ensure hydration from the inside.",
    category: "combo",
    tags: ["Combo"],
    badges: ["Hydration Inside", "Hydration Outside"],
    images: images["sip-and-glow-combo"],
    variants: [{ id: "sip-and-glow-combo-default", title: "Default", price: 279, compareAt: 310 }],
    description: [
      "The Dates & Coffee All-in-one AM Essence plus the SkinSip Quencher 1200ml tumbler.",
      "Hydration from the outside and the inside — built for the UAE climate.",
    ],
    features: [
      "Hydration, Topically — All-in-one AM essence replaces your multi-step routine with barrier-supporting, breathable hydration.",
      "Hydration, Internally — 1200ml insulated tumbler makes drinking water through the day easier: hot outside, cold inside.",
      "Built for the Climate, Not just one Season — UAE's heat-outside, AC-inside cycle needs hydration year-round. This combo doesn't clock out in winter.",
    ],
    facts: {
      keyActives: ["Dates", "Coffee", "Fermented extracts"],
      rows: [
        { label: "What's inside", value: "Dates & Coffee AM Essence + SkinSip Quencher 1200ml tumbler" },
        { label: "Best for", value: "Hydration from the outside and the inside, all year round" },
        { label: "When to use", value: "Essence every morning; tumbler all day" },
        { label: "Tested", value: labTested },
      ],
    },
    seo: {
      title: "Sip and Glow Combo — AM Essence + 1200ml Tumbler",
      description:
        "Hydration inside and out for UAE weather: the Dates & Coffee AM Essence plus the SkinSip Quencher, cold for 24 hours. Save 10%. Free 2-day UAE delivery.",
    },
    careGuide: [
      ...essenceCare,
      "Handwash the tumbler body; straw and lid are top-rack dishwasher-safe.",
    ],
  },
  {
    handle: "skinsip-quencher",
    title: "SkinSip Quencher",
    shortTitle: "SkinSip Quencher",
    tagline:
      "Skincare hydrates the outside. Water hydrates the inside. In UAE weather, your skin needs both, every day of the year. 1200ml. Ice-cold for 24 hours. Ergonomic on-the-go carrying. Leakproof.",
    category: "accessory",
    tags: ["Accessory", "Hydration"],
    badges: ["Hydration inside", "1200 ML", "24-hour cold"],
    images: images["skinsip-quencher"],
    variants: [{ id: "skinsip-quencher-default", title: "Default", price: 90, compareAt: null }],
    description: [
      "1200 ML — one bottle, most of a day's hydration ensured.",
      "24-hour cold, 12-hour hot — ice at 8am is ice at 8pm.",
      "Sweat-free exterior — condensation-free even in 45°C.",
      "Non-slip base — stays put everywhere, all surface compatibility.",
      "Snugly fits in all car cup holders — designed for on-the-go comfort.",
    ],
    features: [
      "Double-walled vacuum insulation — the gold standard for temperature hold",
      "Food-grade 304 stainless steel: no rust, no leach, no odour retention",
      "BPA-free and phthalate-free — the barrier philosophy, applied to what touches your water",
      "Insulated straw and screw lid — spill-resistant for the car, gym, school run",
    ],
    facts: {
      rows: [
        { label: "Capacity", value: "1200 ml" },
        { label: "Temperature hold", value: "24 hours cold, 12 hours hot" },
        { label: "Material", value: "Food-grade 304 stainless steel, BPA- and phthalate-free" },
        { label: "Good to know", value: "Sweat-free in 45°C, leakproof, fits car cup holders" },
      ],
    },
    seo: {
      title: "SkinSip Quencher — 1200ml Tumbler, Cold for 24h",
      description:
        "A 1200ml double-walled stainless steel tumbler that keeps water ice-cold for 24 hours through UAE heat. Leakproof, BPA-free, fits car cup holders. Free UAE delivery.",
    },
    careGuide: [
      "Handwash the body to preserve the vacuum seal and the moondune wordmark.",
      "The straw and lid are dishwasher-safe on the top rack.",
      "Use the included straw brush for weekly deep cleaning.",
      "Avoid the freezer — the vacuum insulation isn't designed for extreme cold storage.",
      "Remove the straw for hot drinks above 60°C.",
    ],
  },
]

export const getProduct = (handle: string) => products.find((p) => p.handle === handle)

export const discountPercent = (v: Variant) =>
  v.compareAt && v.compareAt > v.price ? Math.round(((v.compareAt - v.price) / v.compareAt) * 100) : 0

export const formatAED = (n: number) =>
  `Dhs. ${n.toLocaleString("en-AE", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
