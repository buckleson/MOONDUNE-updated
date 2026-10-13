import { Link } from "react-router-dom"
import { Mail, Phone } from "lucide-react"
import { Instagram } from "@/components/icons"
import { NewsletterSignup } from "@/components/NewsletterSignup"
import { contact } from "@/data/content"
import { asset } from "@/lib/asset"

const explore = [
  { to: "/shop", label: "Shop" },
  { to: "/about", label: "About Us" },
  { to: "/ingredients", label: "Ingredients" },
  { to: "/faqs", label: "FAQs" },
  { to: "/account", label: "Signup / Login" },
]

const info = [
  { to: "/policies/terms-and-conditions", label: "Terms & Conditions" },
  { to: "/policies/shipping-and-returns", label: "Shipping & Returns" },
  { to: "/policies/privacy-policy", label: "Privacy Policy" },
  { to: "/contact", label: "Contact Us" },
]

export function Footer() {
  return (
    <footer className="bg-wine text-white">
      <div className="mx-auto max-w-7xl px-4 pt-14 pb-8">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1.2fr]">
          <div className="space-y-4">
            <Link to="/" className="font-heading text-4xl font-semibold tracking-wide">
              moondune
            </Link>
            <p className="font-heading text-xl text-gold italic">Desert Alchemy — Redefined</p>
            <NewsletterSignup variant="dark" />
          </div>

          <div>
            <h3 className="mb-4 font-sans text-xs font-semibold tracking-[0.2em] text-gold uppercase">Explore</h3>
            <ul className="space-y-2.5 text-sm">
              {explore.map((l) => (
                <li key={l.to}>
                  <Link to={l.to} className="opacity-85 transition hover:text-gold hover:opacity-100">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="mb-4 font-sans text-xs font-semibold tracking-[0.2em] text-gold uppercase">Info</h3>
            <ul className="space-y-2.5 text-sm">
              {info.map((l) => (
                <li key={l.to}>
                  <Link to={l.to} className="opacity-85 transition hover:text-gold hover:opacity-100">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="mb-4 font-sans text-xs font-semibold tracking-[0.2em] text-gold uppercase">Contact us</h3>
            <ul className="space-y-3 text-sm">
              <li>
                <a href={`mailto:${contact.email}`} className="flex items-center gap-2 opacity-85 hover:text-gold hover:opacity-100">
                  <Mail className="size-4" /> {contact.email}
                </a>
              </li>
              <li>
                <a href={contact.phoneHref} className="flex items-center gap-2 opacity-85 hover:text-gold hover:opacity-100">
                  <Phone className="size-4" /> {contact.phone}
                </a>
              </li>
              <li>
                <a
                  href={contact.instagram}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-2 opacity-85 hover:text-gold hover:opacity-100"
                >
                  <Instagram className="size-4" /> Instagram {contact.instagramHandle}
                </a>
              </li>
            </ul>
            <div className="mt-6 flex flex-wrap gap-6">
              <div>
                <p className="mb-2 text-[11px] tracking-[0.2em] uppercase opacity-70">Payments</p>
                <div className="flex h-10 items-center rounded-md bg-white px-3">
                  <img src={asset("/images/site/Stripe-logo.webp")} alt="Stripe" loading="lazy" className="h-6 w-auto" />
                </div>
              </div>
              <div>
                <p className="mb-2 text-[11px] tracking-[0.2em] uppercase opacity-70">Shipping</p>
                <div className="flex h-10 items-center rounded-md bg-white px-2">
                  <img src={asset("/images/site/aramex-logo.webp")} alt="Aramex" loading="lazy" className="h-9 w-auto" />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-2 border-t border-white/15 pt-6 text-xs opacity-75 md:flex-row">
          <p>© {new Date().getFullYear()} moondune. All Rights Reserved.</p>
          <p>Arabic beauty, made for skin without borders.</p>
        </div>
      </div>
    </footer>
  )
}
