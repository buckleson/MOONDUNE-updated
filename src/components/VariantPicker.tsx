import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { formatAED, type Variant } from "@/data/products"
import { cn } from "@/lib/utils"

export function VariantPicker({
  variants,
  value,
  onChange,
}: {
  variants: Variant[]
  value: string
  onChange: (id: string) => void
}) {
  return (
    <div className="space-y-2">
      <p className="text-xs font-semibold tracking-widest uppercase">Type</p>
      <RadioGroup value={value} onValueChange={onChange} className="flex flex-wrap gap-2">
        {variants.map((v) => (
          <Label
            key={v.id}
            htmlFor={v.id}
            className={cn(
              "flex cursor-pointer items-center gap-2 rounded-full border px-4 py-2 text-sm transition",
              value === v.id ? "border-wine bg-wine text-white" : "hover:border-wine",
            )}
          >
            <RadioGroupItem id={v.id} value={v.id} className="sr-only" />
            {v.title}
            <span className="opacity-75">· {formatAED(v.price)}</span>
          </Label>
        ))}
      </RadioGroup>
    </div>
  )
}
