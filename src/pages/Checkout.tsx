import { useState, type FormEvent } from "react"
import { Link, useNavigate } from "react-router-dom"
import { CreditCard, Loader2, Lock, Banknote } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { DiscountForm } from "@/components/CartDrawer"
import { EMAIL_RE } from "@/components/NewsletterSignup"
import { useAuth, type Order } from "@/context/AuthContext"
import { useCart } from "@/context/CartContext"
import { formatAED } from "@/data/products"
import { cn } from "@/lib/utils"
import { Seo } from "@/components/Seo"
import { thumb } from "@/lib/asset"

const emirates = ["Abu Dhabi", "Dubai", "Sharjah", "Ajman", "Umm Al Quwain", "Ras Al Khaimah", "Fujairah"]

type Fields = {
  email: string
  name: string
  phone: string
  address: string
  city: string
  emirate: string
  card: string
  expiry: string
  cvc: string
}

export default function Checkout() {
  const { lines, subtotal, discountAmount, total, clear, discountCode } = useCart()
  const { user, addOrder } = useAuth()
  const navigate = useNavigate()
  const [payment, setPayment] = useState<"card" | "cod">("card")
  const [submitting, setSubmitting] = useState(false)
  const [placedId, setPlacedId] = useState<string | null>(null)
  const [errors, setErrors] = useState<Partial<Record<keyof Fields, string>>>({})
  const [f, setF] = useState<Fields>({
    email: user?.email ?? "",
    name: user?.name ?? "",
    phone: "",
    address: "",
    city: "",
    emirate: "",
    card: "",
    expiry: "",
    cvc: "",
  })

  const set = (k: keyof Fields) => (v: string) => {
    setF((prev) => ({ ...prev, [k]: v }))
    setErrors((e) => ({ ...e, [k]: undefined }))
  }

  if (placedId) return null

  if (lines.length === 0) {
    return (
      <div className="mx-auto max-w-xl px-4 py-24 text-center">
        <Seo title="Checkout" description="Secure checkout with free UAE delivery." noindex />
        <h1 className="text-4xl font-semibold text-wine">Your cart is empty</h1>
        <p className="mt-3 text-muted-foreground">Add something lovely before checking out.</p>
        <Button asChild className="mt-6 rounded-full px-8">
          <Link to="/shop">Continue shopping</Link>
        </Button>
      </div>
    )
  }

  const validate = () => {
    const e: typeof errors = {}
    if (!EMAIL_RE.test(f.email.trim())) e.email = "Enter a valid email"
    if (f.name.trim().length < 2) e.name = "Enter your full name"
    if (!/^\+?[\d\s-]{8,15}$/.test(f.phone.trim())) e.phone = "Enter a valid phone number"
    if (f.address.trim().length < 5) e.address = "Enter your street address"
    if (!f.city.trim()) e.city = "Enter your city / area"
    if (!f.emirate) e.emirate = "Select an emirate"
    if (payment === "card") {
      if (f.card.replace(/\s/g, "").length !== 16) e.card = "Card number must be 16 digits"
      const [mm, yy] = f.expiry.split("/").map(Number)
      if (!mm || !yy || mm > 12 || mm < 1) e.expiry = "Use MM/YY"
      if (!/^\d{3,4}$/.test(f.cvc)) e.cvc = "3–4 digits"
    }
    setErrors(e)
    return Object.keys(e).length === 0
  }

  const submit = (ev: FormEvent) => {
    ev.preventDefault()
    if (!validate()) {
      document.querySelector<HTMLElement>("[aria-invalid=true]")?.focus()
      return
    }
    setSubmitting(true)
    // Simulated payment round-trip — this build has no backend.
    setTimeout(() => {
      const order: Order = {
        id: `MD${Date.now().toString().slice(-7)}`,
        date: new Date().toISOString(),
        lines: lines.map((l) => ({
          handle: l.handle,
          variantId: l.variantId,
          quantity: l.quantity,
          title: l.product.title,
          variantTitle: l.variant.title,
          price: l.variant.price,
          image: l.product.images[0],
        })),
        subtotal,
        discount: discountAmount,
        total,
        shipping: { name: f.name, email: f.email, phone: f.phone, address: f.address, city: f.city, emirate: f.emirate },
        payment: payment === "card" ? `Card ending ${f.card.replace(/\s/g, "").slice(-4)}` : "Cash on delivery",
        status: "Processing",
      }
      addOrder(order)
      setPlacedId(order.id)
      navigate(`/order/${order.id}`, { replace: true })
      // Clear after navigating so the empty-cart state never flashes.
      queueMicrotask(clear)
    }, 1200)
  }

  const field = (k: keyof Fields, label: string, props: React.ComponentProps<typeof Input> = {}) => (
    <div className="space-y-1.5">
      <Label htmlFor={k}>{label}</Label>
      <Input
        id={k}
        value={f[k]}
        onChange={(e) => set(k)(e.target.value)}
        aria-invalid={!!errors[k]}
        className="h-11"
        {...props}
      />
      {errors[k] && <p className="text-xs text-destructive">{errors[k]}</p>}
    </div>
  )

  return (
    <div className="mx-auto grid max-w-6xl gap-10 px-4 py-12 lg:grid-cols-[1fr_400px]">
      <Seo title="Checkout" description="Secure checkout with free UAE delivery." noindex />
      <form onSubmit={submit} noValidate className="space-y-10">
        <div>
          <h1 className="text-4xl font-semibold text-wine">Checkout</h1>
          {!user && (
            <p className="mt-2 text-sm text-muted-foreground">
              Have an account?{" "}
              <Link to="/account?redirect=/checkout" className="font-medium text-wine underline">
                Log in
              </Link>
            </p>
          )}
        </div>

        <fieldset className="space-y-4">
          <legend className="mb-4 font-heading text-2xl text-wine">Contact</legend>
          {field("email", "Email", { type: "email", autoComplete: "email" })}
        </fieldset>

        <fieldset className="space-y-4">
          <legend className="mb-4 font-heading text-2xl text-wine">Delivery</legend>
          <div className="grid gap-4 sm:grid-cols-2">
            {field("name", "Full name", { autoComplete: "name" })}
            {field("phone", "Phone", { type: "tel", autoComplete: "tel", placeholder: "+971 5X XXX XXXX" })}
          </div>
          {field("address", "Address", { autoComplete: "street-address", placeholder: "Building, street, apartment" })}
          <div className="grid gap-4 sm:grid-cols-2">
            {field("city", "City / Area", { autoComplete: "address-level2" })}
            <div className="space-y-1.5">
              <Label htmlFor="emirate">Emirate</Label>
              <Select value={f.emirate} onValueChange={set("emirate")}>
                <SelectTrigger id="emirate" aria-invalid={!!errors.emirate} className="h-11! w-full">
                  <SelectValue placeholder="Select emirate" />
                </SelectTrigger>
                <SelectContent>
                  {emirates.map((e) => (
                    <SelectItem key={e} value={e}>
                      {e}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.emirate && <p className="text-xs text-destructive">{errors.emirate}</p>}
            </div>
          </div>
          <p className="rounded-md bg-wine-50 px-4 py-3 text-sm text-wine">
            Free tracked shipping via Aramex · usually delivered within 2 days.
          </p>
        </fieldset>

        <fieldset className="space-y-4">
          <legend className="mb-4 font-heading text-2xl text-wine">Payment</legend>
          <RadioGroup value={payment} onValueChange={(v) => setPayment(v as "card" | "cod")} className="gap-0 overflow-hidden rounded-xl border">
            <Label
              htmlFor="pay-card"
              className={cn("flex cursor-pointer items-center gap-3 border-b p-4", payment === "card" && "bg-wine-50")}
            >
              <RadioGroupItem id="pay-card" value="card" />
              <CreditCard className="size-4" /> Credit / debit card
              <span className="ml-auto text-xs text-muted-foreground">via Stripe</span>
            </Label>
            {payment === "card" && (
              <div className="space-y-4 border-b bg-wine-50/40 p-4">
                {field("card", "Card number", {
                  inputMode: "numeric",
                  autoComplete: "cc-number",
                  placeholder: "4242 4242 4242 4242",
                  maxLength: 19,
                  onChange: (e) =>
                    set("card")(
                      e.target.value
                        .replace(/\D/g, "")
                        .slice(0, 16)
                        .replace(/(.{4})/g, "$1 ")
                        .trim(),
                    ),
                })}
                <div className="grid grid-cols-2 gap-4">
                  {field("expiry", "Expiry", {
                    placeholder: "MM/YY",
                    autoComplete: "cc-exp",
                    maxLength: 5,
                    onChange: (e) => {
                      const d = e.target.value.replace(/\D/g, "").slice(0, 4)
                      set("expiry")(d.length > 2 ? `${d.slice(0, 2)}/${d.slice(2)}` : d)
                    },
                  })}
                  {field("cvc", "CVC", {
                    inputMode: "numeric",
                    autoComplete: "cc-csc",
                    maxLength: 4,
                    onChange: (e) => set("cvc")(e.target.value.replace(/\D/g, "")),
                  })}
                </div>
                <p className="flex items-center gap-1.5 text-xs text-muted-foreground">
                  <Lock className="size-3" /> Demo checkout — no real payment is taken.
                </p>
              </div>
            )}
            <Label htmlFor="pay-cod" className={cn("flex cursor-pointer items-center gap-3 p-4", payment === "cod" && "bg-wine-50")}>
              <RadioGroupItem id="pay-cod" value="cod" />
              <Banknote className="size-4" /> Cash on delivery
            </Label>
          </RadioGroup>
        </fieldset>

        <Button type="submit" size="lg" disabled={submitting} className="h-13 w-full rounded-full text-sm tracking-widest uppercase">
          {submitting ? (
            <>
              <Loader2 className="animate-spin" /> Placing order…
            </>
          ) : (
            `Place order · ${formatAED(total)}`
          )}
        </Button>
      </form>

      <aside className="h-fit space-y-4 rounded-2xl bg-wine-50 p-6 lg:sticky lg:top-28">
        <h2 className="text-2xl font-semibold text-wine">Order summary</h2>
        <ul className="space-y-4">
          {lines.map((l) => (
            <li key={l.variantId} className="flex items-center gap-3">
              <div className="relative">
                <img src={thumb(l.product.images[0])} alt="" className="size-16 rounded-lg bg-white object-cover" />
                <span className="absolute -top-2 -right-2 grid size-5 place-items-center rounded-full bg-wine text-[10px] font-bold text-white">
                  {l.quantity}
                </span>
              </div>
              <div className="min-w-0 flex-1">
                <p className="line-clamp-2 text-sm font-medium">{l.product.title}</p>
                {l.product.variants.length > 1 && <p className="text-xs text-muted-foreground">{l.variant.title}</p>}
              </div>
              <p className="text-sm font-medium">{formatAED(l.lineTotal)}</p>
            </li>
          ))}
        </ul>
        <Separator />
        <DiscountForm />
        <Separator />
        <div className="space-y-1.5 text-sm">
          <div className="flex justify-between">
            <span>Subtotal</span>
            <span>{formatAED(subtotal)}</span>
          </div>
          {discountAmount > 0 && (
            <div className="flex justify-between text-success">
              <span>Discount ({discountCode})</span>
              <span>−{formatAED(discountAmount)}</span>
            </div>
          )}
          <div className="flex justify-between">
            <span>Shipping</span>
            <span className="text-success">Free</span>
          </div>
          <div className="flex justify-between pt-2 text-lg font-semibold">
            <span>Total</span>
            <span>{formatAED(total)}</span>
          </div>
          <p className="text-xs text-muted-foreground">Including VAT & duties</p>
        </div>
      </aside>
    </div>
  )
}
