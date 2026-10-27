import { useEffect, useRef, useState } from "react"
import { Link, NavLink, useNavigate } from "react-router-dom"
import { ChevronDown, ExternalLink, Heart, Menu, Search, ShoppingBag, User } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet"
import { Separator } from "@/components/ui/separator"
import { SearchDialog } from "@/components/SearchDialog"
import { useCart } from "@/context/CartContext"
import { useAuth } from "@/context/AuthContext"
import { useWishlist } from "@/context/WishlistContext"
import { contact } from "@/data/content"
import { cn } from "@/lib/utils"
import { asset } from "@/lib/asset"

const mainNav = [
  { to: "/", label: "Home" },
  { to: "/shop", label: "Shop" },
  { href: contact.dunecast, label: "Dunecast" },
  { to: "/about", label: "About Us" },
  { to: "/ingredients", label: "Ingredients" },
  { to: "/contact", label: "Contact Us" },
] as const

const moreNav = [
  { to: "/faqs", label: "FAQs" },
  { to: "/policies/shipping-and-returns", label: "Shipping & Returns" },
  { to: "/policies/terms-and-conditions", label: "Terms & Conditions" },
  { to: "/policies/privacy-policy", label: "Privacy Policy" },
]

const navLinkClass = ({ isActive }: { isActive: boolean }) =>
  cn(
    "relative py-1 text-[13px] font-medium tracking-wide text-ink transition-colors hover:text-wine-2",
    "after:absolute after:inset-x-0 after:-bottom-0.5 after:h-px after:origin-left after:scale-x-0 after:bg-wine after:transition-transform hover:after:scale-x-100",
    isActive && "text-wine after:scale-x-100",
  )

