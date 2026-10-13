import { lazy, Suspense, useEffect } from "react"
import { BrowserRouter, Navigate, Outlet, Route, Routes, useLocation } from "react-router-dom"
import { Toaster } from "@/components/ui/sonner"
import { CartDrawer } from "@/components/CartDrawer"
import { EmailOffer } from "@/components/EmailOffer"
import { AnnouncementBar } from "@/components/layout/AnnouncementBar"
import { Footer } from "@/components/layout/Footer"
import { Header } from "@/components/layout/Header"
import { WhatsAppButton } from "@/components/WhatsAppButton"
import { AuthProvider } from "@/context/AuthContext"
import { CartProvider } from "@/context/CartContext"
import { WishlistProvider } from "@/context/WishlistContext"
import Home from "@/pages/Home"

// Home ships in the main bundle (most landings); every other route is its own chunk.
const About = lazy(() => import("@/pages/About"))
const Account = lazy(() => import("@/pages/Account"))
const Checkout = lazy(() => import("@/pages/Checkout"))
const Contact = lazy(() => import("@/pages/Contact"))
const Faqs = lazy(() => import("@/pages/Faqs"))
const Ingredients = lazy(() => import("@/pages/Ingredients"))
const NotFound = lazy(() => import("@/pages/NotFound"))
const OrderConfirmation = lazy(() => import("@/pages/OrderConfirmation"))
const Policy = lazy(() => import("@/pages/Policy"))
const ProductPage = lazy(() => import("@/pages/Product"))
const Shop = lazy(() => import("@/pages/Shop"))

function ScrollToTop() {
  const { pathname, hash } = useLocation()
  useEffect(() => {
    if (!hash) window.scrollTo({ top: 0, behavior: "instant" })
  }, [pathname, hash])
  return null
}

function Layout() {
  return (
    <div className="flex min-h-svh flex-col">
      <ScrollToTop />
      <AnnouncementBar />
      <Header />
      <main className="flex-1">
        <Suspense fallback={<div className="min-h-[70vh]" />}>
          <Outlet />
        </Suspense>
      </main>
      <Footer />
      <CartDrawer />
      <WhatsAppButton />
      <EmailOffer />
      <Toaster position="bottom-center" richColors closeButton />
    </div>
  )
}

export default function App() {
  return (
    <BrowserRouter basename={import.meta.env.BASE_URL}>
      <AuthProvider>
        <CartProvider>
          <WishlistProvider>
            <Routes>
              <Route element={<Layout />}>
                <Route index element={<Home />} />
                <Route path="shop" element={<Shop />} />
                <Route path="collections/all" element={<Navigate to="/shop" replace />} />
                <Route path="products/:handle" element={<ProductPage />} />
                <Route path="about" element={<About />} />
                <Route path="about-us" element={<Navigate to="/about" replace />} />
                <Route path="pages/about-us" element={<Navigate to="/about" replace />} />
                <Route path="pages/contact" element={<Navigate to="/contact" replace />} />
                <Route path="ingredients" element={<Ingredients />} />
                <Route path="contact" element={<Contact />} />
                <Route path="faqs" element={<Faqs />} />
                <Route path="policies/:slug" element={<Policy />} />
                <Route path="account" element={<Account />} />
                <Route path="checkout" element={<Checkout />} />
                <Route path="order/:id" element={<OrderConfirmation />} />
                <Route path="*" element={<NotFound />} />
              </Route>
            </Routes>
          </WishlistProvider>
        </CartProvider>
      </AuthProvider>
    </BrowserRouter>
  )
}
