import { BadgeCheck, Star } from "lucide-react"
import { Link } from "react-router-dom"
import { getProduct } from "@/data/products"
import { REVIEWS_ARE_SAMPLES, ratingSummary, reviewsFor } from "@/data/reviews"
import { cn } from "@/lib/utils"

export function Stars({ value, className }: { value: number; className?: string }) {
  return (
    <span className={cn("inline-flex items-center gap-0.5 text-gold", className)} aria-label={`${value.toFixed(1)} out of 5 stars`} role="img">
      {[1, 2, 3, 4, 5].map((i) => (
        <Star key={i} className={cn("size-[1em]", i <= Math.round(value) ? "fill-current" : "fill-transparent opacity-40")} />
      ))}
    </span>
  )
}

/** Compact rating link shown beside a product title; scrolls to #reviews. */
export function RatingLink({ handle }: { handle: string }) {
  const { count, average } = ratingSummary(reviewsFor(handle))
  if (!count) return null
  return (
    <a href="#reviews" className="inline-flex w-fit items-center gap-2 text-sm text-wine hover:underline">
      <Stars value={average} className="text-base" />
      <span className="font-medium tabular-nums">{average.toFixed(1)}</span>
      <span className="text-muted-foreground">
        ({count} review{count > 1 && "s"})
      </span>
    </a>
  )
}

export function Reviews({ handle, title = "What UAE skin is saying" }: { handle?: string; title?: string }) {
  const list = reviewsFor(handle)
  const { count, average, distribution } = ratingSummary(list)
  if (!count) return null

  return (
    <section id="reviews" className="scroll-mt-28 bg-cream py-20">
      <div className="mx-auto grid max-w-7xl gap-12 px-4 lg:grid-cols-[280px_1fr]">
        <div className="lg:sticky lg:top-32 lg:self-start">
          <h2 className="text-[clamp(30px,4vw,44px)] leading-tight font-semibold text-wine">{title}</h2>
          <div className="mt-6 flex items-end gap-3">
            <span className="font-heading text-6xl leading-none font-semibold text-wine tabular-nums">{average.toFixed(1)}</span>
            <div className="pb-1">
              <Stars value={average} className="text-lg" />
              <p className="text-xs text-muted-foreground">
                Based on {count} review{count > 1 && "s"}
              </p>
            </div>
          </div>
          <ul className="mt-5 space-y-1.5" aria-label="Rating distribution">
            {distribution.map((d) => (
              <li key={d.star} className="flex items-center gap-2 text-xs text-muted-foreground">
                <span className="w-3 tabular-nums">{d.star}</span>
                <Star className="size-3 fill-gold text-gold" />
                <span className="h-1.5 flex-1 overflow-hidden rounded-full bg-wine/10">
                  <span className="block h-full rounded-full bg-wine" style={{ width: `${(d.count / count) * 100}%` }} />
                </span>
                <span className="w-4 text-right tabular-nums">{d.count}</span>
              </li>
            ))}
          </ul>
          {REVIEWS_ARE_SAMPLES && (
            <p className="mt-6 rounded-md border border-dashed border-wine/30 px-3 py-2 text-xs text-wine-2">
              Preview: sample reviews shown. Real customer reviews will appear here.
            </p>
          )}
        </div>

        <ul className="columns-1 gap-6 md:columns-2 [&>li]:mb-6 [&>li]:break-inside-avoid">
          {list.map((r) => {
            const product = getProduct(r.handle)
            return (
              <li key={r.id} className="rounded-2xl bg-white p-6 shadow-[0_8px_30px_-12px_rgba(58,23,45,0.18)]">
                <Stars value={r.rating} className="text-sm" />
                <h3 className="mt-3 font-sans text-base font-semibold text-ink">{r.title}</h3>
                <p className="mt-2 text-[15px] leading-relaxed text-ink/80">{r.body}</p>
                <div className="mt-4 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-muted-foreground">
                  <span className="font-medium text-wine">{r.author}</span>
                  <span>{r.city}</span>
                  {r.verified && (
                    <span className="inline-flex items-center gap-1 text-success">
                      <BadgeCheck className="size-3.5" /> Verified buyer
                    </span>
                  )}
                  {!handle && product && (
                    <Link to={`/products/${product.handle}`} className="underline hover:text-wine">
                      {product.shortTitle}
                    </Link>
                  )}
                </div>
              </li>
            )
          })}
        </ul>
      </div>
    </section>
  )
}