export function Header() {
  const { count, setOpen } = useCart()
  const { user } = useAuth()
  const { handles } = useWishlist()
  const navigate = useNavigate()
  const [mobileOpen, setMobileOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  // Bump the bag icon whenever something is added.
  const [bump, setBump] = useState(0)
  const prevCount = useRef(count)
  useEffect(() => {
    if (count > prevCount.current) setBump((b) => b + 1)
    prevCount.current = count
  }, [count])

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault()
        setSearchOpen((o) => !o)
      }
    }
    window.addEventListener("scroll", onScroll, { passive: true })
    window.addEventListener("keydown", onKey)
    return () => {
      window.removeEventListener("scroll", onScroll)
      window.removeEventListener("keydown", onKey)
    }
  }, [])

  return (
    <header
      className={cn(
        "sticky top-0 z-40 border-b bg-white/95 backdrop-blur transition-shadow",
        scrolled && "shadow-[0_4px_20px_rgba(58,23,45,0.08)]",
      )}
    >
      <div className="mx-auto grid h-16 max-w-7xl grid-cols-[1fr_auto_1fr] items-center gap-4 px-4 md:h-20 lg:grid-cols-[auto_1fr_auto]">
        <div className="flex items-center gap-1 lg:hidden">
          <Button variant="ghost" size="icon" aria-label="Open menu" onClick={() => setMobileOpen(true)}>
            <Menu className="size-5" />
          </Button>
          <Button variant="ghost" size="icon" aria-label="Search" onClick={() => setSearchOpen(true)}>
            <Search className="size-5" />
          </Button>
        </div>

        <Link to="/" aria-label="Moondune home" className="justify-self-center lg:justify-self-start">
          <img src={asset("/images/site/logo-original-174px.webp")} alt="moondune" className="h-9 w-auto md:h-11" />
        </Link>

        <nav className="hidden items-center justify-center gap-7 lg:flex" aria-label="Main">
          {mainNav.map((item) =>
            "href" in item ? (
              <a
                key={item.label}
                href={item.href}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-1 py-1 text-[13px] font-medium tracking-wide text-ink hover:text-wine-2"
              >
                {item.label}
                <ExternalLink className="size-3" />
              </a>
            ) : (
              <NavLink key={item.to} to={item.to} end={item.to === "/"} className={navLinkClass}>
                {item.label}
              </NavLink>
            ),
          )}
          <DropdownMenu>
            <DropdownMenuTrigger className="flex items-center gap-1 py-1 text-[13px] font-medium tracking-wide text-ink outline-none hover:text-wine-2">
              More <ChevronDown className="size-3.5" />
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-52">
              {moreNav.map((item) => (
                <DropdownMenuItem key={item.to} onSelect={() => navigate(item.to)}>
                  {item.label}
                </DropdownMenuItem>
              ))}
              <DropdownMenuSeparator />
              <DropdownMenuItem onSelect={() => navigate("/account")}>{user ? "My account" : "Login / Signup"}</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </nav>

        <div className="flex items-center justify-end gap-0.5">
          <Button
            variant="ghost"
            size="icon"
            aria-label="Search"
            className="hidden lg:inline-flex"
            onClick={() => setSearchOpen(true)}
          >
            <Search className="size-5" />
          </Button>
          <Button variant="ghost" size="icon" aria-label="Wishlist" className="relative hidden sm:inline-flex" asChild>
            <Link to="/account?tab=wishlist">
              <Heart className="size-5" />
              {handles.length > 0 && (
                <span className="absolute -top-0.5 -right-0.5 grid size-4 place-items-center rounded-full bg-gold text-[10px] font-bold text-wine">
                  {handles.length}
                </span>
              )}
            </Link>
          </Button>
          <Button variant="ghost" size="icon" aria-label="Account" asChild>
            <Link to="/account">
              <User className={cn("size-5", user && "fill-wine/15 text-wine")} />
            </Link>
          </Button>
          <Button variant="ghost" size="icon" aria-label={`Cart, ${count} items`} className="relative" onClick={() => setOpen(true)}>
            <ShoppingBag key={bump} className={cn("size-5", bump > 0 && "animate-cart-bump")} />
            {count > 0 && (
              <span
                key={count}
                className="animate-in zoom-in-50 fade-in absolute -top-0.5 -right-0.5 grid size-4 place-items-center rounded-full bg-wine text-[10px] font-bold text-white duration-300"
              >
                {count}
              </span>
            )}
          </Button>
        </div>
      </div>

      <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
        <SheetContent side="left" className="w-80 gap-0 p-0">
          <SheetHeader className="border-b">
            <SheetTitle>
              <img src={asset("/images/site/logo-original-174px.webp")} alt="moondune" className="h-9 w-auto" />
            </SheetTitle>
          </SheetHeader>
          <nav className="flex flex-col p-2" aria-label="Mobile">
            {mainNav.map((item) =>
              "href" in item ? (
                <a
                  key={item.label}
                  href={item.href}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center justify-between rounded-md px-3 py-3 text-sm font-medium hover:bg-muted"
                >
                  {item.label} <ExternalLink className="size-4 opacity-60" />
                </a>
              ) : (
                <NavLink
                  key={item.to}
                  to={item.to}
                  end={item.to === "/"}
                  onClick={() => setMobileOpen(false)}
                  className={({ isActive }) =>
                    cn("rounded-md px-3 py-3 text-sm font-medium hover:bg-muted", isActive && "bg-muted text-wine")
                  }
                >
                  {item.label}
                </NavLink>
              ),
            )}
            <Separator className="my-2" />
            {moreNav.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                onClick={() => setMobileOpen(false)}
                className="rounded-md px-3 py-2.5 text-sm text-muted-foreground hover:bg-muted hover:text-foreground"
              >
                {item.label}
              </NavLink>
            ))}
            <Separator className="my-2" />
            <NavLink
              to="/account"
              onClick={() => setMobileOpen(false)}
              className="flex items-center gap-2 rounded-md px-3 py-3 text-sm font-medium hover:bg-muted"
            >
              <User className="size-4" /> {user ? `Hi, ${user.name.split(" ")[0]}` : "Login / Signup"}
            </NavLink>
          </nav>
        </SheetContent>
      </Sheet>

      <SearchDialog open={searchOpen} onOpenChange={setSearchOpen} />
    </header>
  )
}
