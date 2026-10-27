import * as React from "react"
import { Link } from "react-router-dom"
import { cn } from "@/lib/utils"

function BentoGrid({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="bento-grid"
      className={cn("grid auto-rows-[minmax(170px,auto)] grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4", className)}
      {...props}
    />
  )
}

const tileClass =
  "group/tile relative flex flex-col overflow-hidden rounded-2xl bg-wine-50 p-6 text-left ring-1 ring-border transition duration-300 ease-(--ease-out)"
const interactiveClass = "hover:-translate-y-0.5 hover:shadow-[0_18px_40px_-24px_rgba(58,23,45,.45)] hover:ring-wine/30"

/** A bento cell. Pass `to` (route) or `href` (anchor) to make the whole tile one click target. */
function BentoTile({
  to,
  href,
  className,
  children,
  ...props
}: React.ComponentProps<"div"> & { to?: string; href?: string }) {
  if (to) {
    return (
      <Link data-slot="bento-tile" to={to} className={cn(tileClass, interactiveClass, className)}>
        {children}
      </Link>
    )
  }
  if (href) {
    return (
      <a data-slot="bento-tile" href={href} className={cn(tileClass, interactiveClass, className)}>
        {children}
      </a>
    )
  }
  return (
    <div data-slot="bento-tile" className={cn(tileClass, className)} {...props}>
      {children}
    </div>
  )
}

export { BentoGrid, BentoTile }
