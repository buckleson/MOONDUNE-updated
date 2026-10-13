import { useRef, useState } from "react"
import { Link, useNavigate, useParams } from "react-router-dom"
import { Banknote, Check, ChevronLeft, ChevronRight, CreditCard, FileCheck2, Heart, Leaf, Share2, ShieldCheck, Truck } from "lucide-react"
import { toast } from "sonner"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog"
import { QuantityStepper } from "@/components/CartDrawer"
import { PriceTag, ProductCard } from "@/components/ProductCard"
import { VariantPicker } from "@/components/VariantPicker"
import { useCart } from "@/context/CartContext"
import { useWishlist } from "@/context/WishlistContext"
import { discountPercent, formatAED, getProduct, products } from "@/data/products"
import { cn } from "@/lib/utils"
import NotFound from "@/pages/NotFound"
import { LabReportDialog } from "@/components/home/LabReports"
import { Reviews, RatingLink } from "@/components/Reviews"
import { Seo } from "@/components/Seo"
import { StickyAddToCart } from "@/components/StickyAddToCart"
import { faqs, labReports, type LabReport } from "@/data/content"
import { breadcrumbSchema, faqSchema, productSchema } from "@/lib/schema"
import { thumb, productSrcSet } from "@/lib/asset"

const productFaqs = (category: string) =>
  category === "accessory" ? faqs[1].items : [...faqs[0].items.slice(0, 4), faqs[0].items[7], faqs[1].items[0]]

export default function ProductPage() {
  const { handle = "" } = useParams()
  const product = getProduct(handle)
  // Remount per product so gallery/variant state resets on navigation.
  return product ? <ProductDetail key={handle} handle={handle} /> : <NotFound />
}

