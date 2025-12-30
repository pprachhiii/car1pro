
import { Footer } from "@/components/footer"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Sparkles, Wrench, Package, Phone } from "lucide-react"
import Link from "next/link"
import HeaderWrapper from "@/components/header-wrapper"

const services = [
  {
    icon: Sparkles,
    title: "Professional Detailing",
    description: "Complete interior and exterior detailing services using our premium product line",
    features: [
      "Full paint correction and polishing",
      "Ceramic coating application",
      "Interior deep cleaning and protection",
      "Engine bay detailing",
    ],
  },
  {
    icon: Wrench,
    title: "Paint Protection",
    description: "Long-lasting protection solutions to keep your vehicle looking showroom fresh",
    features: [
      "Professional ceramic coating installation",
      "Paint protection film (PPF) application",
      "Nano-coating treatments",
      "Multi-year warranty options",
    ],
  },
  {
    icon: Package,
    title: "Mobile Detailing",
    description: "Convenient on-site detailing services at your home or office",
    features: [
      "Fully equipped mobile unit",
      "Same products as in-shop service",
      "Flexible scheduling",
      "Service area coverage",
    ],
  },
  {
    icon: Phone,
    title: "Consultation Services",
    description: "Expert advice on product selection and proper application techniques",
    features: [
      "One-on-one product recommendations",
      "Application technique training",
      "Maintenance schedule planning",
      "Custom detailing solutions",
    ],
  },
]

export default function ServicesPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <HeaderWrapper />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-primary text-primary-foreground py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl">
              <h1 className="text-4xl md:text-5xl font-bold mb-6 text-balance">Professional Detailing Services</h1>
              <p className="text-lg md:text-xl text-primary-foreground/90 leading-relaxed">
                Expert care for your vehicle using our premium CAR1PRO product line
              </p>
            </div>
          </div>
        </section>

        {/* Services Grid */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {services.map((service) => {
                const Icon = service.icon
                return (
                  <Card key={service.title} className="hover:shadow-lg transition-shadow">
                    <CardContent className="p-8">
                      <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center mb-4">
                        <Icon className="w-6 h-6 text-accent" />
                      </div>
                      <h3 className="text-2xl font-bold mb-3">{service.title}</h3>
                      <p className="text-muted-foreground mb-4 leading-relaxed">{service.description}</p>
                      <ul className="space-y-2">
                        {service.features.map((feature, index) => (
                          <li key={index} className="flex items-start gap-2 text-sm">
                            <span className="text-accent mt-1">•</span>
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl font-bold mb-4">Ready to Transform Your Vehicle?</h2>
              <p className="text-muted-foreground mb-8 leading-relaxed">
                Contact us today to schedule a service or learn more about our professional detailing offerings
              </p>
              <div className="flex flex-wrap gap-4 justify-center">
                <Button size="lg" asChild>
                  <Link href="/contact">Get in Touch</Link>
                </Button>
                <Button size="lg" variant="outline" asChild className="bg-transparent">
                  <Link href="/products">Shop Products</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
