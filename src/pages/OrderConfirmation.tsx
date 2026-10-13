import { Link, useParams } from "react-router-dom"
import { CheckCircle2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { useAuth } from "@/context/AuthContext"
import { formatAED } from "@/data/products"
import NotFound from "@/pages/NotFound"
import { Seo } from "@/components/Seo"

export default function OrderConfirmation() {
  const { id = "" } = useParams()
  const { findOrder, user } = useAuth()
  const order = findOrder(id)
  if (!order) return <NotFound />

  return (
    <div className="mx-auto max-w-2xl px-4 py-16">
      <Seo title="Order confirmed" description="Your Moondune order is confirmed." noindex />
      <div className="text-center">
        <CheckCircle2 className="mx-auto size-16 text-success" />
        <h1 className="mt-4 text-4xl font-semibold text-wine">Thank you, {order.shipping.name.split(" ")[0]}!</h1>
        <p className="mt-2 text-muted-foreground">
          Your order <span className="font-semibold text-wine">#{order.id}</span> is confirmed. A confirmation will be sent to{" "}
          {order.shipping.email}.
        </p>
      </div>

      <div className="mt-10 space-y-4 rounded-2xl border p-6">
        <ul className="space-y-3">
          {order.lines.map((l) => (
            <li key={l.variantId} className="flex items-center gap-3">
              <img src={l.image} alt="" className="size-14 rounded-lg bg-wine-50 object-cover" />
              <div className="flex-1 text-sm">
                <p className="font-medium">{l.title}</p>
                <p className="text-muted-foreground">
                  Qty {l.quantity}
                  {l.variantTitle !== "Default" && ` · ${l.variantTitle}`}
                </p>
              </div>
              <p className="text-sm font-medium">{formatAED(l.price * l.quantity)}</p>
            </li>
          ))}
        </ul>
        <Separator />
        <div className="space-y-1 text-sm">
          <div className="flex justify-between">
            <span>Subtotal</span>
            <span>{formatAED(order.subtotal)}</span>
          </div>
          {order.discount > 0 && (
            <div className="flex justify-between text-success">
              <span>Discount</span>
              <span>−{formatAED(order.discount)}</span>
            </div>
          )}
          <div className="flex justify-between">
            <span>Shipping</span>
            <span>Free</span>
          </div>
          <div className="flex justify-between pt-1 text-base font-semibold">
            <span>Total paid</span>
            <span>{formatAED(order.total)}</span>
          </div>
        </div>
        <Separator />
        <div className="grid gap-4 text-sm sm:grid-cols-2">
          <div>
            <p className="mb-1 font-semibold">Shipping to</p>
            <p className="text-muted-foreground">
              {order.shipping.name}
              <br />
              {order.shipping.address}
              <br />
              {order.shipping.city}, {order.shipping.emirate}
              <br />
              {order.shipping.phone}
            </p>
          </div>
          <div>
            <p className="mb-1 font-semibold">Payment</p>
            <p className="text-muted-foreground">{order.payment}</p>
            <p className="mt-3 mb-1 font-semibold">Delivery</p>
            <p className="text-muted-foreground">Aramex · estimated within 2 days</p>
          </div>
        </div>
      </div>

      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <Button asChild className="rounded-full px-8">
          <Link to="/shop">Continue shopping</Link>
        </Button>
        {user && (
          <Button asChild variant="outline" className="rounded-full px-8">
            <Link to="/account?tab=orders">View my orders</Link>
          </Button>
        )}
      </div>
    </div>
  )
}
