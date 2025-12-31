
import { Footer } from "@/components/common/footer"
import { CartItems } from "@/components/cart-items"
import { getSession } from "@/lib/auth"
import { redirect } from "next/navigation"
import { prisma } from "@/lib/prisma"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import HeaderWrapper from "@/components/common/header-wrapper"

export default async function CartPage() {
  const session = await getSession()

  if (!session) {
    redirect("/login")
  }

  const cart = await prisma.cart.findFirst({
    where: { userId: session.id },
    include: {
      items: {
        include: {
          product: true, 
        },
      },
    },
  })

  const isEmpty = !cart || cart.items.length === 0

  return (
    <div className="min-h-screen flex flex-col">
      <HeaderWrapper />

      <main className="flex-1">
        <div className="container mx-auto px-4 py-12">
          <h1 className="text-4xl font-bold mb-8">Shopping Cart</h1>

          {isEmpty ? (
            <div className="text-center py-16">
              <p className="text-xl text-muted-foreground mb-6">
                Your cart is empty
              </p>
              <Button asChild>
                <Link href="/products">Continue Shopping</Link>
              </Button>
            </div>
          ) : (
<CartItems
  items={cart.items.map((item) => ({
    id: item.id,
    quantity: item.quantity,
    product: {
      id: item.product.id,
      name: item.product.name,
      slug: item.product.slug,
      price: item.product.price,
      imageUrl: item.product.image, 
    },
  }))}
/>
          )}
        </div>
      </main>

      <Footer />
    </div>
  )
}
