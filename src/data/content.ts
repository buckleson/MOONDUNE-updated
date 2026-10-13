import { asset } from "@/lib/asset"
export const announcements = [
  "Free UAE delivery on every order",
  "Tracked 2-day shipping with Aramex",
  "Use code SAVE15 for 15% off your order",
  "VAT & duties included — no surprises at the door",
]

export const heroSlides = [
  {
    title: "Korean skincare, made for the UAE!",
    subtitle: "Climate intelligent  |  Arabic botanicals  |  Korean bio-science",
    desktop: asset("/images/hero/1786482843926-04a8l9.webp"),
    mobile: asset("/images/hero/1781708721359-95pec.webp"),
  },
  {
    title: "Dates in your skincare!",
    subtitle: "No really — the most resilient fruit of the desert, now for your skin",
    desktop: asset("/images/hero/1781708636000-k2gr27.webp"),
    mobile: asset("/images/hero/1781708741193-fzca1s.webp"),
  },
  {
    title: "Hydration? Check! Inside and Outside",
    subtitle: "Barrier loving formula with hydration at its core",
    desktop: asset("/images/hero/1786482939821-y1yk2g.webp"),
    mobile: asset("/images/hero/1786483010113-c1wi5.webp"),
  },
]

export const intro = [
  "Rooted in Arabic ingredients and redefined through Korean bioscience, Moondune focuses on barrier health and hydration — for skin living in the Middle East.",
  "Our lightweight formulas are designed to support skin adapting to life in this unique climate.",
  "Intentional, climate intelligent skincare. Custom made for you.",
]

export interface PressItem {
  outlet: string
  headline: string
  text: string
  image: string
  vertical?: boolean
  body: string
  url?: string
}

export const press: PressItem[] = [
  {
    outlet: "BeautyMatter",
    headline: "New York based global magazine!",
    text: "Featured as one of the brands shaping beauty in the Middle East.",
    image: asset("/images/site/featured-beautymatter.webp"),
    body: "BeautyMatter, the New York based global beauty business publication, featured moondune among the brands shaping the future of beauty in the Middle East — highlighting our climate-intelligent approach that pairs Arabic botanicals with Korean bio-science.",
    url: "https://beautymatter.com/articles/the-end-of-one-size-fits-all-beauty-in-the-middle-east",
  },
  {
    outlet: "Gulf Times Now",
    headline: "Named among the women shaping Abu Dhabi",
    text: "Gulf Times Now spotlighted moondune’s founder in its story on the women building the city’s future.",
    image: asset("/images/site/featured-gulftimesnow.webp"),
    body: "In its feature on the women building Abu Dhabi’s future, Gulf Times Now spotlighted moondune’s founder and the journey from a simple question — why does skin behave differently in the UAE? — to a barrier-first skincare brand made for the region.",
  },
  {
    outlet: "Beautyworld Middle East",
    headline: "Finalist at the region’s biggest beauty awards",
    text: "Within 4 months of launch, we are a finalist for innovative packaging at Beautyworld Awards 2026.",
    image: asset("/images/site/featured-beautyworld.webp"),
    body: "Just four months after launch, moondune was named a finalist in the Innovative Packaging category at the Beautyworld Middle East Awards 2026 — the region’s biggest beauty industry awards.",
  },
  {
    outlet: "Falcons of Majlis",
    headline: "See us on the UAE’s biggest startup show",
    text: "moondune is going on Falcons of Majlis — see us on the show soon!",
    image: asset("/images/site/featured-falconsofmajlis.webp"),
    body: "moondune will be appearing on Falcons of Majlis, the UAE’s biggest startup show. Stay tuned on our Instagram @moondune.ae for the air date!",
  },
  {
    outlet: "Reel",
    headline: "Spotted by one of beauty’s sharpest eyes",
    text: "Ahaana Khosla put moondune on her list of the Arab beauty brands worth watching.",
    image: asset("/images/site/featured-reel-5.webp"),
    vertical: true,
    body: "Beauty creator Ahaana Khosla included moondune in her list of Arab beauty brands worth watching.",
  },
]

