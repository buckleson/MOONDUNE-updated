import { useState } from "react"
import { ArrowRight, Award, Banknote, FileCheck2, Leaf, Thermometer, Truck } from "lucide-react"
import { BentoGrid, BentoTile } from "@/components/ui/bento"
import { LabReportDialog } from "@/components/home/LabReports"
import { Reveal } from "@/components/Reveal"
import { labReports, type LabReport } from "@/data/content"

/** Proof at a glance: every tile is one tap to the detail behind it. Static chips replace the old lab-report marquee. */
export function ProofBento() {
  const [active, setActive] = useState<LabReport | null>(null)

  return (
    <section aria-labelledby="proof-h" className="py-20">
      <div className="mx-auto max-w-7xl px-4">
        <div className="mx-auto max-w-3xl text-center">
          <h2 id="proof-h" className="text-[clamp(30px,4.4vw,46px)] leading-tight font-semibold text-wine">
            Created for the Climate.
            <br />
            Tested by Science.
          </h2>
          <p className="mt-3 text-muted-foreground">Evaluated in an independent lab in South Korea.</p>
        </div>

        <Reveal className="mt-10">
          <BentoGrid>
            <BentoTile href="#why-uae" className="justify-between bg-wine text-white ring-wine sm:col-span-2 lg:row-span-2">
              <Thermometer className="size-8 text-gold" strokeWidth={1.5} />
              <div>
                <p className="font-heading text-[clamp(28px,3.4vw,40px)] leading-[1.05] font-semibold text-balance">
                  Made for 45°C heat and all-day AC
                </p>
                <p className="mt-3 max-w-sm text-sm leading-relaxed text-white/80">
                  Lightweight, barrier-first essences, stability-tested at high heat similar to the Middle East.
                </p>
                <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-gold transition-transform group-hover/tile:translate-x-0.5">
                  Why UAE skin is different <ArrowRight className="size-4" />
                </span>
              </div>
            </BentoTile>

            <BentoTile className="gap-4 sm:col-span-2">
              <p className="flex items-center gap-2 text-sm font-semibold text-wine">
                <FileCheck2 className="size-4" /> {labReports.length} independent lab reports · tap to read
              </p>
              <ul className="flex flex-wrap gap-2">
                {labReports.map((r) => (
                  <li key={r.id}>
                    <button
                      onClick={() => setActive(r)}
                      className="inline-flex min-h-10 items-center gap-1.5 rounded-full bg-white px-4 text-sm font-medium text-wine ring-1 ring-wine/15 transition duration-200 ease-(--ease-out) hover:bg-wine hover:text-white active:scale-[.98]"
                    >
                      {r.title}
                    </button>
                  </li>
                ))}
              </ul>
            </BentoTile>

            <BentoTile href="#press" className="justify-between gap-4">
              <Award className="size-7 text-wine-2" strokeWidth={1.5} />
              <div>
                <p className="font-heading text-2xl leading-tight font-semibold text-wine">Beautyworld Awards 2026 finalist</p>
                <p className="mt-1 text-sm text-muted-foreground">Innovative Packaging, Middle East</p>
              </div>
            </BentoTile>

            <BentoTile to="/policies/shipping-and-returns" className="justify-between gap-4">
              <div className="flex gap-2 text-wine-2">
                <Truck className="size-7" strokeWidth={1.5} />
                <Banknote className="size-7" strokeWidth={1.5} />
              </div>
              <div>
                <p className="font-heading text-2xl leading-tight font-semibold text-wine">Free 2-day delivery, pay on arrival</p>
                <p className="mt-1 text-sm text-muted-foreground">Tracked Aramex · cash on delivery · VAT included</p>
              </div>
            </BentoTile>

            <BentoTile to="/ingredients" className="items-start gap-3 sm:col-span-2 lg:col-span-4 lg:flex-row lg:items-center">
              <Leaf className="size-7 shrink-0 text-wine-2" strokeWidth={1.5} />
              <p className="flex-1 font-heading text-2xl leading-tight font-semibold text-wine">
                Dates, coffee and honey, with Korean ferments and ceramides
              </p>
              <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-wine transition-transform group-hover/tile:translate-x-0.5">
                Explore the ingredients <ArrowRight className="size-4" />
              </span>
            </BentoTile>
          </BentoGrid>
        </Reveal>
      </div>

      <LabReportDialog report={active} onClose={() => setActive(null)} />
    </section>
  )
}
