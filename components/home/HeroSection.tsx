import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function HeroSection() {
  return (
    <section className="relative bg-primary text-primary-foreground py-20 md:py-32">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl">
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6 text-balance">
            Premium Automotive Care Products
          </h1>
          <p className="text-lg md:text-xl text-primary-foreground/90 mb-8 leading-relaxed">
            Professional-grade solutions for car enthusiasts and detailers who demand excellence.
          </p>
          <div className="flex flex-wrap gap-4">
            <Button size="lg" variant="secondary" asChild>
              <Link href="/products">Shop Products</Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="bg-transparent border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary"
              asChild
            >
              <Link href="/services">Our Services</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
