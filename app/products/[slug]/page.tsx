import { notFound } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { Footer } from "@/components/footer"
import { AddToCartButton } from "@/components/add-to-cart-button"
import { Badge } from "@/components/ui/badge"
import { ChevronLeft, ShieldCheck, Truck, RotateCcw } from "lucide-react"
import HeaderWrapper from "@/components/header-wrapper"

// Mock product data - in production, fetch from database
const products: Record<string, any> = {
  "premium-car-wash-shampoo": {
    id: "prod_wash_01",
    name: "Premium Car Wash Shampoo",
    slug: "premium-car-wash-shampoo",
    description: "pH-balanced formula with advanced foam technology for scratch-free cleaning",
    longDescription:
      "Our Premium Car Wash Shampoo is specially formulated with advanced pH-balanced technology to provide a safe, scratch-free clean every time. The high-foam formula creates a thick layer of suds that lifts and encapsulates dirt particles, preventing them from scratching your paint during the wash process. Safe for all paint types, clear coats, and ceramic coatings.",
    price: 24.99,
    imageUrl: "/car-wash-shampoo-bottle.jpg",
    inStock: true,
    category: "Washing & Cleaning Solutions",
    features: [
      "pH-balanced formula safe for all paint types",
      "Advanced foam technology for scratch-free washing",
      "Compatible with ceramic coatings",
      "Pleasant fresh scent",
      "1 gallon / 3.78 liters",
    ],
  },
  "snow-foam-pre-wash": {
    id: "prod_wash_02",
    name: "Snow Foam Pre-Wash",
    slug: "snow-foam-pre-wash",
    description: "High-density foam formula that loosens dirt before contact washing",
    longDescription:
      "Our Snow Foam Pre-Wash creates a thick blanket of foam that clings to your vehicle's surface, breaking down dirt, grime, and road film before you even touch the paint. This pre-wash step significantly reduces the risk of scratching during the main wash by loosening and lifting away the heaviest contamination.",
    price: 29.99,
    imageUrl: "/snow-foam-bottle.jpg",
    inStock: true,
    category: "Washing & Cleaning Solutions",
    features: [
      "High-density foam clings to vertical surfaces",
      "Loosens heavy dirt and grime",
      "Reduces wash-induced scratches",
      "Works with foam cannons and foam guns",
      "1 liter concentrated formula",
    ],
  },
  "ceramic-coating-spray": {
    id: "prod_pol_01",
    name: "Ceramic Coating Spray",
    slug: "ceramic-coating-spray",
    description: "Easy-to-apply ceramic protection with 6-month durability",
    longDescription:
      "Get professional-grade ceramic protection in minutes with our easy-to-use spray formula. This advanced SiO2-based coating creates a hydrophobic barrier that repels water, dirt, and contaminants while enhancing gloss and depth. Perfect for maintaining existing coatings or as a standalone protectant.",
    price: 49.99,
    imageUrl: "/ceramic-coating-spray-bottle.jpg",
    inStock: true,
    category: "Polishes & Protectants",
    features: [
      "SiO2 ceramic technology",
      "Up to 6 months of protection",
      "Hydrophobic water beading",
      "Enhances gloss and depth",
      "500ml spray bottle",
    ],
  },
  "premium-carnauba-wax": {
    id: "prod_pol_02",
    name: "Premium Carnauba Wax",
    slug: "premium-carnauba-wax",
    description: "Natural Brazilian carnauba wax for deep, warm shine",
    longDescription:
      "Experience the legendary deep, warm glow that only pure Brazilian carnauba wax can deliver. Our premium blend contains a high concentration of Grade #1 Yellow Carnauba, creating a rich, dimensional shine with excellent water beading and protection lasting up to 3 months.",
    price: 39.99,
    imageUrl: "/car-wax-jar.jpg",
    inStock: true,
    category: "Polishes & Protectants",
    features: [
      "Grade #1 Brazilian Yellow Carnauba",
      "Deep, warm, dimensional shine",
      "Easy on, easy off application",
      "Up to 3 months protection",
      "8 oz / 227g jar",
    ],
  },
  "microfiber-towel-set": {
    id: "prod_tool_01",
    name: "Microfiber Towel Set",
    slug: "microfiber-towel-set",
    description: "Professional-grade ultra-soft towels, pack of 6",
    longDescription:
      "These professional-grade microfiber towels are designed for safe, scratch-free drying and buffing. Made from premium 350 GSM microfiber with ultra-soft edges, they absorb significantly more water than traditional towels while being gentle on all surfaces.",
    price: 29.99,
    imageUrl: "/microfiber-towels.png",
    inStock: true,
    category: "Accessories & Tools",
    features: [
      "Premium 350 GSM microfiber",
      "Ultra-soft, scratch-free edges",
      "Highly absorbent",
      "Machine washable",
      '6-pack, 16" x 16" size',
    ],
  },
}

export default function ProductDetailPage({ params }: { params: { slug: string } }) {
  const product = products[params.slug]

  if (!product) {
    notFound()
  }

  return (
    <div className="min-h-screen flex flex-col">
      <HeaderWrapper />

      <main className="flex-1">
        <div className="container mx-auto px-4 py-8">
          <Link
            href="/products"
            className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground mb-8 transition-colors"
          >
            <ChevronLeft className="h-4 w-4 mr-1" />
            Back to Products
          </Link>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Product Image */}
            <div className="bg-muted rounded-lg overflow-hidden aspect-square">
              <Image
                src={product.imageUrl || "/placeholder.svg"}
                alt={product.name}
                width={600}
                height={600}
                className="object-cover w-full h-full"
              />
            </div>

            {/* Product Info */}
            <div>
              <Badge variant="secondary" className="mb-4">
                {product.category}
              </Badge>

              <h1 className="text-4xl font-bold mb-4">{product.name}</h1>

              <p className="text-2xl font-bold mb-6">${product.price.toFixed(2)}</p>

              <p className="text-muted-foreground leading-relaxed mb-6">{product.longDescription}</p>

              <div className="mb-8">
                <h3 className="font-semibold mb-3">Key Features:</h3>
                <ul className="space-y-2">
                  {product.features.map((feature: string, index: number) => (
                    <li key={index} className="flex items-start gap-2 text-sm">
                      <span className="text-accent mt-1">•</span>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <AddToCartButton productId={product.id} inStock={product.inStock} />

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-6 border-t mt-6">
                <div className="flex items-center gap-3">
                  <ShieldCheck className="h-5 w-5 text-accent flex-shrink-0" />
                  <div>
                    <p className="text-sm font-medium">Quality Guaranteed</p>
                    <p className="text-xs text-muted-foreground">Premium formula</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Truck className="h-5 w-5 text-accent flex-shrink-0" />
                  <div>
                    <p className="text-sm font-medium">Fast Shipping</p>
                    <p className="text-xs text-muted-foreground">2-3 day delivery</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <RotateCcw className="h-5 w-5 text-accent flex-shrink-0" />
                  <div>
                    <p className="text-sm font-medium">Easy Returns</p>
                    <p className="text-xs text-muted-foreground">30-day policy</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
