import { prisma } from "@/lib/prisma"
import { ProductList } from "@/components/admin/product-list"

async function getProducts() {
  return await prisma.product.findMany({
    orderBy: { createdAt: "desc" },
  })
}

export default async function ProductsPage() {
  const products = await getProducts()

  return (
    <div className="p-8">
      <ProductList products={products} />
    </div>
  )
}
