import { Link } from "react-router-dom"
import { Droplets, FlaskConical, Leaf, Shield, Sun, Thermometer, Waves, Wind } from "lucide-react"
import { Button } from "@/components/ui/button"
import { PageHero } from "@/components/PageHero"
import { DesertAlchemyBanner } from "@/components/home/StorySections"
import { asset } from "@/lib/asset"
import { Seo } from "@/components/Seo"
import { organizationSchema } from "@/lib/schema"

const pillars = [
  { icon: Shield, title: "Barrier-first", text: "We strengthen and protect the skin barrier before anything else." },
  { icon: Sun, title: "Climate-intelligent", text: "Designed for UAE heat, humidity, sun and AC-dry indoor air." },
  { icon: FlaskConical, title: "Korean bioscience", text: "Multi-molecular actives that absorb quickly and penetrate deeper." },
  { icon: Leaf, title: "Arabic botanicals", text: "Resilient desert ingredients — dates, coffee and honey — at the core." },
]

const climate = [
  { icon: Waves, title: "Humidity", text: "Skincare that holds up to sweat." },
  { icon: Wind, title: "Dry air", text: "A fast-absorbing formula that hydrates the deeper layers." },
  { icon: Thermometer, title: "Hot climate", text: "Heat-stability tested, with smaller molecules that penetrate further." },
  { icon: Droplets, title: "Mineral-rich water", text: "Barrier-supporting formulas for every face wash." },
]

const building = [
  {
    title: "The name",
    text: "Inspired by early dune dwellers who worshipped the moon and lived nomadically. Modern life is its own kind of nomadism — constant adaptation.",
  },
  {
    title: "The colour",
    text: "Purple, after the regional tradition of welcoming guests on purple carpets. This is your skin's home, and you are welcome here.",
  },
  {
    title: "The philosophy",
    text: "Desert Arabic ingredients are the definition of resilience — we bring that self-strengthening idea to barrier-first skincare.",
  },
  {
    title: "Made in South Korea",
    text: "Expert labs developed Middle East-specific formulas with Arabic-origin ingredients and bio-scientific actives, tested under high heat.",
  },
]

export default function About() {
  return (
    <>
      <Seo title="About Moondune — Climate-Intelligent Skincare from Abu Dhabi" description="Moondune was born in Masdar City, Abu Dhabi from one question: why does skin behave differently in the UAE? Arabic botanicals meet Korean bio-science in barrier-first skincare." jsonLd={[organizationSchema()]} />
      <PageHero title="Skincare that understands where you live" />

      <section className="mx-auto grid max-w-6xl items-center gap-12 px-4 py-20 md:grid-cols-2">
        <img loading="lazy" src={asset("/images/site/moondune-hero-3.webp")} alt="Moondune essences" className="aspect-[4/5] w-full rounded-2xl object-cover" />
        <div className="space-y-5">
          <p className="text-xs font-semibold tracking-[0.2em] text-wine-2 uppercase">It began with a question</p>
          <h2 className="text-[clamp(30px,4vw,44px)] leading-tight font-semibold text-wine">Why does skin behave differently here?</h2>
          <p className="leading-relaxed text-muted-foreground">
            After moving to the UAE, I kept hearing the same story from women around me — skin that had become dry, sensitive, or
            prone to unexplained breakouts.
          </p>
          <p className="leading-relaxed text-muted-foreground">
            The culprit was the climate: intense heat, humidity, strong sun, then cold air conditioning — swings that weaken the skin
            barrier over time. Yet most skincare is made for other climates.
          </p>
          <p className="leading-relaxed text-muted-foreground">
            Skincare should understand where you live. So we started with barrier health, using formulas inspired by desert
            resilience.
          </p>
        </div>
      </section>

      <section className="bg-wine-50 py-20">
        <div className="mx-auto max-w-6xl px-4">
          <h2 className="text-center text-[clamp(30px,4vw,44px)] font-semibold text-wine">Building with intention</h2>
          <div className="mt-12 grid gap-6 sm:grid-cols-2">
            {building.map((b, i) => (
              <div key={b.title} className="rounded-2xl bg-white p-8">
                <p className="font-heading text-5xl text-gold">0{i + 1}</p>
                <h3 className="mt-2 text-2xl font-semibold text-wine">{b.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{b.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="mx-auto max-w-6xl px-4">
          <h2 className="text-center text-[clamp(30px,4vw,44px)] font-semibold text-wine">What makes us different</h2>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {pillars.map(({ icon: Icon, title, text }) => (
              <div key={title} className="rounded-2xl border p-6 text-center transition hover:-translate-y-1 hover:shadow-lg">
                <span className="mx-auto grid size-14 place-items-center rounded-full bg-wine text-gold">
                  <Icon className="size-6" />
                </span>
                <h3 className="mt-4 text-2xl font-semibold text-wine">{title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-wine py-20 text-white">
        <div className="mx-auto max-w-6xl px-4">
          <h2 className="text-center text-[clamp(30px,4vw,44px)] font-semibold">Climate intelligent skincare: but why?</h2>
          <p className="mx-auto mt-3 max-w-2xl text-center text-white/80">
            Heat, intense UV, humidity swings and air conditioning can all stress the skin barrier.
          </p>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {climate.map(({ icon: Icon, title, text }) => (
              <div key={title} className="rounded-2xl border border-white/15 bg-white/5 p-6">
                <Icon className="size-7 text-gold" />
                <h3 className="mt-3 text-2xl font-semibold">{title}</h3>
                <p className="mt-1 text-sm text-white/80">{text}</p>
              </div>
            ))}
          </div>
          <div className="mt-12 text-center">
            <Button asChild size="lg" className="h-12 rounded-full bg-gold px-8 text-xs tracking-widest text-wine uppercase hover:bg-gold-2">
              <Link to="/shop">Shop the essentials</Link>
            </Button>
          </div>
        </div>
      </section>

      <DesertAlchemyBanner />
    </>
  )
}
