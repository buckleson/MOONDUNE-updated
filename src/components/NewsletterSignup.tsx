import { useState } from "react"
import { ArrowRight } from "lucide-react"
import { toast } from "sonner"
import { useLocalStorage } from "@/hooks/useLocalStorage"
import { cn } from "@/lib/utils"

export const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/

export function NewsletterSignup({ variant = "light" }: { variant?: "light" | "dark" }) {
  const [email, setEmail] = useState("")
  const [error, setError] = useState("")
  const [subscribers, setSubscribers] = useLocalStorage<string[]>("moondune.newsletter", [])
  const dark = variant === "dark"

  return (
    <form
      noValidate
      className="max-w-sm space-y-2"
      onSubmit={(e) => {
        e.preventDefault()
        const v = email.trim().toLowerCase()
        if (!EMAIL_RE.test(v)) return setError("Please enter a valid email address")
        if (subscribers.includes(v)) {
          toast("You're already on the list", { description: v })
        } else {
          setSubscribers((s) => [...s, v])
          toast.success("Welcome to the moondune circle!", { description: "Watch your inbox for rituals and offers." })
        }
        setEmail("")
        setError("")
      }}
    >
      <p className={cn("text-sm", dark ? "opacity-85" : "text-muted-foreground")}>
        Join our newsletter for launches, rituals and member-only offers.
      </p>
      <div
        className={cn(
          "flex items-center rounded-full border pl-4",
          dark ? "border-white/30 bg-white/10 focus-within:border-gold" : "bg-white focus-within:border-wine",
        )}
      >
        <input
          type="email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value)
            setError("")
          }}
          placeholder="Your email"
          aria-label="Email address"
          aria-invalid={!!error}
          className={cn("h-11 flex-1 bg-transparent text-sm outline-none", dark && "placeholder:text-white/60")}
        />
        <button
          type="submit"
          aria-label="Subscribe"
          className={cn(
            "m-1 grid size-9 place-items-center rounded-full transition",
            dark ? "bg-gold text-wine hover:bg-gold-2" : "bg-wine text-white hover:bg-wine-2",
          )}
        >
          <ArrowRight className="size-4" />
        </button>
      </div>
      {error && <p className={cn("text-xs", dark ? "text-gold-2" : "text-destructive")}>{error}</p>}
    </form>
  )
}
