import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { Banknote, CreditCard, Droplets, Gift, Minus, Plus, ShoppingBag, Tag, Trash2, Truck, X } from "lucide-react"
import { toast } from "sonner"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import { Sheet, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle } from "@/components/ui/sheet"
import { MAX_QTY, useCart } from "@/context/CartContext"
import { useAuth } from "@/context/AuthContext"
import { formatAED, getProduct } from "@/data/products"
import { thumb } from "@/lib/asset"
import { track } from "@/lib/track"

export function QuantityStepper({
  value,
  onChange,
  size = "sm",
}: {
  value: number
  onChange: (n: number) => void
  size?: "sm" | "md"
}) {
  const h = size === "sm" ? "h-8" : "h-11"
  return (
    <div className={`inline-flex ${h} items-center rounded-full border`}>
      <button
        aria-label="Decrease quantity"
        className="grid h-full w-8 place-items-center rounded-l-full hover:bg-muted disabled:opacity-40"
        onClick={() => onChange(value - 1)}
        disabled={value <= 1}
      >
        <Minus className="size-3.5" />
      </button>
      <span className="w-8 text-center text-sm font-medium tabular-nums" aria-live="polite">
        {value}
      </span>
      <button
        aria-label="Increase quantity"
        className="grid h-full w-8 place-items-center rounded-r-full hover:bg-muted disabled:opacity-40"
        onClick={() => onChange(value + 1)}
        disabled={value >= MAX_QTY}
      >
        <Plus className="size-3.5" />
      </button>
    </div>
  )
}

export function DiscountForm() {
  const { discountCode, applyDiscount, removeDiscount } = useCart()
  const [code, setCode] = useState("")
  const [error, setError] = useState("")

  if (discountCode) {
    return (
      <div className="flex items-center justify-between rounded-md bg-wine-50 px-3 py-2 text-sm">
        <span className="flex items-center gap-2 font-medium text-wine">
          <Tag className="size-4" /> {discountCode} applied
        </span>
        <button aria-label="Remove discount" onClick={removeDiscount} className="rounded p-1 hover:bg-white">
          <X className="size-4" />
        </button>
      </div>
    )
  }

  return (
    <form
      className="space-y-1"
      onSubmit={(e) => {
        e.preventDefault()
        if (!code.trim()) return setError("Enter a discount code")
        if (applyDiscount(code)) {
          toast.success(`Code ${code.trim().toUpperCase()} applied`)
          setCode("")
          setError("")
        } else setError("This discount code is not valid")
      }}
    >
      <div className="flex gap-2">
        <Input
          value={code}
          onChange={(e) => {
            setCode(e.target.value)
            setError("")
          }}
          placeholder="Discount code"
          aria-invalid={!!error}
          className="h-9 uppercase placeholder:normal-case"
        />
        <Button type="submit" variant="outline" className="h-9 px-4">
          Apply
        </Button>
      </div>
      {error ? (
        <p className="text-xs text-destructive">{error}</p>
      ) : (
        <p className="text-xs text-muted-foreground">
          Have a code?{" "}
          <button
            type="button"
            className="rounded-full bg-gold/30 px-2 py-0.5 font-semibold text-wine hover:bg-gold"
            onClick={() => applyDiscount("SAVE15") && toast.success("Code SAVE15 applied")}
          >
            Tap to apply SAVE15
          </button>{" "}
          for 15% off
        </p>
      )}
    </form>
  )
}

function ComboNudge() {
  const { lines, addItem, removeItem } = useCart()
  const combo = getProduct("am-to-pm-combo")
  const essences = lines.filter((l) => l.product.category === "essence" && l.variant.title === "Regular")
  const hasCombo = lines.some((l) => l.handle === "am-to-pm-combo")
  if (!combo || hasCombo || essences.length !== 1 || essences[0].quantity !== 1) return null
  const line = essences[0]
  const extra = combo.variants[0].price - line.variant.price
  return (
    <div className="mx-4 mb-4 flex items-center gap-3 rounded-xl bg-wine-50 p-3 text-sm">
      <Gift className="size-5 shrink-0 text-wine" />
      <p className="flex-1 text-ink/80">
        Add the other essence for just <b className="text-wine">{formatAED(extra)}</b> more, and get a free gift worth 50 AED.
      </p>
      <Button
        size="sm"
        className="shrink-0 rounded-full"
        onClick={() => {
          removeItem(line.variantId)
          addItem(combo.handle, combo.variants[0].id, 1, { silent: true })
          track("combo_upgrade", { from: line.handle })
          toast.success("Upgraded to the AM to PM Combo")
        }}
      >
        Upgrade
      </Button>
    </div>
  )
}

/** Shown when the combo nudge isn't: the tumbler pairs with any essence order. */
function TumblerNudge() {
  const { lines, addItem } = useCart()
  const tumbler = getProduct("skinsip-quencher")
  const hasWater = lines.some((l) => l.handle === "skinsip-quencher" || l.handle === "sip-and-glow-combo")
  if (!tumbler || hasWater) return null
  const v = tumbler.variants[0]
  return (
    <div className="mx-4 mb-4 flex items-center gap-3 rounded-xl border border-dashed border-wine/25 p-3 text-sm">
      <Droplets className="size-5 shrink-0 text-wine" />
      <p className="flex-1 text-ink/80">
        Hydrate from the inside too: the <b className="text-wine">{tumbler.shortTitle}</b> for {formatAED(v.price)}.
      </p>
      <Button size="sm" variant="outline" className="h-9 shrink-0 rounded-full px-4" onClick={() => addItem(tumbler.handle, v.id, 1, { silent: true })}>
        <Plus /> Add
      </Button>
    </div>
  )
}

