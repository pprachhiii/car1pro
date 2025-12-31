import { Sparkles, Shield, Truck } from "lucide-react"

export default function FeaturesSection() {
  return (
    <section className="py-16 border-b">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="flex items-start gap-4">
            <div className="flex-shrink-0 w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center">
              <Sparkles className="w-6 h-6 text-accent" />
            </div>
            <div>
              <h3 className="font-semibold mb-2">Premium Quality</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Professional-grade formulas designed for superior results
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="flex-shrink-0 w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center">
              <Shield className="w-6 h-6 text-accent" />
            </div>
            <div>
              <h3 className="font-semibold mb-2">Safe Formulas</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                pH-balanced and safe for all surfaces and finishes
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="flex-shrink-0 w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center">
              <Truck className="w-6 h-6 text-accent" />
            </div>
            <div>
              <h3 className="font-semibold mb-2">Fast Shipping</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Quick delivery on all orders with tracking included
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
