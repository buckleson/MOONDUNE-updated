import { useSearchParams } from "react-router-dom"
import { SlidersHorizontal, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Slider } from "@/components/ui/slider"
import { ProductCard } from "@/components/ProductCard"
import { PageHero } from "@/components/PageHero"
import { discountPercent, formatAED, products, type Category } from "@/data/products"
import { Seo } from "@/components/Seo"
import { breadcrumbSchema } from "@/lib/schema"

const categories: { id: Category; label: string }[] = [
  { id: "essence", label: "Essences" },
  { id: "combo", label: "Combos" },
  { id: "accessory", label: "Accessories" },
]

const sorts = {
  featured: "Featured",
  "price-asc": "Price, low to high",
  "price-desc": "Price, high to low",
  "name-asc": "Alphabetically, A–Z",
  discount: "Biggest savings",
} as const
type SortKey = keyof typeof sorts

const MAX_PRICE = Math.max(...products.map((p) => p.variants[0].price))

export default function Shop() {
  const [params, setParams] = useSearchParams()
  const sort = (params.get("sort") as SortKey) in sorts ? (params.get("sort") as SortKey) : "featured"
  const selected = (params.get("category")?.split(",").filter(Boolean) ?? []) as Category[]
  const maxPrice = Number(params.get("max")) || MAX_PRICE
  const onSale = params.get("sale") === "1"

  const update = (patch: Record<string, string | null>) => {
    const next = new URLSearchParams(params)
    for (const [k, v] of Object.entries(patch)) {
      if (v === null || v === "") next.delete(k)
      else next.set(k, v)
    }
    setParams(next, { replace: true })
  }

  const toggleCategory = (c: Category) => {
    const set = new Set(selected)
    if (set.has(c)) set.delete(c)
    else set.add(c)
    update({ category: [...set].join(",") || null })
  }

  const list = (() => {
    const filtered = products.filter(
      (p) =>
        (selected.length === 0 || selected.includes(p.category)) &&
        p.variants[0].price <= maxPrice &&
        (!onSale || discountPercent(p.variants[0]) > 0),
    )
    const price = (p: (typeof products)[number]) => p.variants[0].price
    switch (sort) {
      case "price-asc":
        return [...filtered].sort((a, b) => price(a) - price(b))
      case "price-desc":
        return [...filtered].sort((a, b) => price(b) - price(a))
      case "name-asc":
        return [...filtered].sort((a, b) => a.title.localeCompare(b.title))
      case "discount":
        return [...filtered].sort((a, b) => discountPercent(b.variants[0]) - discountPercent(a.variants[0]))
      default:
        return filtered
    }
  })()

  const activeFilters = selected.length + (maxPrice < MAX_PRICE ? 1 : 0) + (onSale ? 1 : 0)

  const filters = (
    <div className="space-y-8">
      <div>
        <p className="mb-3 text-xs font-semibold tracking-widest uppercase">Category</p>
        <div className="space-y-3">
          {categories.map((c) => (
            <div key={c.id} className="flex items-center gap-2">
              <Checkbox id={`cat-${c.id}`} checked={selected.includes(c.id)} onCheckedChange={() => toggleCategory(c.id)} />
              <Label htmlFor={`cat-${c.id}`} className="cursor-pointer font-normal">
                {c.label}{" "}
                <span className="text-muted-foreground">({products.filter((p) => p.category === c.id).length})</span>
              </Label>
            </div>
          ))}
        </div>
      </div>
      <div>
        <p className="mb-3 text-xs font-semibold tracking-widest uppercase">Max price</p>
        <Slider
          min={50}
          max={MAX_PRICE}
          step={10}
          value={[maxPrice]}
          onValueChange={([v]) => update({ max: v >= MAX_PRICE ? null : String(v) })}
        />
        <p className="mt-2 text-sm text-muted-foreground">Up to {formatAED(maxPrice)}</p>
      </div>
      <div className="flex items-center gap-2">
        <Checkbox id="on-sale" checked={onSale} onCheckedChange={(c) => update({ sale: c ? "1" : null })} />
        <Label htmlFor="on-sale" className="cursor-pointer font-normal">
          On sale only
        </Label>
      </div>
      {activeFilters > 0 && (
        <Button variant="outline" className="w-full" onClick={() => setParams({}, { replace: true })}>
          <X /> Clear all filters
        </Button>
      )}
    </div>
  )

  return (
    <>
      <Seo title="Shop Korean Skincare for the UAE — Essences, Combos & Hydration" description="Shop Moondune's all-in-one AM & PM essences, money-saving combos and the SkinSip Quencher tumbler. Free tracked 2-day delivery across the UAE, VAT included, cash on delivery." jsonLd={[breadcrumbSchema([{ name: "Home", path: "/" }, { name: "Shop", path: "/shop" }])]} />
      <PageHero title="All products" subtitle="Climate-intelligent skincare and hydration essentials, made for the UAE." />
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-12 lg:grid-cols-[220px_1fr]">
        <aside className="hidden lg:block">{filters}</aside>
        <div>
          <div className="mb-8 flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="outline" className="lg:hidden">
                    <SlidersHorizontal /> Filters {activeFilters > 0 && `(${activeFilters})`}
                  </Button>
                </SheetTrigger>
                <SheetContent side="left" className="p-0">
                  <SheetHeader className="border-b">
                    <SheetTitle>Filters</SheetTitle>
                  </SheetHeader>
                  <div className="p-4">{filters}</div>
                </SheetContent>
              </Sheet>
              <p className="text-sm text-muted-foreground">
                {list.length} {list.length === 1 ? "product" : "products"}
              </p>
            </div>
            <Select value={sort} onValueChange={(v) => update({ sort: v === "featured" ? null : v })}>
              <SelectTrigger className="w-52" aria-label="Sort by">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {Object.entries(sorts).map(([k, label]) => (
                  <SelectItem key={k} value={k}>
                    {label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {list.length === 0 ? (
            <div className="rounded-2xl bg-wine-50 p-12 text-center">
              <p className="font-heading text-2xl text-wine">No products match these filters</p>
              <Button className="mt-4 rounded-full" onClick={() => setParams({}, { replace: true })}>
                Clear filters
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-x-4 gap-y-10 md:grid-cols-3">
              {list.map((p) => (
                <ProductCard key={p.handle} product={p} />
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  )
}
