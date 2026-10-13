import { useEffect } from "react"
import { Link, useLocation } from "react-router-dom"
import { Check } from "lucide-react"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Button } from "@/components/ui/button"
import { PageHero } from "@/components/PageHero"
import { activeGroups, ingredients } from "@/data/content"
import { cn } from "@/lib/utils"
import { Seo } from "@/components/Seo"

export default function Ingredients() {
  const { hash } = useLocation()

  useEffect(() => {
    if (!hash) return
    const el = document.getElementById(hash.slice(1))
    if (el) setTimeout(() => el.scrollIntoView({ behavior: "smooth", block: "center" }), 50)
  }, [hash])

  return (
    <>
      <Seo title="Ingredients — Dates, Coffee, Honey & Korean Bio-Science Actives" description="Every Moondune active explained: dates, coffee and honey alongside centella culture, bifida ferment lysate, ceramides, beta-glucan and multi-molecular hyaluronic acid — and what each does for skin in UAE climate." />
      <PageHero
        title="Born of resilience"
        subtitle="Ingredients that survive the harshest landscapes, chosen to protect skin living in one."
      />

      <section className="mx-auto max-w-6xl space-y-20 px-4 py-20">
        {ingredients.map((ing, i) => (
          <article
            id={ing.id}
            key={ing.id}
            className={cn(
              "grid scroll-mt-28 items-center gap-10 rounded-2xl md:grid-cols-2",
              hash === `#${ing.id}` && "ring-2 ring-gold ring-offset-8",
            )}
          >
            <img
              src={ing.image}
              alt={ing.name}
              loading="lazy"
              className={cn("aspect-[4/3] w-full rounded-2xl object-cover", i % 2 === 1 && "md:order-2")}
            />
            <div className="space-y-4">
              <p className="text-xs font-semibold tracking-[0.2em] text-wine-2 uppercase">{ing.origin}</p>
              <h2 className="text-[clamp(30px,4vw,44px)] leading-tight font-semibold text-wine">{ing.name}</h2>
              <p className="leading-relaxed text-muted-foreground">{ing.description}</p>
              <p className="font-heading text-xl text-wine">What it does</p>
              <ul className="space-y-2">
                {ing.benefits.map((b) => (
                  <li key={b} className="flex items-center gap-2 text-sm">
                    <Check className="size-4 text-wine" /> {b}
                  </li>
                ))}
              </ul>
            </div>
          </article>
        ))}
      </section>

      <section className="bg-wine-50 py-20">
        <div className="mx-auto max-w-3xl px-4">
          <p className="text-center text-xs font-semibold tracking-[0.2em] text-wine-2 uppercase">Formulated in Korean labs</p>
          <h2 className="mt-2 text-center text-[clamp(30px,4vw,44px)] font-semibold text-wine">Advanced skin science</h2>
          <Accordion type="multiple" defaultValue={[activeGroups[0].group]} className="mt-10 rounded-2xl bg-white px-6">
            {activeGroups.map((g) => (
              <AccordionItem key={g.group} value={g.group}>
                <AccordionTrigger className="text-base">{g.group}</AccordionTrigger>
                <AccordionContent>
                  <div className="flex flex-wrap gap-2">
                    {g.items.map((item) => (
                      <span key={item} className="rounded-full bg-wine-50 px-3 py-1.5 text-sm text-wine">
                        {item}
                      </span>
                    ))}
                  </div>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
          <div className="mt-10 text-center">
            <Button asChild size="lg" className="h-12 rounded-full px-8 text-xs tracking-widest uppercase">
              <Link to="/shop">Find your essence</Link>
            </Button>
          </div>
        </div>
      </section>
    </>
  )
}
