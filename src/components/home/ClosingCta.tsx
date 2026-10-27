import { Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Reveal } from "@/components/Reveal"
import { useCart } from "@/context/CartContext"
import { formatAED, getProduct } from "@/data/products"
import { useAddedFeedback } from "@/hooks/useAddedFeedback"
import { thumb } from "@/lib/asset"

/** Last call on Home, for visitors who read all the way down: the full routine in one tap. */
export function ClosingCta() {
  const { addItem } = useCart()
  const [added, flashAdded] = useAddedFeedback()
  const combo = getProduct("am-to-pm-combo")!
  const v = combo.variants[0]

  return (
    <section aria-labelledby="closing-h" className="bg-wine-50 px-4 py-16">
      <Reveal className="mx-auto flex max-w-4xl flex-col items-center gap-8 rounded-3xl bg-white p-6 shadow-[0_30px_60px_-40px_rgba(58,23,45,.45)] ring-1 ring-border sm:flex-row sm:p-8">
        <img
          src={thumb(combo.images[0])}
          alt={combo.title}
          loading="lazy"
          className="aspect-square w-40 shrink-0 rounded-2xl bg-wine-50 object-cover sm:w-44"
        />
        <div className="flex-1 text-center sm:text-left">
          <h2 id="closing-h" className="text-[clamp(28px,3.6vw,38px)] leading-tight font-semibold text-wine">
            Two bottles. Your whole routine.
          </h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Sunrise for the morning, Sunset for the night, plus a free gift worth 50 AED. Free 2-day UAE delivery, cash on
            delivery available.
          </p>
          <div className="mt-5 flex flex-wrap items-center justify-center gap-3 sm:justify-start">
            <Button
              variant="gold"
              size="cta"
              onClick={() => {
                addItem(combo.handle, v.id)
                flashAdded()
              }}
            >
              {added ? (
                <>
                  <Check /> Added to cart
                </>
              ) : (
                <>
                  Add the combo · <span className="tabular-nums">{formatAED(v.price)}</span>
                </>
              )}
            </Button>
            {v.compareAt && <s className="text-sm text-muted-foreground">{formatAED(v.compareAt)}</s>}
            <a href="#routine-finder" className="text-sm font-medium text-wine underline underline-offset-4 hover:text-wine-2">
              Not sure? Find your match
            </a>
          </div>
        </div>
      </Reveal>
    </section>
  )
}
