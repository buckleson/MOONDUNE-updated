import { createContext, useContext, type ReactNode } from "react"
import type { CartLine } from "@/context/CartContext"
import { useLocalStorage } from "@/hooks/useLocalStorage"

export interface OrderLine extends CartLine {
  title: string
  variantTitle: string
  price: number
  image: string
}

export interface Order {
  id: string
  date: string
  lines: OrderLine[]
  subtotal: number
  discount: number
  total: number
  shipping: { name: string; email: string; phone: string; address: string; city: string; emirate: string }
  payment: string
  status: "Processing" | "Shipped" | "Delivered"
}

interface Account {
  name: string
  email: string
  password: string
}

interface AuthState {
  user: { name: string; email: string } | null
  orders: Order[]
  findOrder: (id: string) => Order | undefined
  login: (email: string, password: string) => string | null
  signup: (name: string, email: string, password: string) => string | null
  logout: () => void
  addOrder: (order: Order) => void
}

const AuthContext = createContext<AuthState | null>(null)

// Frontend-only mock auth: accounts live in localStorage. Not for real credentials.
export function AuthProvider({ children }: { children: ReactNode }) {
  const [accounts, setAccounts] = useLocalStorage<Account[]>("moondune.accounts", [])
  const [session, setSession] = useLocalStorage<string | null>("moondune.session", null)
  const [allOrders, setAllOrders] = useLocalStorage<Record<string, Order[]>>("moondune.orders", {})

  const account = accounts.find((a) => a.email === session)
  const user = account ? { name: account.name, email: account.email } : null
  const orders = allOrders[user?.email ?? "guest"] ?? []

  const findOrder = (id: string) =>
    Object.values(allOrders)
      .flat()
      .find((o) => o.id === id)

  const login: AuthState["login"] = (email, password) => {
    const a = accounts.find((x) => x.email === email.trim().toLowerCase())
    if (!a) return "No account found with that email."
    if (a.password !== password) return "Incorrect password."
    setSession(a.email)
    return null
  }

  const signup: AuthState["signup"] = (name, email, password) => {
    const e = email.trim().toLowerCase()
    if (accounts.some((x) => x.email === e)) return "An account with this email already exists."
    setAccounts((prev) => [...prev, { name: name.trim(), email: e, password }])
    setSession(e)
    return null
  }

  const logout = () => setSession(null)

  const addOrder = (order: Order) =>
    setAllOrders((prev) => {
      const key = user?.email ?? "guest"
      return { ...prev, [key]: [order, ...(prev[key] ?? [])] }
    })

  return (
    <AuthContext.Provider value={{ user, orders, findOrder, login, signup, logout, addOrder }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error("useAuth must be used within AuthProvider")
  return ctx
}
