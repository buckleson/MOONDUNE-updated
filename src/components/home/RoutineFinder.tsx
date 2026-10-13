import { useState } from "react"
import { Link } from "react-router-dom"
import { ArrowRight, Check, RotateCcw } from "lucide-react"
import { useCart } from "@/context/CartContext"
import { formatAED, getProduct } from "@/data/products"
import { cn } from "@/lib/utils"
import { thumb } from "@/lib/asset"

// Mapping follows the brand's own guidance in the FAQ ("Which product should I start with?").
const options = [
  {
    id: "dehydrated",
    label: "Dehydrated, or my makeup and sunscreen won't sit right",
    handle: "dates-coffee-am-essence",
    why: "Start with Sunrise. Lightweight, breathable hydration that layers cleanly under sunscreen in UAE heat.",
  },
  {
    id: "sensitive",
    label: "Sensitive, tired or easily irritated, especially after AC",
    handle: "dates-honey-pm-essence",
    why: "Start with Sunset. It repairs and strengthens the barrier overnight with ceramides, honey and beta-glucan.",
  },
  {
    id: "both",
    label: "I want one simple routine for morning and night",
    handle: "am-to-pm-combo",
    why: "The AM to PM Combo: two bottles replace your whole routine, and it costs less than buying them separately.",
  },
  {
    id: "inside",
    label: "Dull, and I forget to drink enough water",
    handle: "sip-and-glow-combo",
    why: "Sip and Glow: the AM Essence hydrates outside, the 1200ml tumbler keeps water ice-cold all day for the inside.",
  },
] as const

export function RoutineFinder() {
  const [pick, setPick] = useState<(typeof options)[number] | null>(null)
  const { addItem } = useCart()
  const product = pick ? getProduct(pick.handle) : undefined
  const variant = product?.variants[0]

  return (
    <section id="routine-finder" className="scroll-mt-24 bg-wine py-20 text-white">
      <div className="mx-auto grid max-w-7xl items-start gap-12 px-4 lg:grid-cols-[1fr_1.1fr]">
        <div>
          <h2 className="text-[clamp(32px,4.6vw,52px)] leading-[1.02] font-semibold text-balance">
            Not sure where to start? Tell us how your skin feels.
          </h2>
          <p className="mt-4 max-w-md text-white/80">One tap and you have your match. Every essence suits all skin types.</p>

          <fieldset className="mt-8 space-y-3">
            <legend className="sr-only">How does your skin feel most days?</legend>
            {options.map((o) => {
              const on = pick?.id === o.id
              return (
                <label
                  key={o.id}
                  className={cn(
                    "flex cursor-pointer items-center gap-4 rounded-xl px-5 py-4 text-[15px] ring-1 transition",
                    on ? "bg-white text-wine ring-white" : "ring-white/25 hover:bg-white/10 hover:ring-white/50",
                  )}
                >
                  <input type="radio" name="skin" className="sr-only" checked={on} onChange={() => setPick(o)} />
                  <span
                    className={cn(
                      "grid size-5 shrink-0 place-items-center rounded-full ring-1",
                      on ? "bg-wine text-white ring-wine" : "ring-white/60",
                    )}
                  >
                    {on && <Check className="size-3" />}
                  </span>
                  {o.label}
                </label>
              )
            })}
          </fieldset>
        </div>

        <div aria-live="polite" className="lg:pt-4">
          {product && variant && pick ? (
            <div className="overflow-hidden rounded-2xl bg-white text-ink shadow-[0_30px_60px_-30px_rgba(0,0,0,.5)]">
              <div className="grid sm:grid-cols-[200px_1fr]">
                <Link to={`/products/${product.handle}`} className="block bg-wine-50">
                  <img src={thumb(product.images[0])} alt={product.title} className="aspect-square size-full object-cover" loading="lazy" />
                </Link>
                <div className="flex flex-col gap-3 p-6">
                  <p className="text-xs font-medium text-success">Your match</p>
                  <h3 className="text-3xl leading-tight font-semibold text-wine">{product.shortTitle}</h3>
                  <p className="text-sm leading-relaxed text-ink/80">{pick.why}</p>
                  <p className="text-sm">
                    <span className="font-semibold">{formatAED(variant.price)}</span>
                    {variant.compareAt && <s className="ml-2 text-muted-foreground">{formatAED(variant.compareAt)}</s>}
                  </p>
                  <div className="mt-auto flex flex-wrap gap-2 pt-2">
                    <button
                      onClick={() => addItem(product.handle, variant.id)}
                      className="inline-flex h-11 items-center rounded-full bg-wine px-6 text-sm font-semibold text-white hover:bg-wine-2"
                    >
                      Add to cart
                    </button>
                    <Link
                      to={`/products/${product.handle}`}
                      className="inline-flex h-11 items-center gap-1 rounded-full px-4 text-sm font-medium text-wine hover:bg-wine-50"
                    >
                      Details <ArrowRight className="size-4" />
                    </Link>
                  </div>
                </div>
              </div>
              <button
                onClick={() => setPick(null)}
                className="flex w-full items-center justify-center gap-2 border-t py-3 text-xs text-muted-foreground hover:text-wine"
              >
                <RotateCcw className="size-3.5" /> Start over
              </button>
            </div>
          ) : (
            <div className="grid min-h-[280px] place-items-center rounded-2xl border border-dashed border-white/25 p-8 text-center text-white/70">
              <p className="max-w-xs font-heading text-2xl">Your match appears here, with a reason why it fits.</p>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
