import { useState } from "react"
import { Link } from "react-router-dom"
import { Check, Eye, Heart } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { QuickView } from "@/components/QuickView"
import { useCart } from "@/context/CartContext"
import { useWishlist } from "@/context/WishlistContext"
import { useAddedFeedback } from "@/hooks/useAddedFeedback"
import { discountPercent, formatAED, type Product } from "@/data/products"
import { cn } from "@/lib/utils"
import { thumb, productSrcSet } from "@/lib/asset"

export function PriceTag({ price, compareAt, className }: { price: number; compareAt: number | null; className?: string }) {
  return (
    <div className={cn("flex flex-wrap items-baseline gap-2", className)}>
      <span className="font-semibold text-wine">{formatAED(price)}</span>
      {compareAt && compareAt > price && <span className="text-sm text-muted-foreground line-through">{formatAED(compareAt)}</span>}
    </div>
  )
}

/** `featured` is the large bento cell on Home: bigger image, value line and a gold CTA. */
export function ProductCard({ product, featured = false, className }: { product: Product; featured?: boolean; className?: string }) {
  const { addItem } = useCart()
  const wishlist = useWishlist()
  const [added, flashAdded] = useAddedFeedback()
  const [quickOpen, setQuickOpen] = useState(false)
  const v = product.variants[0]
  const off = discountPercent(v)
  const saving = v.compareAt && v.compareAt > v.price ? v.compareAt - v.price : 0
  const saved = wishlist.has(product.handle)
  const sizes = featured ? "(min-width:1024px) 40vw, 100vw" : "(min-width:1024px) 20vw, (min-width:768px) 33vw, 50vw"

  return (
    <article className={cn("group flex flex-col", className)}>
      <div className={cn("relative overflow-hidden rounded-2xl bg-wine-50", featured && "lg:flex-1")}>
        <Link
          to={`/products/${product.handle}`}
          aria-label={product.title}
          className={cn("block aspect-[4/5]", featured && "max-lg:aspect-[4/3] lg:aspect-auto lg:h-full lg:min-h-[420px]")}
        >
          <img
            src={thumb(product.images[0])}
            srcSet={productSrcSet(product.images[0])}
            sizes={sizes}
            alt={product.title}
            loading="lazy"
            className="absolute inset-0 size-full object-cover transition-opacity duration-500 group-hover:opacity-0"
          />
          <img
            src={thumb(product.images[1] ?? product.images[0])}
            srcSet={productSrcSet(product.images[1] ?? product.images[0])}
            sizes={sizes}
            alt=""
            loading="lazy"
            className="absolute inset-0 size-full scale-105 object-cover opacity-0 transition duration-500 group-hover:scale-100 group-hover:opacity-100"
          />
        </Link>
        <div className="pointer-events-none absolute top-3 left-3 flex flex-col gap-1.5">
          {featured && <Badge className="bg-gold text-wine">Best value</Badge>}
          {saving > 0 && (
            <Badge className="bg-wine text-white" title={`${off}% off`}>
              Save {formatAED(saving)}
            </Badge>
          )}
          {product.bestseller && <Badge className="bg-gold text-wine">Bestseller</Badge>}
        </div>
        <button
          aria-label={saved ? "Remove from wishlist" : "Add to wishlist"}
          aria-pressed={saved}
          onClick={() => wishlist.toggle(product.handle)}
          className="absolute top-3 right-3 grid size-9 place-items-center rounded-full bg-white/90 shadow-sm transition hover:scale-110"
        >
          <Heart className={cn("size-4", saved ? "fill-wine text-wine" : "text-ink")} />
        </button>
        <Button
          variant="secondary"
          onClick={() => setQuickOpen(true)}
          className="absolute inset-x-3 bottom-3 h-9 translate-y-2 rounded-full bg-white/95 opacity-0 shadow transition group-hover:translate-y-0 group-hover:opacity-100 focus-visible:translate-y-0 focus-visible:opacity-100 max-lg:hidden"
        >
          <Eye /> Quick view
        </Button>
      </div>
      <div className={cn("flex flex-col gap-2 pt-4", !featured && "flex-1")}>
        <Link
          to={`/products/${product.handle}`}
          className={cn(
            "-my-1 line-clamp-2 py-1 font-medium hover:text-wine-2",
            featured ? "font-heading text-2xl leading-tight font-semibold text-wine" : "text-[15px]",
          )}
        >
          {featured ? product.shortTitle : product.title}
        </Link>
        {product.badges.length > 0 && (
          <p className="text-xs text-muted-foreground">{product.badges.slice(0, 2).join(" · ")}</p>
        )}
        {featured && product.features.some((f) => f.includes("free gift")) && (
          <p className="text-sm text-ink/80">Both essences in one set, plus a free gift worth 50 AED.</p>
        )}
        <PriceTag price={v.price} compareAt={v.compareAt} className={cn(featured && "text-lg")} />
        <Button
          variant={featured ? "gold" : "wine"}
          size="cta"
          aria-live="polite"
          className={cn("mt-auto w-full", !featured && "h-11 px-4")}
          onClick={() => {
            addItem(product.handle, v.id)
            flashAdded()
          }}
        >
          {added ? (
            <>
              <Check /> Added
            </>
          ) : featured ? (
            `Add the combo · ${formatAED(v.price)}`
          ) : (
            "Add to cart"
          )}
        </Button>
      </div>
      <QuickView product={product} open={quickOpen} onOpenChange={setQuickOpen} />
    </article>
  )
}
