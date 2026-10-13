import { useState, type FormEvent } from "react"
import { Link, useNavigate, useSearchParams } from "react-router-dom"
import { Eye, EyeOff, LogOut, Package } from "lucide-react"
import { toast } from "sonner"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { EMAIL_RE } from "@/components/NewsletterSignup"
import { ProductCard } from "@/components/ProductCard"
import { useAuth } from "@/context/AuthContext"
import { useWishlist } from "@/context/WishlistContext"
import { formatAED, getProduct } from "@/data/products"
import { Seo } from "@/components/Seo"

function PasswordInput(props: React.ComponentProps<typeof Input>) {
  const [show, setShow] = useState(false)
  return (
    <div className="relative">
      <Input {...props} type={show ? "text" : "password"} className="h-11 pr-11" />
      <button
        type="button"
        aria-label={show ? "Hide password" : "Show password"}
        onClick={() => setShow(!show)}
        className="absolute top-1/2 right-3 -translate-y-1/2 text-muted-foreground hover:text-foreground"
      >
        {show ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
      </button>
    </div>
  )
}

function AuthForms() {
  const { login, signup } = useAuth()
  const [params] = useSearchParams()
  const navigate = useNavigate()
  const [error, setError] = useState("")
  const redirect = params.get("redirect")

  const done = (msg: string) => {
    toast.success(msg)
    if (redirect?.startsWith("/")) navigate(redirect)
  }

  const onLogin = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const fd = new FormData(e.currentTarget)
    const email = String(fd.get("email"))
    if (!EMAIL_RE.test(email)) return setError("Enter a valid email")
    const err = login(email, String(fd.get("password")))
    if (err) setError(err)
    else done("Welcome back!")
  }

  const onSignup = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const fd = new FormData(e.currentTarget)
    const name = String(fd.get("name")).trim()
    const email = String(fd.get("email"))
    const pw = String(fd.get("password"))
    if (name.length < 2) return setError("Enter your name")
    if (!EMAIL_RE.test(email)) return setError("Enter a valid email")
    if (pw.length < 6) return setError("Password must be at least 6 characters")
    const err = signup(name, email, pw)
    if (err) setError(err)
    else done("Account created — welcome to moondune!")
  }

  return (
    <div className="mx-auto max-w-md px-4 py-16">
      <h1 className="text-center text-4xl font-semibold text-wine">My account</h1>
      <Tabs defaultValue="login" className="mt-8" onValueChange={() => setError("")}>
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="login">Log in</TabsTrigger>
          <TabsTrigger value="signup">Create account</TabsTrigger>
        </TabsList>
        <TabsContent value="login">
          <form onSubmit={onLogin} noValidate className="mt-6 space-y-4">
            <div className="space-y-1.5">
              <Label htmlFor="login-email">Email</Label>
              <Input id="login-email" name="email" type="email" autoComplete="email" className="h-11" required />
            </div>
            <div className="space-y-1.5">
              <div className="flex justify-between">
                <Label htmlFor="login-password">Password</Label>
                <button
                  type="button"
                  className="text-xs text-wine underline"
                  onClick={() => toast("Password reset", { description: "This demo stores accounts locally — just create a new one." })}
                >
                  Forgot password?
                </button>
              </div>
              <PasswordInput id="login-password" name="password" autoComplete="current-password" required />
            </div>
            {error && <p className="text-sm text-destructive">{error}</p>}
            <Button type="submit" size="lg" className="h-12 w-full rounded-full tracking-widest uppercase">
              Log in
            </Button>
          </form>
        </TabsContent>
        <TabsContent value="signup">
          <form onSubmit={onSignup} noValidate className="mt-6 space-y-4">
            <div className="space-y-1.5">
              <Label htmlFor="su-name">Full name</Label>
              <Input id="su-name" name="name" autoComplete="name" className="h-11" required />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="su-email">Email</Label>
              <Input id="su-email" name="email" type="email" autoComplete="email" className="h-11" required />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="su-password">Password</Label>
              <PasswordInput id="su-password" name="password" autoComplete="new-password" minLength={6} required />
            </div>
            {error && <p className="text-sm text-destructive">{error}</p>}
            <Button type="submit" size="lg" className="h-12 w-full rounded-full tracking-widest uppercase">
              Create account
            </Button>
          </form>
        </TabsContent>
      </Tabs>
      <p className="mt-6 text-center text-xs text-muted-foreground">Demo accounts are stored only in this browser.</p>
    </div>
  )
}

