
import { Footer } from "@/components/common/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { CheckCircle } from "lucide-react"
import Link from "next/link"
import { getSession } from "@/lib/auth"
import { redirect, notFound } from "next/navigation"
import { prisma } from "@/lib/prisma"
import HeaderWrapper from "@/components/common/header-wrapper"

export default async function OrderConfirmationPage({
  params,
}: {
  params: { id: string }
}) {
  const session = await getSession()

  if (!session) {
    redirect("/login")
  }

  // Fetch order with items + products
  const order = await prisma.order.findUnique({
    where: { id: params.id },
    include: {
      items: {
        include: {
          product: true,
        },
      },
    },
  })

  //Ensure order exists and belongs to user
  if (!order || order.userId !== session.id) {
    notFound()
  }

  return (
    <div className="min-h-screen flex flex-col">
      <HeaderWrapper />

      <main className="flex-1">
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-2xl mx-auto text-center mb-8">
            <div className="flex justify-center mb-4">
              <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center">
                <CheckCircle className="w-10 h-10 text-accent" />
              </div>
            </div>

            <h1 className="text-4xl font-bold mb-2">Order Confirmed!</h1>
            <p className="text-muted-foreground text-lg">
              Thank you for your purchase
            </p>
            <p className="text-sm text-muted-foreground mt-2">
              Order #{order.id.slice(0, 8).toUpperCase()}
            </p>
          </div>

          <Card className="max-w-2xl mx-auto">
            <CardContent className="p-6">
              <h2 className="font-bold text-xl mb-4">Order Details</h2>

              <div className="space-y-4 mb-6">
                {order.items.map((item) => (
                  <div
                    key={item.id}
                    className="flex justify-between items-start py-3 border-b last:border-0"
                  >
                    <div>
                      <p className="font-medium">{item.product.name}</p>
                      <p className="text-sm text-muted-foreground">
                        Quantity: {item.quantity}
                      </p>
                    </div>
                    <p className="font-medium">
                      ${(item.price * item.quantity).toFixed(2)}
                    </p>
                  </div>
                ))}
              </div>

              <div className="border-t pt-4">
                <div className="flex justify-between text-xl font-bold">
                  <span>Total</span>
                  <span>${order.total.toFixed(2)}</span>
                </div>
              </div>

              <div className="mt-6 pt-6 border-t">
                <p className="text-sm text-muted-foreground mb-4">
                  A confirmation email has been sent to {session.email}
                </p>
                <div className="flex gap-3">
                  <Button asChild className="flex-1">
                    <Link href="/products">Continue Shopping</Link>
                  </Button>
                  <Button
                    variant="outline"
                    asChild
                    className="flex-1 bg-transparent"
                  >
                    <Link href="/">Go Home</Link>
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>

      <Footer />
    </div>
  )
}
