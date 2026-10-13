import { useNavigate } from "react-router-dom"
import { FileText, Leaf } from "lucide-react"
import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command"
import { products, formatAED } from "@/data/products"
import { ingredients } from "@/data/content"
import { thumb } from "@/lib/asset"

const pages = [
  { to: "/shop", label: "Shop all" },
  { to: "/about", label: "About Us" },
  { to: "/ingredients", label: "Ingredients" },
  { to: "/faqs", label: "FAQs" },
  { to: "/contact", label: "Contact Us" },
  { to: "/policies/shipping-and-returns", label: "Shipping & Returns" },
]

export function SearchDialog({ open, onOpenChange }: { open: boolean; onOpenChange: (o: boolean) => void }) {
  const navigate = useNavigate()
  const go = (to: string) => {
    onOpenChange(false)
    navigate(to)
  }

  return (
    <CommandDialog open={open} onOpenChange={onOpenChange} title="Search" description="Search products, ingredients and pages">
      <Command>
      <CommandInput placeholder="Search products, ingredients…" />
      <CommandList className="max-h-[60vh]">
        <CommandEmpty>No results found.</CommandEmpty>
        <CommandGroup heading="Products">
          {products.map((p) => (
            <CommandItem
              key={p.handle}
              value={`${p.title} ${p.tags.join(" ")} ${p.category}`}
              onSelect={() => go(`/products/${p.handle}`)}
              className="gap-3"
            >
              <img src={thumb(p.images[0])} alt="" loading="lazy" className="size-10 rounded-md bg-muted object-cover" />
              <span className="flex-1 truncate">{p.title}</span>
              <span className="text-xs text-muted-foreground">{formatAED(p.variants[0].price)}</span>
            </CommandItem>
          ))}
        </CommandGroup>
        <CommandSeparator />
        <CommandGroup heading="Ingredients">
          {ingredients.map((i) => (
            <CommandItem key={i.id} value={`ingredient ${i.name}`} onSelect={() => go(`/ingredients#${i.id}`)}>
              <Leaf /> {i.name}
            </CommandItem>
          ))}
        </CommandGroup>
        <CommandSeparator />
        <CommandGroup heading="Pages">
          {pages.map((p) => (
            <CommandItem key={p.to} value={`page ${p.label}`} onSelect={() => go(p.to)}>
              <FileText /> {p.label}
            </CommandItem>
          ))}
        </CommandGroup>
      </CommandList>
      </Command>
    </CommandDialog>
  )
}