function AccountView() {
  const { user, logout, orders } = useAuth()
  const { handles } = useWishlist()
  const [params, setParams] = useSearchParams()
  const tab = params.get("tab") ?? "orders"

  if (!user) {
    // Wishlist is viewable without logging in.
    if (tab === "wishlist") return <Wishlist handles={handles} />
    return <AuthForms />
  }

  return (
    <div className="mx-auto max-w-5xl px-4 py-12">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-xs font-semibold tracking-[0.2em] text-wine-2 uppercase">My account</p>
          <h1 className="text-4xl font-semibold text-wine">Hello, {user.name.split(" ")[0]}</h1>
          <p className="text-sm text-muted-foreground">{user.email}</p>
        </div>
        <Button
          variant="outline"
          className="rounded-full"
          onClick={() => {
            logout()
            toast("You've been logged out")
          }}
        >
          <LogOut /> Log out
        </Button>
      </div>

      <Tabs value={tab} onValueChange={(v) => setParams({ tab: v }, { replace: true })} className="mt-8">
        <TabsList>
          <TabsTrigger value="orders">Orders ({orders.length})</TabsTrigger>
          <TabsTrigger value="wishlist">Wishlist ({handles.length})</TabsTrigger>
        </TabsList>
        <TabsContent value="orders" className="mt-6">
          {orders.length === 0 ? (
            <div className="rounded-2xl bg-wine-50 p-10 text-center">
              <Package className="mx-auto size-10 text-wine" />
              <p className="mt-3 font-heading text-2xl text-wine">No orders yet</p>
              <Button asChild className="mt-4 rounded-full">
                <Link to="/shop">Start shopping</Link>
              </Button>
            </div>
          ) : (
            <ul className="space-y-4">
              {orders.map((o) => (
                <li key={o.id} className="rounded-2xl border p-5">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <div>
                      <p className="font-semibold text-wine">#{o.id}</p>
                      <p className="text-xs text-muted-foreground">
                        {new Date(o.date).toLocaleDateString("en-AE", { dateStyle: "medium" })}
                      </p>
                    </div>
                    <span className="rounded-full bg-gold/30 px-3 py-1 text-xs font-medium text-wine">{o.status}</span>
                    <p className="font-semibold">{formatAED(o.total)}</p>
                    <Button asChild variant="link" className="px-0">
                      <Link to={`/order/${o.id}`}>View details</Link>
                    </Button>
                  </div>
                  <div className="mt-3 flex gap-2">
                    {o.lines.map((l) => (
                      <img key={l.variantId} src={l.image} alt={l.title} title={l.title} className="size-12 rounded-md bg-wine-50 object-cover" />
                    ))}
                  </div>
                </li>
              ))}
            </ul>
          )}
        </TabsContent>
        <TabsContent value="wishlist" className="mt-6">
          <WishlistGrid handles={handles} />
        </TabsContent>
      </Tabs>
    </div>
  )
}

function WishlistGrid({ handles }: { handles: string[] }) {
  const items = handles.flatMap((h) => getProduct(h) ?? [])
  if (items.length === 0)
    return (
      <div className="rounded-2xl bg-wine-50 p-10 text-center">
        <p className="font-heading text-2xl text-wine">Your wishlist is empty</p>
        <p className="mt-1 text-sm text-muted-foreground">Tap the heart on any product to save it here.</p>
        <Button asChild className="mt-4 rounded-full">
          <Link to="/shop">Browse products</Link>
        </Button>
      </div>
    )
  return (
    <div className="grid grid-cols-2 gap-x-4 gap-y-10 md:grid-cols-3">
      {items.map((p) => (
        <ProductCard key={p.handle} product={p} />
      ))}
    </div>
  )
}

function Wishlist({ handles }: { handles: string[] }) {
  return (
    <div className="mx-auto max-w-5xl px-4 py-12">
      <h1 className="mb-8 text-4xl font-semibold text-wine">Wishlist</h1>
      <WishlistGrid handles={handles} />
      <p className="mt-10 text-center text-sm text-muted-foreground">
        <Link to="/account" className="font-medium text-wine underline">
          Log in or create an account
        </Link>{" "}
        to track your orders.
      </p>
    </div>
  )
}

export default function Account() {
  return (
    <>
      <Seo title="My account" description="Log in or create your Moondune account to track orders and save your wishlist." noindex />
      <AccountView />
    </>
  )
}
