import type { ComponentProps } from "react"
import { useInView } from "@/hooks/useInView"
import { cn } from "@/lib/utils"

/** Fades its children up into place the first time they scroll into view. Never use above the fold. */
export function Reveal({ className, ...props }: ComponentProps<"div">) {
  const [ref, inView] = useInView<HTMLDivElement>()
  return <div ref={ref} className={cn("reveal", inView && "is-in", className)} {...props} />
}
