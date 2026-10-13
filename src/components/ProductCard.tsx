import { useState } from "react"
import { Link } from "react-router-dom"
import { Eye, Heart } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { QuickView } from "@/components/QuickView"
import { useCart } from "@/context/CartContext"
import { useWishlist } from "@/context/WishlistContext"
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

export function ProductCard({ product }: { product: Product }) {
  const { addItem } = useCart()
  const wishlist = useWishlist()
  const [quickOpen, setQuickOpen] = useState(false)
  const v = product.variants[0]
  const off = discountPercent(v)
  const saved = wishlist.has(product.handle)

  return (
    <article className="group flex flex-col">
      <div className="relative overflow-hidden rounded-2xl bg-wine-50">
        <Link to={`/products/${product.handle}`} aria-label={product.title} className="block aspect-[4/5]">
          <img
            src={thumb(product.images[0])}
            srcSet={productSrcSet(product.images[0])}
            sizes="(min-width:1024px) 20vw, (min-width:768px) 33vw, 50vw"
            alt={product.title}
            loading="lazy"
            className="absolute inset-0 size-full object-cover transition-opacity duration-500 group-hover:opacity-0"
          />
          <img
            src={thumb(product.images[1] ?? product.images[0])}
            srcSet={productSrcSet(product.images[1] ?? product.images[0])}
            sizes="(min-width:1024px) 20vw, (min-width:768px) 33vw, 50vw"
            alt=""
            loading="lazy"
            className="absolute inset-0 size-full scale-105 object-cover opacity-0 transition duration-500 group-hover:scale-100 group-hover:opacity-100"
          />
        </Link>
        <div className="pointer-events-none absolute top-3 left-3 flex flex-col gap-1.5">
          {off > 0 && <Badge className="bg-wine text-white">{off}% OFF</Badge>}
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
      <div className="flex flex-1 flex-col gap-2 pt-4">
        <Link to={`/products/${product.handle}`} className="line-clamp-2 text-[15px] font-medium hover:text-wine-2">
          {product.title}
        </Link>
        <PriceTag price={v.price} compareAt={v.compareAt} />
        <Button
          className="mt-auto h-11 w-full rounded-full text-xs font-semibold tracking-widest uppercase"
          onClick={() => addItem(product.handle, v.id)}
        >
          Add to cart
        </Button>
      </div>
      <QuickView product={product} open={quickOpen} onOpenChange={setQuickOpen} />
    </article>
  )
}
