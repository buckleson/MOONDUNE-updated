import { useEffect, useState } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { announcements } from "@/data/content"

export function AnnouncementBar() {
  const [i, setI] = useState(0)
  const [paused, setPaused] = useState(false)
  const n = announcements.length

  useEffect(() => {
    if (paused || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return
    const t = setInterval(() => setI((x) => (x + 1) % n), 4000)
    return () => clearInterval(t)
  }, [i, n, paused])

  return (
    <div
      className="bg-wine text-white"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
    >
      <div className="mx-auto flex h-9 max-w-7xl items-center justify-between gap-2 px-4">
        <button
          aria-label="Previous announcement"
          className="rounded p-1 opacity-70 hover:opacity-100"
          onClick={() => setI((i - 1 + n) % n)}
        >
          <ChevronLeft className="size-4" />
        </button>
        <p key={i} className="animate-in fade-in truncate text-center text-xs font-medium tracking-wider uppercase">
          {announcements[i]}
        </p>
        <button
          aria-label="Next announcement"
          className="rounded p-1 opacity-70 hover:opacity-100"
          onClick={() => setI((i + 1) % n)}
        >
          <ChevronRight className="size-4" />
        </button>
      </div>
    </div>
  )
}
