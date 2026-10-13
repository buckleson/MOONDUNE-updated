import { Link } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { ClimateExplainer } from "@/components/home/ClimateExplainer"
import { HeroCarousel } from "@/components/home/HeroCarousel"
import { IngredientsSection } from "@/components/home/IngredientsSection"
import { LabReports } from "@/components/home/LabReports"
import { FeaturedStrip, PressSection } from "@/components/home/PressSection"
import { RoutineFinder } from "@/components/home/RoutineFinder"
import { BehindTheScenes, DesertAlchemyBanner, OurStory } from "@/components/home/StorySections"
import { ProductCard } from "@/components/ProductCard"
import { Reviews } from "@/components/Reviews"
import { SectionHeading } from "@/components/SectionHeading"
import { Seo } from "@/components/Seo"
import { intro } from "@/data/content"
import { products } from "@/data/products"
import { organizationSchema, websiteSchema } from "@/lib/schema"

export default function Home() {
  return (
    <>
      <Seo
        title="Moondune | Korean Skincare Made for the UAE Climate"
        description="Climate-intelligent Korean skincare for UAE heat and AC: all-in-one AM & PM essences with dates, coffee and honey. Lab-tested in Korea, Beautyworld 2026 finalist. Free 2-day UAE delivery."
        jsonLd={[organizationSchema(), websiteSchema()]}
      />
      <HeroCarousel />
      <FeaturedStrip />

      <section className="py-20">
        <div className="mx-auto max-w-7xl px-4">
          <SectionHeading
            title="An Arabic souk with a Korean heartbeat!"
            subtitle="Two essences replace your whole routine. Every order ships free in 2 days across the UAE."
          />
          <div className="mt-12 grid grid-cols-2 gap-x-4 gap-y-10 md:grid-cols-3 lg:grid-cols-5">
            {products.map((p) => (
              <ProductCard key={p.handle} product={p} />
            ))}
          </div>
          <div className="mt-12 text-center">
            <Button asChild variant="outline" size="lg" className="h-12 rounded-full border-wine px-10 text-xs tracking-widest text-wine uppercase hover:bg-wine hover:text-white">
              <Link to="/shop">View all products</Link>
            </Button>
          </div>
        </div>
      </section>

      <RoutineFinder />
      <Reviews />
      <ClimateExplainer />
      <LabReports />
      <PressSection />
      <IngredientsSection />

      <section className="bg-wine-50 px-4 py-20 text-center">
        <div className="mx-auto max-w-3xl space-y-2 text-[clamp(16px,2.4vw,20px)] leading-loose font-medium text-wine">
          {intro.map((line) => (
            <p key={line}>{line}</p>
          ))}
        </div>
      </section>

      <OurStory />
      <BehindTheScenes />
      <DesertAlchemyBanner />
    </>
  )
}
