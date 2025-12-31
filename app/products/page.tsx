
import { Footer } from "@/components/common/footer"
import { ProductCard } from "@/components/product-card"
import HeaderWrapper from "@/components/common/header-wrapper"

// Mock all products 
const allProducts = [
  // Washing & Cleaning Solutions
  {
    id: "prod_wash_01",
    name: "Premium Car Wash Shampoo",
    slug: "premium-car-wash-shampoo",
    description: "pH-balanced formula with advanced foam technology for scratch-free cleaning",
    price: 24.99,
    imageUrl: "/car-wash-shampoo-bottle.jpg",
    inStock: true,
    category: "washing-cleaning",
  },
  {
    id: "prod_wash_02",
    name: "Snow Foam Pre-Wash",
    slug: "snow-foam-pre-wash",
    description: "High-density foam formula that loosens dirt before contact washing",
    price: 29.99,
    imageUrl: "/snow-foam-bottle.jpg",
    inStock: true,
    category: "washing-cleaning",
  },
  {
    id: "prod_wash_03",
    name: "All-Purpose Cleaner",
    slug: "all-purpose-cleaner",
    description: "Versatile interior and exterior cleaner safe for all surfaces",
    price: 19.99,
    imageUrl: "/all-purpose-cleaner-spray.jpg",
    inStock: true,
    category: "washing-cleaning",
  },
  {
    id: "prod_wash_04",
    name: "Wheel & Tire Cleaner",
    slug: "wheel-tire-cleaner",
    description: "Powerful formula removes brake dust and road grime from wheels",
    price: 22.99,
    imageUrl: "/wheel-cleaner-bottle.jpg",
    inStock: true,
    category: "washing-cleaning",
  },
  {
    id: "prod_wash_05",
    name: "Glass Cleaner",
    slug: "glass-cleaner",
    description: "Streak-free formula for crystal-clear windows and windshields",
    price: 14.99,
    imageUrl: "/glass-cleaner-spray.jpg",
    inStock: true,
    category: "washing-cleaning",
  },
  {
    id: "prod_wash_06",
    name: "Waterless Wash",
    slug: "waterless-wash",
    description: "Quick detailer spray for touchless cleaning between washes",
    price: 26.99,
    imageUrl: "/waterless-wash-spray.jpg",
    inStock: true,
    category: "washing-cleaning",
  },

  // Polishes & Protectants
  {
    id: "prod_pol_01",
    name: "Ceramic Coating Spray",
    slug: "ceramic-coating-spray",
    description: "Easy-to-apply ceramic protection with 6-month durability",
    price: 49.99,
    imageUrl: "/ceramic-coating-spray-bottle.jpg",
    inStock: true,
    category: "polishes-protectants",
  },
  {
    id: "prod_pol_02",
    name: "Premium Carnauba Wax",
    slug: "premium-carnauba-wax",
    description: "Natural Brazilian carnauba wax for deep, warm shine",
    price: 39.99,
    imageUrl: "/car-wax-jar.jpg",
    inStock: true,
    category: "polishes-protectants",
  },
  {
    id: "prod_pol_03",
    name: "Paint Sealant",
    slug: "paint-sealant",
    description: "Synthetic polymer sealant provides lasting protection for months",
    price: 44.99,
    imageUrl: "/paint-sealant-bottle.jpg",
    inStock: true,
    category: "polishes-protectants",
  },
  {
    id: "prod_pol_04",
    name: "Trim Restorer",
    slug: "trim-restorer",
    description: "Restores faded plastic trim to like-new condition",
    price: 18.99,
    imageUrl: "/trim-restorer-bottle.jpg",
    inStock: true,
    category: "polishes-protectants",
  },
  {
    id: "prod_pol_05",
    name: "Tire Shine Gel",
    slug: "tire-shine-gel",
    description: "Long-lasting gel formula for deep black tire finish",
    price: 16.99,
    imageUrl: "/tire-shine-gel-bottle.jpg",
    inStock: true,
    category: "polishes-protectants",
  },
  {
    id: "prod_pol_06",
    name: "Compound & Polish Kit",
    slug: "compound-polish-kit",
    description: "Complete correction system for removing scratches and swirls",
    price: 64.99,
    imageUrl: "/compound-polish-kit.jpg",
    inStock: true,
    category: "polishes-protectants",
  },

  // Accessories & Tools
  {
    id: "prod_tool_01",
    name: "Microfiber Towel Set",
    slug: "microfiber-towel-set",
    description: "Professional-grade ultra-soft towels, pack of 6",
    price: 29.99,
    imageUrl: "/microfiber-towels.png",
    inStock: true,
    category: "accessories-tools",
  },
  {
    id: "prod_tool_02",
    name: "Foam Wash Pad",
    slug: "foam-wash-pad",
    description: "Thick foam pad with ergonomic design for safe washing",
    price: 12.99,
    imageUrl: "/foam-wash-pad.jpg",
    inStock: true,
    category: "accessories-tools",
  },
  {
    id: "prod_tool_03",
    name: "Detailing Brush Set",
    slug: "detailing-brush-set",
    description: "10-piece brush set for interior and exterior detailing",
    price: 34.99,
    imageUrl: "/detailing-brushes.jpg",
    inStock: true,
    category: "accessories-tools",
  },
  {
    id: "prod_tool_04",
    name: "Pressure Washer Foam Gun",
    slug: "pressure-washer-foam-gun",
    description: "Professional foam cannon for pressure washers",
    price: 54.99,
    imageUrl: "/foam-gun-cannon.jpg",
    inStock: true,
    category: "accessories-tools",
  },
  {
    id: "prod_tool_05",
    name: "Dual-Action Polisher",
    slug: "dual-action-polisher",
    description: "Variable speed DA polisher for safe paint correction",
    price: 149.99,
    imageUrl: "/placeholder.svg?height=400&width=400",
    inStock: true,
    category: "accessories-tools",
  },
  {
    id: "prod_tool_06",
    name: "Bucket & Grit Guard Set",
    slug: "bucket-grit-guard-set",
    description: "Two-bucket wash system with grit guards included",
    price: 44.99,
    imageUrl: "/placeholder.svg?height=400&width=400",
    inStock: true,
    category: "accessories-tools",
  },
]

export default function ProductsPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <HeaderWrapper />

      <main className="flex-1">
        <div className="container mx-auto px-4 py-12">
          <div className="mb-12">
            <h1 className="text-4xl font-bold mb-4">All Products</h1>
            <p className="text-muted-foreground text-lg">
              Browse our complete collection of professional automotive care products
            </p>
          </div>

          {/* Washing & Cleaning Solutions */}
          <section className="mb-16">
            <h2 className="text-2xl font-bold mb-6">Washing & Cleaning Solutions</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-6">
              {allProducts
                .filter((p) => p.category === "washing-cleaning")
                .map((product) => (
                  <ProductCard key={product.id} {...product} />
                ))}
            </div>
          </section>

          {/* Polishes & Protectants */}
          <section className="mb-16">
            <h2 className="text-2xl font-bold mb-6">Polishes & Protectants</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-6">
              {allProducts
                .filter((p) => p.category === "polishes-protectants")
                .map((product) => (
                  <ProductCard key={product.id} {...product} />
                ))}
            </div>
          </section>

          {/* Accessories & Tools */}
          <section>
            <h2 className="text-2xl font-bold mb-6">Accessories & Tools</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-6">
              {allProducts
                .filter((p) => p.category === "accessories-tools")
                .map((product) => (
                  <ProductCard key={product.id} {...product} />
                ))}
            </div>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  )
}
