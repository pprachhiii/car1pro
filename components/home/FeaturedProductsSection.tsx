import Link from "next/link"
import { ProductCard } from "@/components/product-card"
import { Button } from "@/components/ui/button"

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

export default function FeaturedProductsSection() {
  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-3xl font-bold mb-2">Featured Products</h2>
            <p className="text-muted-foreground">
              Our most popular automotive care solutions
            </p>
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
  )
}
