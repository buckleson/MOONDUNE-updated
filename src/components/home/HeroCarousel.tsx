import { forwardRef, useCallback, useEffect, useState } from "react"
import { ArrowDown, Award, Check, FlaskConical, Pause, Play, Truck, Wallet } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useCart } from "@/context/CartContext"
import { heroSlides } from "@/data/content"
import { formatAED, getProduct } from "@/data/products"
import { useAddedFeedback } from "@/hooks/useAddedFeedback"
import { cn } from "@/lib/utils"

const HERO_PRODUCT = "dates-honey-pm-essence"

export const proofPoints = [
  { icon: Award, text: "Beautyworld Awards 2026 finalist" },
  { icon: FlaskConical, text: "7 independent lab tests in Korea" },
  { icon: Truck, text: "Free 2-day UAE delivery" },
  { icon: Wallet, text: "Cash on delivery available" },
]

/** `ref` lands on the hero CTA row so a sticky bar can take over once it scrolls away. */
export const HeroCarousel = forwardRef<HTMLDivElement>(function HeroCarousel(_, ctaRef) {
  const [i, setI] = useState(0)
  const [paused, setPaused] = useState(false)
  const [hover, setHover] = useState(false)
  const { addItem } = useCart()
  const [added, flashAdded] = useAddedFeedback()
  const product = getProduct(HERO_PRODUCT)!
  const variant = product.variants[0]
  const n = heroSlides.length
  const go = useCallback((k: number) => setI(((k % n) + n) % n), [n])

  useEffect(() => {
    if (paused || hover) return
    const t = setInterval(() => setI((x) => (x + 1) % n), 7000)
    return () => clearInterval(t)
  }, [paused, hover, n, i])

  return (
    <>
      <section
        aria-label="Moondune — Korean skincare made for the UAE"
        className="relative isolate min-h-[min(88svh,760px)] w-full overflow-hidden bg-wine text-white"
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
      >
        {heroSlides.map((s, k) => (
          <picture
            key={s.title}
            aria-hidden
            className={cn("absolute inset-0 -z-10 transition-opacity duration-1000", k === i ? "opacity-100" : "opacity-0")}
          >
            <source media="(max-width:700px)" srcSet={s.mobile} />
            <img
              src={s.desktop}
              alt=""
              className={cn("size-full object-cover transition-transform duration-[8000ms] ease-out", k === i && "scale-105")}
              fetchPriority={k === 0 ? "high" : "low"}
              loading={k === 0 ? "eager" : "lazy"}
            />
          </picture>
        ))}
        <div className="absolute inset-0 -z-10 bg-[linear-gradient(to_top,rgba(26,9,20,.88)_0%,rgba(26,9,20,.55)_38%,transparent_70%)] lg:bg-[linear-gradient(to_right,rgba(26,9,20,.85)_0%,rgba(26,9,20,.5)_40%,transparent_68%)]" />

        <div className="mx-auto flex min-h-[inherit] max-w-7xl flex-col justify-end px-4 pt-24 pb-14 lg:justify-center lg:pb-24">
          <div className="max-w-xl">
            <h1 className="text-[clamp(40px,6vw,76px)] leading-[0.98] font-semibold tracking-[-0.01em] text-balance">
              Korean skincare, made for the UAE.
            </h1>
            <p className="mt-5 max-w-md text-[clamp(15px,1.6vw,18px)] leading-relaxed text-white/90">
              Barrier-first essences that hold up in 45°C heat and all-day AC. Arabic botanicals, Korean bio-science, one step
              morning and night.
            </p>
            <div ref={ctaRef} className="mt-8 flex items-center gap-2 sm:gap-3">
              <Button
                variant="gold"
                size="cta"
                onClick={() => {
                  addItem(product.handle, variant.id)
                  flashAdded()
                }}
                className="h-13 flex-1 gap-2 px-3.5 sm:flex-none sm:gap-2.5 sm:px-7"
              >
                {added ? (
                  <>
                    <Check className="size-4" /> Added to cart
                  </>
                ) : (
                  <>
                    <span className="sm:hidden">Add bestseller</span>
                    <span className="hidden sm:inline">Add bestseller PM Essence</span>
                    <span className="h-4 w-px bg-wine/30" />
                    <span className="tabular-nums">{formatAED(variant.price)}</span>
                  </>
                )}
              </Button>
              <a
                href="#routine-finder"
                className="inline-flex h-13 shrink-0 items-center justify-center gap-2 rounded-full px-3.5 text-sm font-semibold whitespace-nowrap text-white ring-1 ring-white/50 transition duration-200 ease-(--ease-out) hover:bg-white hover:text-wine active:scale-[.98] sm:px-6"
              >
                <span className="sm:hidden">Skin quiz</span>
                <span className="hidden sm:inline">Find my match</span>
                <ArrowDown className="size-4 max-sm:hidden" />
              </a>
            </div>
            {variant.compareAt && (
              <p className="mt-3 text-xs text-white/75">
                <s>{formatAED(variant.compareAt)}</s> · Save {formatAED(variant.compareAt - variant.price)} · VAT included
              </p>
            )}
          </div>

          <div className="mt-10 flex items-center gap-1">
            {heroSlides.map((s, k) => (
              <button
                key={s.title}
                aria-label={`Go to slide ${k + 1}`}
                aria-current={k === i}
                onClick={() => go(k)}
                className="group/dot grid h-6 min-w-6 place-items-center"
              >
                <span
                  className={cn(
                    "h-1.5 rounded-full bg-white/45 transition-all",
                    k === i ? "w-8 bg-white" : "w-3 group-hover/dot:bg-white/80",
                  )}
                />
              </button>
            ))}
            <button
              aria-label={paused ? "Play slideshow" : "Pause slideshow"}
              onClick={() => setPaused((p) => !p)}
              className="ml-2 grid size-7 place-items-center rounded-full text-white/80 hover:text-white"
            >
              {paused ? <Play className="size-3.5" /> : <Pause className="size-3.5" />}
            </button>
          </div>
        </div>
      </section>

      <div className="border-b bg-white">
        <ul
          aria-label="Why Moondune"
          className="mx-auto grid max-w-7xl grid-cols-2 gap-x-4 gap-y-3 px-4 py-4 text-[13px] font-medium text-wine lg:grid-cols-4 lg:py-5"
        >
          {proofPoints.map(({ icon: Icon, text }) => (
            <li key={text} className="flex items-center gap-2.5">
              <Icon className="size-4 shrink-0 text-wine-2" strokeWidth={1.75} />
              {text}
            </li>
          ))}
        </ul>
      </div>
    </>
  )
})
