import { Link } from "react-router-dom"

export function PageHero({ eyebrow, title, subtitle }: { eyebrow?: string; title: string; subtitle?: string }) {
  return (
    <section className="bg-wine-50 px-4 py-14 text-center md:py-20">
      <nav aria-label="Breadcrumb" className="mb-4 text-xs text-muted-foreground">
        <Link to="/" className="hover:text-wine">
          Home
        </Link>
        <span className="mx-2">/</span>
        <span className="text-wine">{eyebrow ?? title}</span>
      </nav>
      <h1 className="text-[clamp(34px,5vw,56px)] leading-tight font-semibold text-wine">{title}</h1>
      {subtitle && <p className="mx-auto mt-3 max-w-2xl text-muted-foreground">{subtitle}</p>}
    </section>
  )
}
