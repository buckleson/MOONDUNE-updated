import { useState, type FormEvent } from "react"
import { Loader2, Mail, MapPin, Phone } from "lucide-react"
import { Instagram } from "@/components/icons"
import { toast } from "sonner"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { EMAIL_RE } from "@/components/NewsletterSignup"
import { PageHero } from "@/components/PageHero"
import { contact } from "@/data/content"
import { useLocalStorage } from "@/hooks/useLocalStorage"
import { Seo } from "@/components/Seo"

type Fields = { name: string; phone: string; email: string; message: string }
const empty: Fields = { name: "", phone: "", email: "", message: "" }

export default function Contact() {
  const [f, setF] = useState<Fields>(empty)
  const [errors, setErrors] = useState<Partial<Fields>>({})
  const [sending, setSending] = useState(false)
  const [, setInbox] = useLocalStorage<(Fields & { at: string })[]>("moondune.messages", [])

  const set = (k: keyof Fields) => (e: { target: { value: string } }) => {
    setF({ ...f, [k]: e.target.value })
    setErrors({ ...errors, [k]: undefined })
  }

  const submit = (e: FormEvent) => {
    e.preventDefault()
    const errs: Partial<Fields> = {}
    if (f.name.trim().length < 2) errs.name = "Please enter your name"
    if (f.phone && !/^\+?[\d\s-]{8,15}$/.test(f.phone.trim())) errs.phone = "Enter a valid phone number"
    if (!EMAIL_RE.test(f.email.trim())) errs.email = "Please enter a valid email"
    if (f.message.trim().length < 10) errs.message = "Message should be at least 10 characters"
    setErrors(errs)
    if (Object.keys(errs).length) return
    setSending(true)
    setTimeout(() => {
      setInbox((m) => [...m, { ...f, at: new Date().toISOString() }])
      setSending(false)
      setF(empty)
      toast.success("Message sent!", { description: "Our care team will get back to you within 48 hours." })
    }, 800)
  }

  return (
    <>
      <Seo title="Contact Moondune — WhatsApp, Email & Masdar City Office" description="Questions about your skin, an order or delivery? Reach Moondune on WhatsApp or phone at +971 54 799 0329, email care@moondune.co, or visit us in Masdar City, Abu Dhabi." />
      <PageHero title="Contact Us" subtitle="We would love to hear from you. Reach out with any questions or comments." />
      <section className="mx-auto grid max-w-6xl gap-12 px-4 py-16 md:grid-cols-[1fr_1.3fr]">
        <div className="space-y-6">
          <h2 className="text-3xl font-semibold text-wine">Get in touch with us</h2>
          <ul className="space-y-5 text-sm">
            <li>
              <a href={contact.phoneHref} className="flex items-start gap-3 hover:text-wine">
                <span className="grid size-10 shrink-0 place-items-center rounded-full bg-wine-50 text-wine">
                  <Phone className="size-4" />
                </span>
                <span>
                  <span className="block font-semibold">Phone</span>
                  {contact.phone}
                </span>
              </a>
            </li>
            <li>
              <a href={`mailto:${contact.email}`} className="flex items-start gap-3 hover:text-wine">
                <span className="grid size-10 shrink-0 place-items-center rounded-full bg-wine-50 text-wine">
                  <Mail className="size-4" />
                </span>
                <span>
                  <span className="block font-semibold">Email</span>
                  {contact.email}
                </span>
              </a>
            </li>
            <li>
              <a
                href={`https://maps.google.com/?q=${encodeURIComponent("Incubator building, Masdar City, Abu Dhabi")}`}
                target="_blank"
                rel="noreferrer"
                className="flex items-start gap-3 hover:text-wine"
              >
                <span className="grid size-10 shrink-0 place-items-center rounded-full bg-wine-50 text-wine">
                  <MapPin className="size-4" />
                </span>
                <span>
                  <span className="block font-semibold">Address</span>
                  {contact.address}
                </span>
              </a>
            </li>
            <li>
              <a href={contact.instagram} target="_blank" rel="noreferrer" className="flex items-start gap-3 hover:text-wine">
                <span className="grid size-10 shrink-0 place-items-center rounded-full bg-wine-50 text-wine">
                  <Instagram className="size-4" />
                </span>
                <span>
                  <span className="block font-semibold">Instagram</span>
                  {contact.instagramHandle}
                </span>
              </a>
            </li>
          </ul>
        </div>

        <form onSubmit={submit} noValidate className="space-y-4 rounded-2xl bg-wine-50 p-6 md:p-8">
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-1.5">
              <Label htmlFor="c-name">Name *</Label>
              <Input id="c-name" value={f.name} onChange={set("name")} aria-invalid={!!errors.name} className="h-11 bg-white" />
              {errors.name && <p className="text-xs text-destructive">{errors.name}</p>}
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="c-phone">Phone number</Label>
              <Input id="c-phone" type="tel" value={f.phone} onChange={set("phone")} aria-invalid={!!errors.phone} className="h-11 bg-white" />
              {errors.phone && <p className="text-xs text-destructive">{errors.phone}</p>}
            </div>
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="c-email">Email address *</Label>
            <Input id="c-email" type="email" value={f.email} onChange={set("email")} aria-invalid={!!errors.email} className="h-11 bg-white" />
            {errors.email && <p className="text-xs text-destructive">{errors.email}</p>}
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="c-message">Message *</Label>
            <Textarea
              id="c-message"
              rows={6}
              value={f.message}
              onChange={set("message")}
              aria-invalid={!!errors.message}
              className="bg-white"
            />
            {errors.message && <p className="text-xs text-destructive">{errors.message}</p>}
          </div>
          <Button type="submit" size="lg" disabled={sending} className="h-12 w-full rounded-full tracking-widest uppercase">
            {sending ? <Loader2 className="animate-spin" /> : "Send message"}
          </Button>
        </form>
      </section>
    </>
  )
}
