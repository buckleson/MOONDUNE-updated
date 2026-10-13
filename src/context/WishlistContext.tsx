import { createContext, useContext, type ReactNode } from "react"
import { toast } from "sonner"
import { useLocalStorage } from "@/hooks/useLocalStorage"

interface WishlistState {
  handles: string[]
  has: (handle: string) => boolean
  toggle: (handle: string) => void
}

const WishlistContext = createContext<WishlistState | null>(null)

export function WishlistProvider({ children }: { children: ReactNode }) {
  const [handles, setHandles] = useLocalStorage<string[]>("moondune.wishlist", [])
  const has = (h: string) => handles.includes(h)
  const toggle = (h: string) => {
    const adding = !handles.includes(h)
    setHandles((prev) => (adding ? [...prev, h] : prev.filter((x) => x !== h)))
    toast(adding ? "Saved to wishlist" : "Removed from wishlist")
  }
  return <WishlistContext.Provider value={{ handles, has, toggle }}>{children}</WishlistContext.Provider>
}

export function useWishlist() {
  const ctx = useContext(WishlistContext)
  if (!ctx) throw new Error("useWishlist must be used within WishlistProvider")
  return ctx
}
