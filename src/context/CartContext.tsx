import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from "react"
import { toast } from "sonner"
import { discountCodes } from "@/data/content"
import { getProduct, type Product, type Variant } from "@/data/products"
import { useLocalStorage } from "@/hooks/useLocalStorage"

export interface CartLine {
  handle: string
  variantId: string
  quantity: number
}

export interface ResolvedLine extends CartLine {
  product: Product
  variant: Variant
  lineTotal: number
}

interface CartState {
  lines: ResolvedLine[]
  count: number
  subtotal: number
  compareSubtotal: number
  discountCode: string | null
  discountAmount: number
  total: number
  isOpen: boolean
  setOpen: (open: boolean) => void
  addItem: (handle: string, variantId: string, quantity?: number, opts?: { silent?: boolean }) => void
  updateQuantity: (variantId: string, quantity: number) => void
  removeItem: (variantId: string) => void
  clear: () => void
  applyDiscount: (code: string) => boolean
  removeDiscount: () => void
}

const CartContext = createContext<CartState | null>(null)

export const MAX_QTY = 10

export function CartProvider({ children }: { children: ReactNode }) {
  const [raw, setRaw] = useLocalStorage<CartLine[]>("moondune.cart", [])
  const [discountCode, setDiscountCode] = useLocalStorage<string | null>("moondune.discount", null)
  const [isOpen, setOpen] = useState(false)

  const lines = useMemo<ResolvedLine[]>(
    () =>
      raw.flatMap((l) => {
        const product = getProduct(l.handle)
        const variant = product?.variants.find((v) => v.id === l.variantId)
        if (!product || !variant) return []
        return [{ ...l, product, variant, lineTotal: variant.price * l.quantity }]
      }),
    [raw],
  )

  const count = lines.reduce((n, l) => n + l.quantity, 0)
  const subtotal = lines.reduce((n, l) => n + l.lineTotal, 0)
  const compareSubtotal = lines.reduce((n, l) => n + (l.variant.compareAt ?? l.variant.price) * l.quantity, 0)
  const pct = discountCode ? (discountCodes[discountCode] ?? 0) : 0
  const discountAmount = Math.round(subtotal * pct) / 100
  const total = Math.max(0, subtotal - discountAmount)

  const addItem = useCallback<CartState["addItem"]>(
    (handle, variantId, quantity = 1, opts) => {
      setRaw((prev) => {
        const existing = prev.find((l) => l.variantId === variantId)
        if (existing) {
          return prev.map((l) =>
            l.variantId === variantId ? { ...l, quantity: Math.min(MAX_QTY, l.quantity + quantity) } : l,
          )
        }
        return [...prev, { handle, variantId, quantity: Math.min(MAX_QTY, quantity) }]
      })
      if (!opts?.silent) {
        toast.success("Added to cart", { description: getProduct(handle)?.shortTitle })
        setOpen(true)
      }
    },
    [setRaw],
  )

  const updateQuantity = useCallback(
    (variantId: string, quantity: number) =>
      setRaw((prev) =>
        quantity <= 0
          ? prev.filter((l) => l.variantId !== variantId)
          : prev.map((l) => (l.variantId === variantId ? { ...l, quantity: Math.min(MAX_QTY, quantity) } : l)),
      ),
    [setRaw],
  )

  const removeItem = useCallback(
    (variantId: string) => setRaw((prev) => prev.filter((l) => l.variantId !== variantId)),
    [setRaw],
  )

  const clear = useCallback(() => {
    setRaw([])
    setDiscountCode(null)
  }, [setRaw, setDiscountCode])

  const applyDiscount = useCallback(
    (code: string) => {
      const normalized = code.trim().toUpperCase()
      if (!(normalized in discountCodes)) return false
      setDiscountCode(normalized)
      return true
    },
    [setDiscountCode],
  )

  const removeDiscount = useCallback(() => setDiscountCode(null), [setDiscountCode])

  return (
    <CartContext.Provider
      value={{
        lines,
        count,
        subtotal,
        compareSubtotal,
        discountCode,
        discountAmount,
        total,
        isOpen,
        setOpen,
        addItem,
        updateQuantity,
        removeItem,
        clear,
        applyDiscount,
        removeDiscount,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error("useCart must be used within CartProvider")
  return ctx
}
