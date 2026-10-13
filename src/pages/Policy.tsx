import { Link, NavLink, useParams } from "react-router-dom"
import { PageHero } from "@/components/PageHero"
import { contact } from "@/data/content"
import { cn } from "@/lib/utils"
import NotFound from "@/pages/NotFound"
import { Seo } from "@/components/Seo"
import { breadcrumbSchema } from "@/lib/schema"

const policies: Record<string, { title: string; sections: { h: string; p: (string | string[])[] }[] }> = {
  "shipping-and-returns": {
    title: "Shipping & Returns",
    sections: [
      {
        h: "Shipping",
        p: [
          "Orders ship from Abu Dhabi and are delivered across all UAE Emirates through Aramex. Delivery is tracked and usually completed within 2 days of ordering.",
        ],
      },
      { h: "VAT & Duties", p: ["Moondune covers UAE VAT and duties, so you pay no additional amount at delivery."] },
      {
        h: "Order cancellations",
        p: [`To cancel an order, email ${contact.email}. Orders cannot be cancelled once they have shipped.`],
      },
      {
        h: "Returns and exchanges",
        p: [
          "Due to the nature of our products, returns and exchanges are not accepted after delivery — except if you received the wrong item or an item arrived damaged.",
          `In those cases, email ${contact.email} and our team will aim to respond within 48 hours. To qualify, all items (including free gifts) must be:`,
          [
            "Unused and in their original condition",
            "In their original packaging, with labels and tags attached",
            "Accompanied by the original order confirmation",
          ],
          "For damaged items, please send a photo within 24 hours of delivery.",
        ],
      },
    ],
  },
  "terms-and-conditions": {
    title: "Terms & Conditions",
    sections: [
      {
        h: "Overview",
        p: [
          "This website is operated by moondune (House of Asya Limited). By visiting our site and/or purchasing from us, you agree to be bound by these terms.",
        ],
      },
      {
        h: "Products and pricing",
        p: [
          "Prices are shown in UAE Dirhams (AED) and include VAT. We reserve the right to change prices and discontinue products at any time.",
          "We make every effort to display product colours and images accurately; actual packaging may vary slightly.",
        ],
      },
      {
        h: "Use of products",
        p: ["Our products are for external use only. Always patch test before first use and discontinue use if irritation occurs."],
      },
      {
        h: "Discount codes",
        p: ["Discount codes cannot be combined unless stated and may be withdrawn at any time."],
      },
      { h: "Contact", p: [`Questions about these terms can be sent to ${contact.email}.`] },
    ],
  },
  "privacy-policy": {
    title: "Privacy Policy",
    sections: [
      {
        h: "What we collect",
        p: ["When you place an order or contact us, we collect the details needed to fulfil it — name, email, phone and delivery address."],
      },
      {
        h: "How we use it",
        p: [
          "We use your information to process orders, provide customer care, and — only if you opt in — send our newsletter.",
          "We do not sell customer data to third parties.",
        ],
      },
      {
        h: "Cookies",
        p: ["We use cookies to provide a better shopping experience and to analyse site traffic."],
      },
      {
        h: "Payments",
        p: ["Payments are processed securely by Stripe. We never store your full card details."],
      },
      { h: "Your rights", p: [`To access or delete your data, email ${contact.email}.`] },
    ],
  },
}

export default function Policy() {
  const { slug = "" } = useParams()
  const policy = policies[slug]
  if (!policy) return <NotFound />

  return (
    <>
      <Seo title={policy.title} description={`Moondune ${policy.title.toLowerCase()}: how we handle orders, delivery across the UAE, returns and your data.`} jsonLd={[breadcrumbSchema([{ name: "Home", path: "/" }, { name: policy.title, path: `/policies/${slug}` }])]} />
      <PageHero title={policy.title} />
      <div className="mx-auto grid max-w-5xl gap-10 px-4 py-16 md:grid-cols-[200px_1fr]">
        <nav className="flex gap-2 md:flex-col" aria-label="Policies">
          {Object.entries(policies).map(([k, v]) => (
            <NavLink
              key={k}
              to={`/policies/${k}`}
              className={({ isActive }) =>
                cn("rounded-md px-3 py-2 text-sm hover:bg-muted", isActive && "bg-wine-50 font-medium text-wine")
              }
            >
              {v.title}
            </NavLink>
          ))}
        </nav>
        <article className="space-y-8">
          {policy.sections.map((s) => (
            <section key={s.h}>
              <h2 className="mb-3 text-3xl font-semibold text-wine">{s.h}</h2>
              <div className="space-y-3 leading-relaxed text-muted-foreground">
                {s.p.map((para, i) =>
                  Array.isArray(para) ? (
                    <ul key={i} className="list-disc space-y-1 pl-6">
                      {para.map((li) => (
                        <li key={li}>{li}</li>
                      ))}
                    </ul>
                  ) : (
                    <p key={i}>{para}</p>
                  ),
                )}
              </div>
            </section>
          ))}
          <p className="text-sm">
            Need help?{" "}
            <Link to="/contact" className="font-medium text-wine underline">
              Contact our care team
            </Link>
            .
          </p>
        </article>
      </div>
    </>
  )
}
