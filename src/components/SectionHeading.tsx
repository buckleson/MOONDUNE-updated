import { cn } from "@/lib/utils"

export function SectionHeading({
  eyebrow,
  title,
  subtitle,
  className,
  light,
}: {
  eyebrow?: string
  title: string
  subtitle?: string
  className?: string
  light?: boolean
}) {
  return (
    <div className={cn("mx-auto max-w-3xl text-center", className)}>
      {eyebrow && (
        <p className={cn("mb-3 text-xs font-semibold tracking-[0.2em] uppercase", light ? "text-gold" : "text-wine-2")}>
          {eyebrow}
        </p>
      )}
      <h2 className={cn("text-[clamp(30px,4.4vw,46px)] leading-tight font-semibold", light ? "text-white" : "text-wine")}>
        {title}
      </h2>
      {subtitle && <p className={cn("mt-3 text-[15px]", light ? "text-white/80" : "text-muted-foreground")}>{subtitle}</p>}
    </div>
  )
}