export interface Ingredient {
  id: string
  name: string
  origin: "Arabic botanical" | "Korean bio-science"
  description: string
  benefits: string[]
  image: string
}

export const ingredients: Ingredient[] = [
  {
    id: "dates",
    name: "Dates",
    origin: "Arabic botanical",
    description:
      "A symbol of nourishment across the Arabian region, dates are rich in sugars, minerals, and antioxidants that help skin thrive in dry climates. The date seed is one of the most resilient seeds known to us.",
    benefits: ["Nourishes and softens", "Supports glow and vitality", "Protects from environmental stress"],
    image: asset("/images/site/date.webp"),
  },
  {
    id: "coffee",
    name: "Coffee",
    origin: "Arabic botanical",
    description:
      "Coffee is valued not only for energy but for its antioxidant richness, helping skin appear revived and refreshed.",
    benefits: ["Brightens tired skin", "Helps reduce dullness", "Supports circulation appearance"],
    image: asset("/images/site/coffee.webp"),
  },
  {
    id: "honey",
    name: "Honey",
    origin: "Arabic botanical",
    description:
      "Used for centuries across desert and Middle Eastern traditions, honey naturally preserves moisture while protecting against environmental stress.",
    benefits: ["Deep hydration", "Soothes irritation", "Supports skin repair"],
    image: asset("/images/site/hone.webp"),
  },
  {
    id: "centella",
    name: "Centella Asiatica culture",
    origin: "Korean bio-science",
    description:
      "A fermented form of the renowned calming herb, enhancing its bioavailability and skin-repair benefits.",
    benefits: ["Calms sensitivity", "Supports barrier recovery", "Improves resilience"],
    image: asset("/images/site/centell.webp"),
  },
  {
    id: "bifida",
    name: "Bifida ferment lysate",
    origin: "Korean bio-science",
    description:
      "A probiotic-derived ingredient found in rare luxury skincare formulations, known for strengthening stressed skin.",
    benefits: ["Improves resilience", "Reduces sensitivity signs", "Supports recovery"],
    image: asset("/images/site/bifid.webp"),
  },
  {
    id: "hyaluronic",
    name: "Multi molecular hyaluronic acid",
    origin: "Korean bio-science",
    description:
      "Multi molecular HA sizes settle on different layers of the skin, hydrating each one. Smaller molecules go deeper; larger ones cover the surface.",
    benefits: ["Deep, layered hydration", "Plumper-looking skin", "Smooth texture"],
    image: asset("/images/site/multi-molecule.webp"),
  },
]

export const activeGroups = [
  { group: "Soothing & repair", items: ["Mugwort exosomes", "Centella asiatica culture", "Panthenol", "Roman chamomile"] },
  {
    group: "Protection & strengthening",
    items: ["Edelweiss stem cells", "Bifida ferment lysate", "Yeast beta glucan", "Ivy leaf extract", "Phytosphingosine", "Three ceramides"],
  },
  { group: "Brightening & tone", items: ["Vitamin C", "Niacinamide", "Tranexamic acid", "Azelaic acid"] },
  { group: "Hydration & renewal", items: ["Multi-molecular hyaluronic acid", "Copper tripeptide-1", "Multi peptides"] },
  { group: "Purifying botanicals", items: ["Rosemary extract", "Tea tree extract", "Propolis"] },
]

export interface LabReport {
  id: string
  title: string
  summary: string
}

