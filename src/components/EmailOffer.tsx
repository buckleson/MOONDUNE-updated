import { useEffect, useRef, useState } from "react"
import { useLocation } from "react-router-dom"
import { Check, X } from "lucide-react"
import { toast } from "sonner"
import { EMAIL_RE } from "@/components/NewsletterSignup"
import { useCart } from "@/context/CartContext"
import { useLocalStorage } from "@/hooks/useLocalStorage"
import { cn } from "@/lib/utils"

const DELAY_MS = 20000
const HIDDEN_ON = ["/checkout", "/order/", "/account"]

/**
 * First-visit offer: 15% off (SAVE15) in exchange for an email. Non-modal slide-in card,
 * shown once per visitor after 20s or on desktop exit intent.
 * TODO: send the email to the store's ESP (Klaviyo / Mailchimp) — currently stored locally.
 */
export function EmailOffer() {
  const { pathname } = useLocation()
  const { applyDiscount } = useCart()
  const [seen, setSeen] = useLocalStorage<boolean>("moondune.offerSeen", false)
  const [, setSubscribers] = useLocalStorage<string[]>("moondune.newsletter", [])
  const [open, setOpen] = useState(false)
  const [email, setEmail] = useState("")
  const [error, setError] = useState("")
  const [done, setDone] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)
  const blocked = seen || HIDDEN_ON.some((p) => pathname.startsWith(p))

  const close = () => {
    setOpen(false)
    setSeen(true)
  }

  useEffect(() => {
    if (blocked || open) return
    const t = setTimeout(() => setOpen(true), DELAY_MS)
    const onLeave = (e: MouseEvent) => {
      if (e.clientY <= 0 && !e.relatedTarget) setOpen(true)
    }
    document.addEventListener("mouseout", onLeave)
    return () => {
      clearTimeout(t)
      document.removeEventListener("mouseout", onLeave)
    }
  }, [blocked, open])

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && close()
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  })

  if (!open) return null

  return (
    <aside
      role="dialog"
      aria-modal="false"
      aria-labelledby="offer-h"
      className={cn(
        "fixed inset-x-3 bottom-3 z-50 overflow-hidden rounded-2xl bg-wine text-white shadow-[0_24px_60px_-20px_rgba(26,9,20,.6)] sm:inset-x-auto sm:bottom-6 sm:left-6 sm:w-[380px]",
        "animate-in fade-in slide-in-from-bottom-6 duration-500 ease-out",
      )}
    >
      <button aria-label="Close offer" onClick={close} className="absolute top-3 right-3 rounded-full p-1.5 text-white/70 hover:bg-white/10 hover:text-white">
        <X className="size-4" />
      </button>
      <div className="p-6 pr-10">
        {done ? (
          <>
            <p id="offer-h" className="font-heading text-3xl font-semibold">
              You're in. <span className="text-gold-2">SAVE15</span> is yours.
            </p>
            <p className="mt-2 text-sm text-white/80">We've applied it to your cart: 15% off your order.</p>
            <button onClick={close} className="mt-5 inline-flex h-10 items-center gap-2 rounded-full bg-gold px-5 text-sm font-semibold text-wine hover:bg-gold-2">
              <Check className="size-4" /> Keep shopping
            </button>
          </>
        ) : (
          <>
            <p id="offer-h" className="font-heading text-3xl leading-tight font-semibold">
              15% off your first ritual
            </p>
            <p className="mt-2 text-sm text-white/80">Get the code now, plus climate-smart skin tips for UAE weather. No spam.</p>
            <form
              noValidate
              className="mt-5"
              onSubmit={(e) => {
                e.preventDefault()
                const v = email.trim().toLowerCase()
                if (!EMAIL_RE.test(v)) {
                  setError("Please enter a valid email address")
                  inputRef.current?.focus()
                  return
                }
                setSubscribers((s) => (s.includes(v) ? s : [...s, v]))
                applyDiscount("SAVE15")
                setSeen(true)
                setDone(true)
                toast.success("SAVE15 applied to your cart")
              }}
            >
              <div className="flex gap-2">
                <input
                  ref={inputRef}
                  autoFocus
                  type="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value)
                    setError("")
                  }}
                  placeholder="Your email"
                  aria-label="Email address"
                  aria-invalid={!!error}
                  className="h-11 min-w-0 flex-1 rounded-full bg-white/10 px-4 text-sm ring-1 ring-white/30 outline-none placeholder:text-white/60 focus:ring-gold"
                />
                <button type="submit" className="h-11 shrink-0 rounded-full bg-gold px-5 text-sm font-semibold text-wine hover:bg-gold-2">
                  Get 15% off
                </button>
              </div>
              {error && <p className="mt-2 text-xs text-gold-2">{error}</p>}
            </form>
            <button onClick={close} className="mt-3 text-xs text-white/60 underline hover:text-white">
              No thanks
            </button>
          </>
        )}
      </div>
    </aside>
  )
}
