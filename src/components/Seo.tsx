import { useLocation } from "react-router-dom"
import { asset } from "@/lib/asset"
import { NOINDEX, SITE_NAME, SITE_URL, absUrl } from "@/lib/schema"

interface SeoProps {
  title: string
  description: string
  image?: string
  type?: "website" | "product" | "article"
  noindex?: boolean
  jsonLd?: Record<string, unknown>[]
}

/** Per-route head tags. React 19 hoists <title>/<meta>/<link> into <head>; `data-seo` lets
 *  main.tsx drop the prerendered copies before the client renders its own. */
export function Seo({ title, description, image, type = "website", noindex, jsonLd = [] }: SeoProps) {
  const { pathname } = useLocation()
  const url = SITE_URL + (pathname === "/" ? "/" : pathname.replace(/\/$/, ""))
  const fullTitle = title.includes(SITE_NAME) ? title : `${title} | ${SITE_NAME}`
  const img = absUrl(image ?? asset("/images/site/moondune-hero-3.webp"))
  return (
    <>
      <title data-seo="">{fullTitle}</title>
      <meta data-seo="" name="description" content={description} />
      <link data-seo="" rel="canonical" href={url} />
      {(noindex || NOINDEX) && <meta data-seo="" name="robots" content="noindex, follow" />}
      <meta data-seo="" property="og:site_name" content={SITE_NAME} />
      <meta data-seo="" property="og:type" content={type} />
      <meta data-seo="" property="og:title" content={fullTitle} />
      <meta data-seo="" property="og:description" content={description} />
      <meta data-seo="" property="og:url" content={url} />
      <meta data-seo="" property="og:image" content={img} />
      <meta data-seo="" property="og:locale" content="en_AE" />
      <meta data-seo="" name="twitter:card" content="summary_large_image" />
      <meta data-seo="" name="twitter:title" content={fullTitle} />
      <meta data-seo="" name="twitter:description" content={description} />
      <meta data-seo="" name="twitter:image" content={img} />
      {jsonLd.map((d, i) => (
        <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(d) }} />
      ))}
    </>
  )
}