export const labReports: LabReport[] = [
  {
    id: "non-nano",
    title: "Non-Nano Materials Statement",
    summary: "Confirms that no nanomaterials are used in any moondune formulation.",
  },
  {
    id: "skin-irritation",
    title: "Primary Skin Irritation Test",
    summary: "Patch testing to assess the irritation potential of the formula on skin.",
  },
  {
    id: "challenge",
    title: "Challenge Test Report",
    summary: "Preservative efficacy test against microbial contamination.",
  },
  {
    id: "stability",
    title: "Stability Evaluation Report",
    summary: "Stability testing including high-heat conditions similar to the Middle East climate.",
  },
  {
    id: "animal",
    title: "No Animal Testing Statement",
    summary: "Confirms neither finished products nor ingredients are tested on animals.",
  },
  {
    id: "compatibility",
    title: "Compatibility Test Report",
    summary: "Checks that formula and packaging remain compatible through shelf life.",
  },
  {
    id: "microbiology",
    title: "Microbiology Report",
    summary: "Microbiological quality screening of the finished product.",
  },
]

export interface Faq {
  q: string
  a: string
}

export const faqs: { section: string; items: Faq[] }[] = [
  {
    section: "Product",
    items: [
      {
        q: "What is the difference between Sunrise (AM) Essence and Sunset (PM) Essence?",
        a: "Sunrise is a daytime essence focused on lightweight hydration and microbiome balance. Sunset works overnight to replenish and strengthen the skin barrier.",
      },
      {
        q: "Which product should I start with if I'm new to Moondune?",
        a: "Choose based on how your skin feels. If it feels dehydrated or struggles under sunscreen and makeup, start with Sunrise. If it feels sensitive, tired or easily irritated, start with Sunset.",
      },
      {
        q: "Is Sunrise Essence suitable for humid or warm weather?",
        a: "Yes. It's light and breathable, absorbs quickly, and doesn't feel heavy in hot or humid conditions.",
      },
      {
        q: "Will it feel heavy or sticky under sunscreen or makeup?",
        a: "No. The lightweight texture layers well under sunscreen and makeup, leaving skin hydrated without a greasy or sticky feel.",
      },
      {
        q: "How is barrier care different from regular moisturising?",
        a: "Moisturising adds hydration to the surface. Barrier care strengthens the skin itself so it retains moisture and handles environmental stress better.",
      },
      {
        q: "Why does my skin behave differently after moving countries or when I'm traveling for long?",
        a: "Climate, lifestyle and indoor environments can affect hydration and weaken the skin barrier. Products designed for other regions may not respond the same way here.",
      },
      {
        q: "Can I use both essences in the same routine?",
        a: "They're designed for AM and PM use respectively. Layering them together may over-layer actives found in both.",
      },
      {
        q: "Will this replace my serum or moisturizer?",
        a: "The essences sit between a serum and a moisturiser. If you have oily skin you may skip a moisturiser — just apply a generous layer of essence before sunscreen and makeup.",
      },
      {
        q: "Are the packs travel friendly?",
        a: "Yes. They have twist caps that lock after each use and are sleek enough for travel.",
      },
    ],
  },
  {
    section: "Delivery",
    items: [
      {
        q: "How long does shipping take?",
        a: "Within the UAE, orders are delivered by Aramex, tracked, usually within 2 days. International standard shipping takes 3–5 business days, with express options available at checkout.",
      },
      { q: "Do you ship internationally?", a: "Yes, to most countries. Costs and times vary by location." },
    ],
  },
  {
    section: "Policy",
    items: [
      {
        q: "What is your privacy policy?",
        a: "We never sell customer data to third parties. Read our full Privacy Policy for more detail.",
      },
      { q: "Do you use cookies?", a: "Yes, for a better shopping experience and to analyse site traffic." },
    ],
  },
]

export const contact = {
  email: "care@moondune.co",
  phone: "+971-547990329",
  phoneHref: "tel:+971547990329",
  instagram: "https://www.instagram.com/moondune.ae/",
  instagramHandle: "@moondune.ae",
  address: "House of Asya Limited, First floor, Incubator building, Masdar City, Abu Dhabi, UAE",
  dunecast: "https://dunecast.moondune.co",
}

export const discountCodes: Record<string, number> = {
  SAVE15: 15,
}
