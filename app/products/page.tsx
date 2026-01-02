import { Footer } from "@/components/common/footer"
import HeaderWrapper from "@/components/common/header-wrapper"
import { Product } from "@/lib/types"
import ProductsClient from "./products-client"

async function getProducts(): Promise<Product[]> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/products`, {
    cache: "no-store",
  })

  if (!res.ok) throw new Error("Failed to fetch products")
  const json = await res.json()
  return json.data.products
}

export default async function ProductsPage() {
  const products = await getProducts()

  return (
    <div className="min-h-screen flex flex-col">
      <HeaderWrapper />

      <main className="flex-1">
        <ProductsClient products={products} />
      </main>

      <Footer />
    </div>
  )
}
