import Link from "next/link"
import { Footer } from "@/components/footer"
import { ProductCard } from "@/components/product-card"
import { Button } from "@/components/ui/button"
import { Sparkles, Shield, Truck, ArrowRight, Star } from "lucide-react"
import HeaderWrapper from "@/components/header-wrapper"

const testimonials = [
    {
      name: 'Ahmed Al Mansoori',
      text: 'CAR1PRO products transformed my car care routine. The BubbleWash foam is incredible!',
      rating: 5,
    },
    {
      name: 'Sarah Johnson',
      text: 'Professional quality products and excellent service. Highly recommended!',
      rating: 5,
    },
  ];
  
// Mock featured products - in production, fetch from database
const featuredProducts = [
  {
    id: "prod_wash_01",
    name: "Premium Car Wash Shampoo",
    slug: "premium-car-wash-shampoo",
    description: "pH-balanced formula with advanced foam technology for scratch-free cleaning",
    price: 24.99,
    imageUrl: "/car-wash-shampoo-bottle.jpg",
    inStock: true,
  },
  {
    id: "prod_wash_02",
    name: "Snow Foam Pre-Wash",
    slug: "snow-foam-pre-wash",
    description: "High-density foam formula that loosens dirt before contact washing",
    price: 29.99,
    imageUrl: "/snow-foam-bottle.jpg",
    inStock: true,
  },
  {
    id: "prod_pol_01",
    name: "Ceramic Coating Spray",
    slug: "ceramic-coating-spray",
    description: "Easy-to-apply ceramic protection with 6-month durability",
    price: 49.99,
    imageUrl: "/ceramic-coating-spray-bottle.jpg",
    inStock: true,
  },
  {
    id: "prod_pol_02",
    name: "Premium Carnauba Wax",
    slug: "premium-carnauba-wax",
    description: "Natural Brazilian carnauba wax for deep, warm shine",
    price: 39.99,
    imageUrl: "/car-wax-jar.jpg",
    inStock: true,
  },
  {
    id: "prod_tool_01",
    name: "Microfiber Towel Set",
    slug: "microfiber-towel-set",
    description: "Professional-grade ultra-soft towels, pack of 6",
    price: 29.99,
    imageUrl: "/microfiber-towels.png",
    inStock: true,
  },
]

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col">
      <HeaderWrapper />

      <main className="flex-1">
        {/* Hero Section */}
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

        {/* Features */}
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

        {/* Featured Products */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="text-3xl font-bold mb-2">Featured Products</h2>
                <p className="text-muted-foreground">Our most popular automotive care solutions</p>
              </div>
              <Button variant="outline" asChild className="hidden md:flex bg-transparent">
                <Link href="/products">View All Products</Link>
              </Button>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-6">
              {featuredProducts.map((product) => (
                <ProductCard key={product.id} {...product} />
              ))}
            </div>

            <div className="mt-8 text-center md:hidden">
              <Button variant="outline" asChild className="w-full bg-transparent">
                <Link href="/products">View All Products</Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Categories */}
        <section className="py-16 bg-muted/30">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-8 text-center">Shop by Category</h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Link href="/products?category=washing-cleaning" className="group">
                <div className="bg-card rounded-lg p-8 hover:shadow-lg transition-shadow">
                  <h3 className="text-xl font-semibold mb-2 group-hover:text-accent transition-colors">
                    Washing & Cleaning
                  </h3>
                  <p className="text-muted-foreground text-sm">Premium soaps, shampoos, and cleaning solutions</p>
                </div>
              </Link>

              <Link href="/products?category=polishes-protectants" className="group">
                <div className="bg-card rounded-lg p-8 hover:shadow-lg transition-shadow">
                  <h3 className="text-xl font-semibold mb-2 group-hover:text-accent transition-colors">
                    Polishes & Protectants
                  </h3>
                  <p className="text-muted-foreground text-sm">Waxes, sealants, and ceramic coatings</p>
                </div>
              </Link>

              <Link href="/products?category=accessories-tools" className="group">
                <div className="bg-card rounded-lg p-8 hover:shadow-lg transition-shadow">
                  <h3 className="text-xl font-semibold mb-2 group-hover:text-accent transition-colors">
                    Accessories & Tools
                  </h3>
                  <p className="text-muted-foreground text-sm">Professional-grade detailing equipment</p>
                </div>
              </Link>
            </div>
          </div>
        </section>
      </main>
      {/* Testimonials Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl text-center mb-12">What Our Clients Say</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-gray-50 p-8 rounded-lg">
                <div className="flex gap-1 mb-4">
                  {Array.from({ length: testimonial.rating }).map((_, i) => (
                    <Star key={i} size={20} fill="#FCD34D" stroke="#FCD34D" />
                  ))}
                </div>
                <p className="text-gray-700 mb-4 italic">"{testimonial.text}"</p>
                <p className="text-gray-900">— {testimonial.name}</p>
              </div>
            ))}
          </div>
          {/* <div className="text-center mt-8">
            <Link href="/testimonials" className="text-blue-600 hover:text-blue-700 inline-flex items-center gap-2">
              Read More Reviews <ArrowRight size={16} />
            </Link>
          </div> */}
        </div>
      </section>

      
      <Footer />
    </div>
  )
}
