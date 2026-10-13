import { useMemo, useState } from "react"
import { Link } from "react-router-dom"
import { Search } from "lucide-react"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { PageHero } from "@/components/PageHero"
import { faqs } from "@/data/content"
import { Seo } from "@/components/Seo"
import { breadcrumbSchema, faqSchema } from "@/lib/schema"

export default function Faqs() {
  const [q, setQ] = useState("")
  const filtered = useMemo(() => {
    const term = q.trim().toLowerCase()
    if (!term) return faqs
    return faqs
      .map((s) => ({ ...s, items: s.items.filter((f) => `${f.q} ${f.a}`.toLowerCase().includes(term)) }))
      .filter((s) => s.items.length)
  }, [q])

  return (
    <>
      <Seo title="Skincare FAQs — AM vs PM Essence, UAE Delivery & More" description="Answers on Moondune's Sunrise (AM) and Sunset (PM) essences, which to start with, barrier care in UAE heat, layering under sunscreen, delivery times and policies." jsonLd={[faqSchema(), breadcrumbSchema([{ name: "Home", path: "/" }, { name: "FAQs", path: "/faqs" }])]} />
      <PageHero title="Frequently asked questions" />
      <section className="mx-auto max-w-3xl px-4 py-16">
        <div className="relative mb-10">
          <Search className="absolute top-1/2 left-4 size-4 -translate-y-1/2 text-muted-foreground" />
          <Input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search questions…" className="h-12 rounded-full pl-11" />
        </div>
        {filtered.length === 0 && (
          <p className="text-center text-muted-foreground">No questions match “{q}”.</p>
        )}
        {filtered.map((s) => (
          <div key={s.section} className="mb-10">
            <h2 className="mb-2 text-3xl font-semibold text-wine">{s.section}</h2>
            <Accordion type="single" collapsible>
              {s.items.map((f) => (
                <AccordionItem key={f.q} value={f.q}>
                  <AccordionTrigger className="text-left text-[15px]">{f.q}</AccordionTrigger>
                  <AccordionContent className="leading-relaxed text-muted-foreground">
                    {f.a}
                    {f.q.includes("privacy") && (
                      <>
                        {" "}
                        <Link to="/policies/privacy-policy" className="font-medium text-wine underline">
                          Privacy Policy
                        </Link>
                      </>
                    )}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        ))}
        <div className="rounded-2xl bg-wine-50 p-8 text-center">
          <p className="font-heading text-2xl text-wine">Still have questions?</p>
          <Button asChild className="mt-4 rounded-full px-8">
            <Link to="/contact">Contact us</Link>
          </Button>
        </div>
      </section>
    </>
  )
}
