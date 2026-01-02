import { notFound } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { Footer } from "@/components/common/footer"
import { AddToCartButton } from "@/components/add-to-cart-button"
import { Badge } from "@/components/ui/badge"
import { ChevronLeft, ShieldCheck, Truck, RotateCcw } from "lucide-react"
import HeaderWrapper from "@/components/common/header-wrapper"
import { Product } from "@/lib/types"


async function getProduct(slug: string): Promise<Product | null> {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_APP_URL}/api/products/${slug}`,
    { cache: "no-store" }
  )

  if (res.status === 404) return null
  if (!res.ok) throw new Error("Failed to fetch product")

  const json = await res.json()
  return json.data.product
}

export default async function ProductDetailPage({
  params,
}: {
  params: { slug: string }
}) {
  const product = await getProduct(params.slug)

  if (!product) notFound()

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
                src={product.image || "/placeholder.svg"}
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

function Info({
  icon,
  title,
}: {
  icon: React.ReactNode
  title: string
}) {
  return (
    <div className="flex items-center gap-3">
      <span className="text-accent">{icon}</span>
      <p className="text-sm font-medium">{title}</p>
    </div>
  )
}