function ProductDetail({ handle }: { handle: string }) {
  const product = getProduct(handle)!
  const navigate = useNavigate()
  const { addItem } = useCart()
  const wishlist = useWishlist()
  const [variantId, setVariantId] = useState(product.variants[0].id)
  const [qty, setQty] = useState(1)
  const [img, setImg] = useState(0)
  const [zoom, setZoom] = useState(false)
  const [report, setReport] = useState<LabReport | null>(null)
  const ctaRef = useRef<HTMLDivElement>(null)
  const upsell = product.category === "essence" ? getProduct("am-to-pm-combo") : undefined
  const pFaqs = productFaqs(product.category)
  const variant = product.variants.find((v) => v.id === variantId)!
  const off = discountPercent(variant)
  const n = product.images.length
  const related = products.filter((p) => p.handle !== product.handle).slice(0, 4)
  const saved = wishlist.has(product.handle)

  const share = async () => {
    const url = window.location.href
    try {
      if (navigator.share) await navigator.share({ title: product.title, url })
      else {
        await navigator.clipboard.writeText(url)
        toast.success("Link copied to clipboard")
      }
    } catch {
      // user cancelled share sheet
    }
  }

  return (
    <>
      <Seo
        title={product.seo.title}
        description={product.seo.description}
        image={product.images[0]}
        type="product"
        jsonLd={[
          productSchema(product),
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Shop", path: "/shop" },
            { name: product.shortTitle, path: `/products/${product.handle}` },
          ]),
          faqSchema(pFaqs),
        ]}
      />
      <div className="mx-auto max-w-7xl px-4 py-6">
        <nav aria-label="Breadcrumb" className="text-xs text-muted-foreground">
          <Link to="/" className="hover:text-wine">
            Home
          </Link>
          <span className="mx-2">/</span>
          <Link to="/shop" className="hover:text-wine">
            Shop
          </Link>
          <span className="mx-2">/</span>
          <span className="text-wine">{product.shortTitle}</span>
        </nav>
      </div>

      <section className="mx-auto grid max-w-7xl gap-10 px-4 pb-16 lg:grid-cols-2">
        <div className="flex min-w-0 flex-col-reverse gap-3 md:flex-row lg:sticky lg:top-28 lg:self-start">
          <div className="flex gap-2 overflow-x-auto md:max-h-[640px] md:flex-col md:overflow-y-auto">
            {product.images.map((src, i) => (
              <button
                key={src}
                onClick={() => setImg(i)}
                aria-label={`Show image ${i + 1}`}
                className={cn(
                  "size-16 shrink-0 overflow-hidden rounded-lg border-2 transition md:size-20",
                  i === img ? "border-wine" : "border-transparent opacity-70 hover:opacity-100",
                )}
              >
                <img src={thumb(src)} alt="" loading="lazy" className="size-full object-cover" />
              </button>
            ))}
          </div>
          <div className="relative flex-1 overflow-hidden rounded-2xl bg-wine-50">
            <button onClick={() => setZoom(true)} className="block w-full cursor-zoom-in" aria-label="Zoom image">
              <img
                src={product.images[img]}
                srcSet={productSrcSet(product.images[img])}
                sizes="(min-width:1024px) 40vw, 100vw"
                alt={product.title}
                fetchPriority="high"
                className="aspect-square w-full object-cover"
              />
            </button>
            {off > 0 && <Badge className="absolute top-4 left-4 bg-wine text-white">{off}% OFF</Badge>}
            <button
              aria-label="Previous image"
              onClick={() => setImg((img - 1 + n) % n)}
              className="absolute top-1/2 left-3 grid size-10 -translate-y-1/2 place-items-center rounded-full bg-white/85 shadow hover:bg-white"
            >
              <ChevronLeft className="size-5" />
            </button>
            <button
              aria-label="Next image"
              onClick={() => setImg((img + 1) % n)}
              className="absolute top-1/2 right-3 grid size-10 -translate-y-1/2 place-items-center rounded-full bg-white/85 shadow hover:bg-white"
            >
              <ChevronRight className="size-5" />
            </button>
            <span className="absolute right-4 bottom-4 rounded-full bg-white/85 px-3 py-1 text-xs font-medium">
              {img + 1} / {n}
            </span>
          </div>
        </div>

        <div className="flex min-w-0 flex-col gap-5">
          {product.bestseller && <Badge className="w-fit bg-gold text-wine">Bestseller</Badge>}
          <h1 className="text-[clamp(32px,4vw,46px)] leading-tight font-semibold text-wine">{product.title}</h1>
          <RatingLink handle={product.handle} />
          <div className="flex items-center gap-3">
            <PriceTag price={variant.price} compareAt={variant.compareAt} className="text-xl" />
            {off > 0 && <span className="rounded-full bg-success/10 px-2 py-0.5 text-xs font-semibold text-success">Save {off}%</span>}
          </div>
          <p className="text-xs text-muted-foreground">Tax included. Free UAE shipping.</p>
          <div className="flex flex-wrap gap-2">
            {product.badges.map((b) => (
              <span key={b} className="rounded-full bg-wine-50 px-3 py-1 text-xs font-medium text-wine">
                {b}
              </span>
            ))}
          </div>
          <p className="leading-relaxed text-muted-foreground">{product.tagline}</p>

          {product.variants.length > 1 && <VariantPicker variants={product.variants} value={variantId} onChange={setVariantId} />}

          <div ref={ctaRef} className="flex flex-wrap items-center gap-3">
            <QuantityStepper value={qty} onChange={setQty} size="md" />
            <Button
              size="lg"
              className="h-11 flex-1 rounded-full text-xs tracking-widest uppercase"
              onClick={() => addItem(product.handle, variant.id, qty)}
            >
              Add to cart
            </Button>
            <Button
              variant="outline"
              size="icon-lg"
              className="size-11 rounded-full"
              aria-label={saved ? "Remove from wishlist" : "Add to wishlist"}
              aria-pressed={saved}
              onClick={() => wishlist.toggle(product.handle)}
            >
              <Heart className={cn(saved && "fill-wine text-wine")} />
            </Button>
            <Button variant="outline" size="icon-lg" className="size-11 rounded-full" aria-label="Share" onClick={share}>
              <Share2 />
            </Button>
          </div>
          <Button
            size="lg"
            variant="secondary"
            className="h-11 rounded-full bg-gold text-xs tracking-widest text-wine uppercase hover:bg-gold-2"
            onClick={() => {
              addItem(product.handle, variant.id, qty, { silent: true })
              navigate("/checkout")
            }}
          >
            Buy it now
          </Button>

          <ul className="grid grid-cols-2 gap-x-4 gap-y-2.5 text-[13px] text-ink/80">
            <li className="flex items-center gap-2">
              <Truck className="size-4 shrink-0 text-wine-2" /> Free 2-day UAE delivery (Aramex)
            </li>
            <li className="flex items-center gap-2">
              <Banknote className="size-4 shrink-0 text-wine-2" /> Cash on delivery available
            </li>
            <li className="flex items-center gap-2">
              <CreditCard className="size-4 shrink-0 text-wine-2" /> Secure card payment via Stripe
            </li>
            <li className="flex items-center gap-2">
              <ShieldCheck className="size-4 shrink-0 text-wine-2" /> VAT &amp; duties included
            </li>
          </ul>

          {upsell && (
            <div className="flex items-center gap-4 rounded-2xl bg-wine-50 p-4">
              <img src={thumb(upsell.images[0])} alt="" className="size-16 shrink-0 rounded-lg object-cover" loading="lazy" />
              <div className="min-w-0 flex-1 text-sm">
                <p className="font-semibold text-wine">Complete the routine and save</p>
                <p className="text-ink/75">
                  AM + PM for {formatAED(upsell.variants[0].price)}
                  {upsell.variants[0].compareAt && (
                    <>
                      {" "}
                      <s className="text-muted-foreground">{formatAED(upsell.variants[0].compareAt)}</s> · free gift worth 50 AED
                    </>
                  )}
                </p>
              </div>
              <Button size="sm" className="shrink-0 rounded-full" onClick={() => addItem(upsell.handle, upsell.variants[0].id)}>
                Add combo
              </Button>
            </div>
          )}

          {product.facts && (
            <section aria-labelledby="facts-h" className="rounded-2xl border p-5">
              <h2 id="facts-h" className="font-sans text-sm font-semibold text-wine">
                Quick facts
              </h2>
              <dl className="mt-3 divide-y text-sm">
                {product.facts.keyActives && (
                  <div className="grid grid-cols-[110px_1fr] gap-3 py-2.5">
                    <dt className="text-muted-foreground">Key actives</dt>
                    <dd>{product.facts.keyActives.join(" · ")}</dd>
                  </div>
                )}
                {product.facts.rows.map((r) => (
                  <div key={r.label} className="grid grid-cols-[110px_1fr] gap-3 py-2.5">
                    <dt className="text-muted-foreground">{r.label}</dt>
                    <dd>{r.value}</dd>
                  </div>
                ))}
              </dl>
              {product.category !== "accessory" && (
                <div className="mt-3 flex flex-wrap items-center gap-2 border-t pt-4">
                  <span className="flex items-center gap-1.5 text-xs text-muted-foreground">
                    <Leaf className="size-3.5" /> Cruelty free · Lab reports:
                  </span>
                  {labReports.slice(1, 4).map((r) => (
                    <button
                      key={r.id}
                      onClick={() => setReport(r)}
                      className="inline-flex items-center gap-1 rounded-full bg-wine-50 px-2.5 py-1 text-xs font-medium text-wine hover:bg-wine hover:text-white"
                    >
                      <FileCheck2 className="size-3" /> {r.title}
                    </button>
                  ))}
                </div>
              )}
            </section>
          )}

          <Accordion type="single" collapsible defaultValue="description" className="w-full">
            <AccordionItem value="description">
              <AccordionTrigger className="text-base">Description</AccordionTrigger>
              <AccordionContent>
                <ul className="space-y-2">
                  {product.description.map((d) => (
                    <li key={d} className="flex gap-2">
                      <Check className="mt-0.5 size-4 shrink-0 text-wine" /> {d}
                    </li>
                  ))}
                </ul>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="features">
              <AccordionTrigger className="text-base">Core features</AccordionTrigger>
              <AccordionContent>
                <ul className="list-disc space-y-2 pl-5">
                  {product.features.map((f) => (
                    <li key={f}>{f}</li>
                  ))}
                </ul>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="care">
              <AccordionTrigger className="text-base">Care guide</AccordionTrigger>
              <AccordionContent>
                <ul className="list-disc space-y-2 pl-5">
                  {product.careGuide.map((c) => (
                    <li key={c}>{c}</li>
                  ))}
                </ul>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="faq">
              <AccordionTrigger className="text-base">Questions &amp; answers</AccordionTrigger>
              <AccordionContent>
                <dl className="space-y-4">
                  {pFaqs.map((f) => (
                    <div key={f.q}>
                      <dt className="font-semibold text-wine">{f.q}</dt>
                      <dd className="mt-1 text-ink/80">{f.a}</dd>
                    </div>
                  ))}
                </dl>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="shipping">
              <AccordionTrigger className="text-base">Shipping & returns</AccordionTrigger>
              <AccordionContent>
                Ships from Abu Dhabi with Aramex — tracked, usually delivered within 2 days across all Emirates. VAT & duties
                included.{" "}
                <Link to="/policies/shipping-and-returns" className="font-medium text-wine underline">
                  Read the full policy
                </Link>
                .
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </section>

      {product.highlights && (
        <section className="bg-wine py-16 text-white">
          <div className="mx-auto max-w-7xl px-4">
            <h2 className="text-center text-[clamp(28px,4vw,42px)] font-semibold">Where Arab culture and bio-science meet</h2>
            <div className="mt-10 grid gap-6 md:grid-cols-3">
              {product.highlights.map((h) => (
                <div key={h.title} className="rounded-2xl border border-white/15 bg-white/5 p-6">
                  <h3 className="mb-2 text-2xl font-semibold text-gold">{h.title}</h3>
                  <p className="text-sm leading-relaxed text-white/85">{h.text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      <Reviews handle={product.handle} title="Reviews" />

      <section className="py-16">
        <div className="mx-auto max-w-7xl px-4">
          <h2 className="mb-10 text-center text-[clamp(28px,4vw,42px)] font-semibold text-wine">You may also like</h2>
          <div className="grid grid-cols-2 gap-x-4 gap-y-10 md:grid-cols-4">
            {related.map((p) => (
              <ProductCard key={p.handle} product={p} />
            ))}
          </div>
        </div>
      </section>

      <LabReportDialog report={report} onClose={() => setReport(null)} />
      <StickyAddToCart anchor={ctaRef} product={product} variant={variant} onAdd={() => addItem(product.handle, variant.id, qty)} />

      <Dialog open={zoom} onOpenChange={setZoom}>
        <DialogContent className="max-w-[95vw] p-2 sm:max-w-4xl">
          <DialogTitle className="sr-only">{product.title}</DialogTitle>
          <img src={product.images[img]} alt={product.title} className="max-h-[85vh] w-full rounded-lg object-contain" />
        </DialogContent>
      </Dialog>
    </>
  )
}