function useComboNudgeVisible() {
  const { lines } = useCart()
  const essences = lines.filter((l) => l.product.category === "essence" && l.variant.title === "Regular")
  const hasCombo = lines.some((l) => l.handle === "am-to-pm-combo")
  return !hasCombo && essences.length === 1 && essences[0].quantity === 1
}

export function CartDrawer() {
  const { lines, isOpen, setOpen, updateQuantity, removeItem, subtotal, compareSubtotal, discountAmount, total, count } = useCart()
  const comboNudge = useComboNudgeVisible()
  const youSave = compareSubtotal - subtotal + discountAmount
  const { user } = useAuth()
  const navigate = useNavigate()

  const go = (to: string) => {
    setOpen(false)
    navigate(to)
  }

  return (
    <Sheet open={isOpen} onOpenChange={setOpen}>
      <SheetContent className="w-full gap-0 p-0 sm:max-w-md">
        <SheetHeader className="border-b">
          <SheetTitle className="font-heading text-2xl text-wine">Your cart {count > 0 && `(${count})`}</SheetTitle>
          <SheetDescription className="flex items-center gap-2 text-xs">
            <Truck className="size-3.5" /> Free tracked UAE delivery in 2 days via Aramex
          </SheetDescription>
        </SheetHeader>

        {lines.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-4 p-8 text-center">
            <div className="grid size-16 place-items-center rounded-full bg-wine-50">
              <ShoppingBag className="size-7 text-wine" />
            </div>
            <p className="font-heading text-2xl text-wine">Your cart is empty</p>
            {!user && (
              <p className="text-sm text-muted-foreground">
                Have an account?{" "}
                <button className="font-medium text-wine underline underline-offset-4" onClick={() => go("/account")}>
                  Log in
                </button>{" "}
                to check out faster.
              </p>
            )}
            <Button className="rounded-full px-8" onClick={() => go("/shop")}>
              Continue shopping
            </Button>
          </div>
        ) : (
          <>
            <ScrollArea className="min-h-0 flex-1">
              <ul className="divide-y px-4">
                {lines.map((l) => (
                  <li key={l.variantId} className="flex gap-3 py-4">
                    <Link to={`/products/${l.handle}`} onClick={() => setOpen(false)} className="shrink-0">
                      <img src={thumb(l.product.images[0])} alt={l.product.title} className="size-20 rounded-md bg-muted object-cover" />
                    </Link>
                    <div className="flex min-w-0 flex-1 flex-col gap-1">
                      <div className="flex items-start justify-between gap-2">
                        <Link
                          to={`/products/${l.handle}`}
                          onClick={() => setOpen(false)}
                          className="line-clamp-2 text-sm font-medium hover:text-wine-2"
                        >
                          {l.product.title}
                        </Link>
                        <button
                          aria-label={`Remove ${l.product.title}`}
                          onClick={() => {
                            removeItem(l.variantId)
                            toast("Removed from cart", { description: l.product.shortTitle })
                          }}
                          className="rounded p-1 text-muted-foreground hover:bg-muted hover:text-destructive"
                        >
                          <Trash2 className="size-4" />
                        </button>
                      </div>
                      {l.product.variants.length > 1 && (
                        <p className="text-xs text-muted-foreground">Type: {l.variant.title}</p>
                      )}
                      <div className="mt-auto flex items-center justify-between">
                        <QuantityStepper value={l.quantity} onChange={(n) => updateQuantity(l.variantId, n)} />
                        <div className="text-right">
                          <p className="text-sm font-semibold">{formatAED(l.lineTotal)}</p>
                          {l.variant.compareAt && (
                            <p className="text-xs text-muted-foreground line-through">
                              {formatAED(l.variant.compareAt * l.quantity)}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
              {comboNudge ? <ComboNudge /> : <TumblerNudge />}
            </ScrollArea>
            <SheetFooter className="gap-3 border-t bg-wine-50/40">
              <DiscountForm />
              <Separator />
              <div className="space-y-1 text-sm">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>{formatAED(subtotal)}</span>
                </div>
                {discountAmount > 0 && (
                  <div className="flex justify-between text-success">
                    <span>Discount</span>
                    <span>−{formatAED(discountAmount)}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span className="font-medium text-success">Free</span>
                </div>
                <div className="flex justify-between pt-1 text-base font-semibold">
                  <span>Total</span>
                  <span>{formatAED(total)}</span>
                </div>
                {youSave > 0 && (
                  <p className="text-right text-xs font-semibold text-success">You save {formatAED(youSave)} on this order</p>
                )}
                <p className="text-xs text-muted-foreground">VAT & duties included.</p>
              </div>
              <Button
                size="cta"
                className="w-full text-sm tracking-wider uppercase"
                onClick={() => {
                  track("begin_checkout", { source: "cart", value: total, items: count })
                  go("/checkout")
                }}
              >
                Checkout · {formatAED(total)}
              </Button>
              <ul aria-label="Checkout reassurance" className="flex flex-wrap justify-center gap-x-4 gap-y-1 text-[11px] text-muted-foreground">
                <li className="flex items-center gap-1">
                  <Banknote className="size-3.5" /> Cash on delivery
                </li>
                <li className="flex items-center gap-1">
                  <CreditCard className="size-3.5" /> Secure Stripe card
                </li>
                <li className="flex items-center gap-1">
                  <Truck className="size-3.5" /> Free 2-day delivery
                </li>
              </ul>
              <Button variant="link" className="w-full" onClick={() => go("/shop")}>
                Continue shopping
              </Button>
            </SheetFooter>
          </>
        )}
      </SheetContent>
    </Sheet>
  )
}
