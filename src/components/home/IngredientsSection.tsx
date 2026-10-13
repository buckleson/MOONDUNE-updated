import { useState } from "react"
import { Link } from "react-router-dom"
import { Check } from "lucide-react"
import { ingredients } from "@/data/content"
import { cn } from "@/lib/utils"

export function IngredientsSection() {
  const [activeId, setActiveId] = useState(ingredients[0].id)
  const active = ingredients.find((i) => i.id === activeId)!

  return (
    <section className="relative overflow-hidden bg-wine py-20 text-white">
      {ingredients.map((i) => (
        <img loading="lazy"
          key={i.id}
          src={i.image}
          alt=""
          aria-hidden
          className={cn(
            "absolute inset-0 size-full object-cover transition-opacity duration-700",
            i.id === activeId ? "opacity-35" : "opacity-0",
          )}
        />
      ))}
      <div className="absolute inset-0 bg-gradient-to-r from-wine via-wine/85 to-wine/40" />

      <div className="relative mx-auto max-w-7xl px-4">
        <h2 className="max-w-3xl text-[clamp(28px,4vw,44px)] leading-tight font-semibold">
          <span className="text-gold">ARABIC</span> botanicals, made stronger with{" "}
          <span className="text-gold">KOREAN</span> bio-science
        </h2>

        <div role="tablist" aria-label="Ingredients" className="mt-8 flex flex-wrap gap-2">
          {ingredients.map((i) => (
            <button
              key={i.id}
              role="tab"
              aria-selected={i.id === activeId}
              onClick={() => setActiveId(i.id)}
              className={cn(
                "rounded-full border px-4 py-2 text-sm font-medium transition",
                i.id === activeId ? "border-gold bg-gold text-wine" : "border-white/40 hover:border-gold hover:text-gold",
              )}
            >
              {i.name}
            </button>
          ))}
        </div>

        <div key={active.id} role="tabpanel" className="animate-in fade-in slide-in-from-bottom-2 mt-10 grid gap-10 duration-500 md:grid-cols-2">
          <div className="space-y-4">
            <p className="text-xs font-semibold tracking-[0.2em] text-gold uppercase">{active.origin}</p>
            <h3 className="text-5xl font-semibold">{active.name}</h3>
            <p className="max-w-lg leading-relaxed text-white/90">{active.description}</p>
            <Link to={`/ingredients#${active.id}`} className="inline-block text-sm font-medium text-gold underline underline-offset-4">
              Explore all ingredients
            </Link>
          </div>
          <div className="self-end rounded-2xl border border-white/15 bg-white/10 p-6 backdrop-blur">
            <p className="mb-4 font-heading text-2xl text-gold">What it does</p>
            <ul className="space-y-3">
              {active.benefits.map((b) => (
                <li key={b} className="flex items-center gap-3">
                  <span className="grid size-6 place-items-center rounded-full bg-gold text-wine">
                    <Check className="size-3.5" />
                  </span>
                  {b}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}
