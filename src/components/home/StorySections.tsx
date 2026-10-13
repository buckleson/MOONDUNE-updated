import { useEffect, useRef, useState } from "react"
import { Link } from "react-router-dom"
import { Volume2, VolumeX } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { asset } from "@/lib/asset"

function LoopVideo({ src, label }: { src: string; label: string }) {
  const ref = useRef<HTMLVideoElement>(null)
  const [muted, setMuted] = useState(true)
  const [near, setNear] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const io = new IntersectionObserver(([e]) => e.isIntersecting && setNear(true), { rootMargin: "400px" })
    io.observe(el)
    return () => io.disconnect()
  }, [])
  return (
    <div className="group relative aspect-[9/14] overflow-hidden rounded-2xl bg-wine sm:aspect-[3/4]">
      <video ref={ref} src={near ? src : undefined} preload="none" autoPlay muted loop playsInline aria-label={label} className="size-full object-cover" />
      <button
        aria-label={muted ? "Unmute video" : "Mute video"}
        onClick={() => {
          if (!ref.current) return
          ref.current.muted = !muted
          setMuted(!muted)
        }}
        className="absolute right-3 bottom-3 grid size-10 place-items-center rounded-full bg-white/85 text-wine shadow transition hover:bg-white"
      >
        {muted ? <VolumeX className="size-4" /> : <Volume2 className="size-4" />}
      </button>
    </div>
  )
}

export function BehindTheScenes() {
  return (
    <section className="py-20">
      <div className="mx-auto grid max-w-7xl items-center gap-10 px-4 lg:grid-cols-[1fr_1.4fr]">
        <div className="space-y-4">
          <p className="text-xs font-semibold tracking-[0.2em] text-wine-2 uppercase">From Seoul, with care</p>
          <h2 className="text-[clamp(30px,4.4vw,46px)] leading-tight font-semibold text-wine">Go behind the scenes with us!</h2>
          <p className="text-muted-foreground">Our production line in Seoul, South Korea — first batch manufacturing!</p>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <LoopVideo src={asset("/videos/bts-1.mp4")} label="Production line in Seoul" />
          <LoopVideo src={asset("/videos/bts-2.mp4")} label="First batch manufacturing" />
        </div>
      </div>
    </section>
  )
}

export function OurStory() {
  return (
    <section className="bg-wine-50 py-20">
      <div className="mx-auto grid max-w-7xl items-center gap-10 px-4 md:grid-cols-2">
        <img
          src={asset("/images/site/moondune-hero-3.webp")}
          alt="Moondune essences in the desert"
          loading="lazy"
          className="aspect-[4/3] w-full rounded-2xl object-cover"
        />
        <div className="space-y-4">
          <p className="text-xs font-semibold tracking-[0.2em] text-wine-2 uppercase">Our Story</p>
          <h2 className="text-[clamp(30px,4.4vw,46px)] leading-tight font-semibold text-wine">Climate and curiosity led us here</h2>
          <p className="leading-relaxed text-muted-foreground">
            Understanding why skin behaves differently in the UAE and what it truly needs to feel balanced again. From regional
            inspiration to Korean laboratories, every step shaped what Moondune is today.
          </p>
          <Button asChild size="lg" className="h-12 rounded-full px-8 text-xs tracking-widest uppercase">
            <Link to="/about">Read our story</Link>
          </Button>
        </div>
      </div>
    </section>
  )
}

export function DesertAlchemyBanner({ className }: { className?: string }) {
  return (
    <section className={cn("relative overflow-hidden", className)}>
      <img src={asset("/images/site/bannerbg_final.webp")} alt="" aria-hidden loading="lazy" className="absolute inset-0 size-full object-cover" />
      <div className="absolute inset-0 bg-wine/55" />
      <div className="relative mx-auto flex max-w-4xl flex-col items-center gap-3 px-4 py-24 text-center text-white">
        <p className="font-heading text-2xl tracking-[0.3em] text-gold">moondune</p>
        <h2 className="text-[clamp(34px,6vw,64px)] leading-tight font-semibold">Desert Alchemy — Redefined</h2>
        <p className="font-heading text-xl italic opacity-90 md:text-2xl">
          Arabic beauty,
          <br />
          Made for skin without borders
        </p>
        <Button asChild variant="secondary" size="lg" className="mt-4 h-12 rounded-full bg-white px-8 text-xs tracking-widest text-wine uppercase hover:bg-gold">
          <Link to="/shop">Discover the ritual</Link>
        </Button>
      </div>
    </section>
  )
}
