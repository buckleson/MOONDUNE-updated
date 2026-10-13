import { Link } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Seo } from "@/components/Seo"

export default function NotFound() {
  return (
    <div className="mx-auto max-w-xl px-4 py-28 text-center">
      <Seo title="Page not found" description="This page could not be found." noindex />
      <p className="font-heading text-8xl text-gold">404</p>
      <h1 className="mt-2 text-4xl font-semibold text-wine">Lost in the dunes</h1>
      <p className="mt-3 text-muted-foreground">The page you're looking for doesn't exist or has moved.</p>
      <div className="mt-8 flex justify-center gap-3">
        <Button asChild className="rounded-full px-8">
          <Link to="/">Back home</Link>
        </Button>
        <Button asChild variant="outline" className="rounded-full px-8">
          <Link to="/shop">Shop all</Link>
        </Button>
      </div>
    </div>
  )
}
