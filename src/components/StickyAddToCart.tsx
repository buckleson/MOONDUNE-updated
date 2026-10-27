import { useEffect, useRef, useState, type RefObject } from "react"
import { Button } from "@/components/ui/button"
import { useCart } from "@/context/CartContext"
import { formatAED, type Product, type Variant } from "@/data/products"
import { cn } from "@/lib/utils"
import { thumb } from "@/lib/asset"

/** Bottom bar that appears once the page's main add-to-cart button scrolls out of view. */
export function StickyAddToCart({
  anchor,
  product,
  variant,
  onAdd,
  className,
}: {
  anchor: RefObject<HTMLElement | null>
  product: Product
  variant: Variant
  onAdd: () => void
  className?: string
}) {
  const [past, setPast] = useState(false)
  const { isOpen } = useCart()
  const show = past && !isOpen

  useEffect(() => {
    const el = anchor.current
    if (!el) return
    const io = new IntersectionObserver(([e]) => setPast(!e.isIntersecting && e.boundingClientRect.top < 0))
    io.observe(el)
    return () => io.disconnect()
  }, [anchor])

  // Lets other floating UI (WhatsApp) step aside while the bar is up. Skipped when the bar is CSS-hidden.
  const barRef = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const root = document.documentElement
    if (show && barRef.current && getComputedStyle(barRef.current).display !== "none") root.dataset.stickyCta = ""
    else delete root.dataset.stickyCta
    return () => {
      delete root.dataset.stickyCta
    }
  }, [show])

  return (
    <div
      ref={barRef}
      aria-hidden={!show}
      className={cn(
        "fixed inset-x-0 bottom-0 z-40 border-t bg-white/95 pb-[env(safe-area-inset-bottom,0px)] shadow-[0_-10px_30px_-15px_rgba(58,23,45,.35)] backdrop-blur transition-transform duration-300 ease-out",
        show ? "translate-y-0" : "pointer-events-none translate-y-full",
        className,
      )}
    >
      <div className="mx-auto flex max-w-7xl items-center gap-3 px-4 py-3">
        <img src={thumb(product.images[0])} alt="" loading="lazy" className="hidden size-11 rounded-md object-cover sm:block" />
        <div className="min-w-0 flex-1">
          <p className="truncate text-sm font-semibold text-wine">{product.shortTitle}</p>
          <p className="text-xs text-muted-foreground">
            <span className="font-semibold text-ink tabular-nums">{formatAED(variant.price)}</span>
            {variant.title !== "Default" && ` · ${variant.title}`} · Free 2-day delivery
          </p>
        </div>
        <Button variant="wine" size="cta" tabIndex={show ? 0 : -1} onClick={onAdd} className="h-11 px-6">
          Add to cart
        </Button>
      </div>
    </div>
  )
}
