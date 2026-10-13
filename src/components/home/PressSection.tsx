import { useState } from "react"
import { ArrowUpRight, Play } from "lucide-react"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { SectionHeading } from "@/components/SectionHeading"
import { contact, press, type PressItem } from "@/data/content"

export function PressSection() {
  const [active, setActive] = useState<PressItem | null>(null)

  return (
    <section id="press" className="scroll-mt-24 bg-cream py-20">
      <div className="mx-auto max-w-7xl px-4">
        <SectionHeading title="In the Press" />
        <Carousel opts={{ align: "start" }} className="mt-10 px-1 md:px-12">
          <CarouselContent className="-ml-5">
            {press.map((p) => (
              <CarouselItem key={p.outlet} className="basis-[85%] pl-5 sm:basis-1/2 lg:basis-1/3">
                <button
                  onClick={() => setActive(p)}
                  className="group flex h-full w-full flex-col overflow-hidden rounded-2xl bg-white text-left shadow-[0_8px_30px_rgba(58,23,45,0.08)] transition hover:-translate-y-1 hover:shadow-[0_14px_40px_rgba(58,23,45,0.14)]"
                >
                  <div className="relative aspect-[4/3] overflow-hidden bg-wine-50">
                    <img
                      src={p.image}
                      alt={p.outlet}
                      loading="lazy"
                      className="size-full object-cover transition duration-500 group-hover:scale-105"
                    />
                    {p.vertical && (
                      <span className="absolute inset-0 grid place-items-center">
                        <span className="grid size-14 place-items-center rounded-full bg-white/90 text-wine shadow">
                          <Play className="size-6 fill-wine" />
                        </span>
                      </span>
                    )}
                  </div>
                  <div className="flex flex-1 flex-col gap-2 p-6">
                    <p className="text-xs font-semibold tracking-[0.2em] text-wine-2 uppercase">{p.outlet}</p>
                    <h3 className="text-2xl leading-snug font-semibold text-wine">{p.headline}</h3>
                    <p className="text-sm text-muted-foreground">{p.text}</p>
                    <span className="mt-auto flex items-center gap-1 pt-2 text-sm font-medium text-wine">
                      Read more <ArrowUpRight className="size-4 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </span>
                  </div>
                </button>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="hidden md:inline-flex" />
          <CarouselNext className="hidden md:inline-flex" />
        </Carousel>
      </div>

      <Dialog open={!!active} onOpenChange={(o) => !o && setActive(null)}>
        <DialogContent className="sm:max-w-lg">
          {active && (
            <>
              <img src={active.image} alt={active.outlet} className="max-h-72 w-full rounded-lg object-cover" />
              <DialogHeader>
                <p className="text-xs font-semibold tracking-[0.2em] text-wine-2 uppercase">{active.outlet}</p>
                <DialogTitle className="font-heading text-3xl text-wine">{active.headline}</DialogTitle>
                <DialogDescription className="text-sm leading-relaxed">{active.body}</DialogDescription>
              </DialogHeader>
              <Button asChild className="rounded-full">
                {active.url ? (
                  <a href={active.url} target="_blank" rel="noopener">
                    Read the article on {active.outlet} <ArrowUpRight />
                  </a>
                ) : (
                  <a href={contact.instagram} target="_blank" rel="noreferrer">
                    Follow the story on Instagram <ArrowUpRight />
                  </a>
                )}
              </Button>
            </>
          )}
        </DialogContent>
      </Dialog>
    </section>
  )
}

/** Compact "as featured in" proof strip placed directly under the hero. */
export function FeaturedStrip() {
  return (
    <section aria-label="As featured in" className="border-b bg-white">
      <div className="mx-auto flex max-w-7xl flex-col items-center gap-x-10 gap-y-3 px-4 py-6 md:flex-row md:justify-center">
        <p className="text-xs text-muted-foreground">As featured in</p>
        <ul className="flex flex-wrap items-center justify-center gap-x-8 gap-y-2">
          {press
            .filter((p) => p.outlet !== "Reel")
            .map((p) => (
              <li key={p.outlet}>
                <a href="#press" className="font-heading text-xl font-semibold text-wine/80 transition hover:text-wine md:text-2xl">
                  {p.outlet}
                </a>
              </li>
            ))}
        </ul>
      </div>
    </section>
  )
}
