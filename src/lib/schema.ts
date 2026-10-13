import { contact, faqs, type Faq } from "@/data/content"
import type { Product } from "@/data/products"

/** Origin used for canonical URLs and structured data. Defaults to production; the
 *  GitHub Pages preview build overrides it and sets VITE_NOINDEX (see package.json). */
export const SITE_URL = (import.meta.env.VITE_SITE_URL || "https://www.moondune.co").replace(/\/$/, "")
export const NOINDEX = import.meta.env.VITE_NOINDEX === "true"
export const SITE_NAME = "Moondune"

const BASE = import.meta.env.BASE_URL.replace(/\/$/, "")

/** Absolute URL for a router path or a base-prefixed public asset path. */
export const absUrl = (path: string) =>
  /^https?:/.test(path) ? path : SITE_URL + (BASE && path.startsWith(BASE + "/") ? path.slice(BASE.length) : path)

type Json = Record<string, unknown>

export const organizationSchema = (): Json => ({
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": `${SITE_URL}/#organization`,
  name: SITE_NAME,
  legalName: "House of Asya Limited",
  url: SITE_URL,
  logo: `${SITE_URL}/images/site/logo-original-174px.webp`,
  slogan: "Desert Alchemy — Redefined",
  description:
    "Climate-intelligent skincare made for the UAE: Arabic botanicals (dates, coffee, honey) combined with Korean bio-science, independently lab-tested in South Korea.",
  email: contact.email,
  telephone: contact.phone,
  founder: { "@type": "Person", name: "Sruti Gudavalli" },
  address: {
    "@type": "PostalAddress",
    streetAddress: "First floor, Incubator building, Masdar City",
    addressLocality: "Abu Dhabi",
    addressCountry: "AE",
  },
  areaServed: { "@type": "Country", name: "United Arab Emirates" },
  sameAs: [contact.instagram, contact.dunecast],
  award: "Finalist, Innovative Packaging — Beautyworld Middle East Awards 2026",
})

export const websiteSchema = (): Json => ({
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${SITE_URL}/#website`,
  url: SITE_URL,
  name: SITE_NAME,
  publisher: { "@id": `${SITE_URL}/#organization` },
  potentialAction: {
    "@type": "SearchAction",
    target: `${SITE_URL}/shop?q={search_term_string}`,
    "query-input": "required name=search_term_string",
  },
})

// No aggregateRating/review here on purpose: the on-site reviews are placeholders,
// and marking them up would violate Google's review snippet policy.
export const productSchema = (p: Product): Json => ({
  "@context": "https://schema.org",
  "@type": "Product",
  "@id": `${SITE_URL}/products/${p.handle}#product`,
  name: p.title,
  description: p.tagline,
  image: p.images.map(absUrl),
  sku: p.variants[0].id,
  brand: { "@type": "Brand", name: SITE_NAME },
  category: p.category === "accessory" ? "Drinkware" : "Skin Care > Facial Essence",
  ...(p.facts?.keyActives && {
    additionalProperty: [{ "@type": "PropertyValue", name: "Key actives", value: p.facts.keyActives.join(", ") }],
  }),
  offers: p.variants.map((v) => ({
    "@type": "Offer",
    name: v.title === "Default" ? p.title : `${p.shortTitle} — ${v.title}`,
    sku: v.id,
    price: v.price.toFixed(2),
    priceCurrency: "AED",
    availability: "https://schema.org/InStock",
    itemCondition: "https://schema.org/NewCondition",
    url: `${SITE_URL}/products/${p.handle}`,
    seller: { "@id": `${SITE_URL}/#organization` },
    shippingDetails: {
      "@type": "OfferShippingDetails",
      shippingRate: { "@type": "MonetaryAmount", value: "0", currency: "AED" },
      shippingDestination: { "@type": "DefinedRegion", addressCountry: "AE" },
      deliveryTime: {
        "@type": "ShippingDeliveryTime",
        handlingTime: { "@type": "QuantitativeValue", minValue: 0, maxValue: 1, unitCode: "DAY" },
        transitTime: { "@type": "QuantitativeValue", minValue: 1, maxValue: 2, unitCode: "DAY" },
      },
    },
  })),
})

export const breadcrumbSchema = (items: { name: string; path: string }[]): Json => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: items.map((it, i) => ({ "@type": "ListItem", position: i + 1, name: it.name, item: absUrl(it.path) })),
})

export const faqSchema = (items: Faq[] = faqs.flatMap((s) => s.items)): Json => ({
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: items.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
})
