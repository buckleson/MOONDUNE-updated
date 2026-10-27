import { Link } from "react-router-dom"

// Answer-first copy: written so search and AI engines can quote it directly.
const points = [
  {
    q: "Heat outside, AC inside",
    a: "Skin in the UAE swings between 45°C humidity and dry, air-conditioned rooms every day. That constant switch pulls water out of the skin and wears down its barrier.",
  },
  {
    q: "Formulas made for other climates",
    a: "Most skincare is formulated and tested for cooler, temperate weather. Heavy creams feel greasy in the heat, and some formulas lose stability when they're stored hot.",
  },
  {
    q: "What Moondune does differently",
    a: "Lightweight, barrier-first essences with ceramides, beta-glucan and multi-molecular hyaluronic acid, plus dates, coffee and honey. Stability is tested in an independent Korean lab, including at high heat similar to the Middle East.",
  },
]

export function ClimateExplainer() {
  return (
    <section id="why-uae" aria-labelledby="climate-h" className="scroll-mt-24 py-20">
      <div className="mx-auto grid max-w-7xl gap-12 px-4 lg:grid-cols-[1fr_1.2fr]">
        <div>
          <h2 id="climate-h" className="text-[clamp(30px,4.4vw,48px)] leading-[1.05] font-semibold text-balance text-wine">
            Why does skin behave differently in the UAE?
          </h2>
          <p className="mt-5 max-w-prose text-[17px] leading-relaxed text-ink/85">
            Climate, lifestyle and indoor environments affect hydration and weaken the skin barrier, so products designed for
            other regions often don't work the same way here. Moondune is climate-intelligent skincare made for that problem.
          </p>
          <figure className="mt-8 max-w-prose border-l border-gold pl-5">
            <blockquote className="font-heading text-2xl leading-snug text-wine italic">
              “A formula made in Italy, sold in a French pharmacy, and formulated for a woman living in dry, cold environments
              can't work here.”
            </blockquote>
            <figcaption className="mt-3 text-sm text-muted-foreground">
              Sruti Gudavalli, founder, in{" "}
              <a
                href="https://beautymatter.com/articles/the-end-of-one-size-fits-all-beauty-in-the-middle-east"
                target="_blank"
                rel="noopener"
                className="text-wine underline"
              >
                BeautyMatter
              </a>
            </figcaption>
          </figure>
        </div>
        <div>
          <dl className="divide-y divide-wine/15 border-y border-wine/15">
            {points.map((p) => (
              <div key={p.q} className="grid gap-2 py-6 sm:grid-cols-[180px_1fr] sm:gap-6">
                <dt className="font-heading text-xl font-semibold text-wine">{p.q}</dt>
                <dd className="text-[15px] leading-relaxed text-ink/80">{p.a}</dd>
              </div>
            ))}
          </dl>
          <Link to="/ingredients" className="mt-5 inline-block text-sm font-medium text-wine underline">
            See every active ingredient and what it does
          </Link>
        </div>
      </div>
    </section>
  )
}
