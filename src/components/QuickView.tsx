import { useState } from "react"
import { Link } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogTitle } from "@/components/ui/dialog"
import { QuantityStepper } from "@/components/CartDrawer"
import { PriceTag } from "@/components/ProductCard"
import { VariantPicker } from "@/components/VariantPicker"
import { useCart } from "@/context/CartContext"
import type { Product } from "@/data/products"
import { thumb } from "@/lib/asset"

export function QuickView({
  product,
  open,
  onOpenChange,
}: {
  product: Product
  open: boolean
  onOpenChange: (o: boolean) => void
}) {
  const { addItem } = useCart()
  const [variantId, setVariantId] = useState(product.variants[0].id)
  const [qty, setQty] = useState(1)
  const [img, setImg] = useState(0)
  const variant = product.variants.find((v) => v.id === variantId) ?? product.variants[0]

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-3xl">
        <div className="grid gap-6 md:grid-cols-2">
          <div className="space-y-2">
            <img src={product.images[img]} alt={product.title} className="aspect-square w-full rounded-xl bg-wine-50 object-cover" />
            <div className="flex gap-2 overflow-x-auto">
              {product.images.slice(0, 6).map((src, i) => (
                <button
                  key={src}
                  onClick={() => setImg(i)}
                  aria-label={`Show image ${i + 1}`}
                  className={`size-14 shrink-0 overflow-hidden rounded-md border-2 ${i === img ? "border-wine" : "border-transparent"}`}
                >
                  <img src={thumb(src)} alt="" loading="lazy" className="size-full object-cover" />
                </button>
              ))}
            </div>
          </div>
          <div className="flex flex-col gap-4">
            <DialogTitle className="font-heading text-3xl leading-tight text-wine">{product.title}</DialogTitle>
            <PriceTag price={variant.price} compareAt={variant.compareAt} className="text-lg" />
            <DialogDescription className="line-clamp-4 text-sm leading-relaxed">{product.tagline}</DialogDescription>
            {product.variants.length > 1 && (
              <VariantPicker variants={product.variants} value={variantId} onChange={setVariantId} />
            )}
            <div className="flex items-center gap-3">
              <QuantityStepper value={qty} onChange={setQty} size="md" />
              <Button
                className="h-11 flex-1 rounded-full text-xs tracking-widest uppercase"
                onClick={() => {
                  addItem(product.handle, variant.id, qty)
                  onOpenChange(false)
                }}
              >
                Add to cart
              </Button>
            </div>
            <Link
              to={`/products/${product.handle}`}
              onClick={() => onOpenChange(false)}
              className="text-sm font-medium text-wine underline underline-offset-4"
            >
              View full details
            </Link>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
