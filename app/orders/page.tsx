import { getSession } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import { redirect } from "next/navigation"
import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import HeaderWrapper from "@/components/common/header-wrapper"
import { Footer } from "@/components/common/footer"

export default async function MyOrdersPage() {
  const session = await getSession()
  if (!session) redirect("/login")

  const orders = await prisma.order.findMany({
    where: { userId: session.id },
    orderBy: { createdAt: "desc" },
  })

  return (
    <div className="min-h-screen flex flex-col">
      <HeaderWrapper />

      <main className="flex-1 container mx-auto px-4 py-10">
        <h1 className="text-3xl font-bold mb-6">My Orders</h1>

        {orders.length === 0 ? (
          <p className="text-muted-foreground">You have no orders yet.</p>
        ) : (
          <div className="space-y-4">
            {orders.map((order) => (
              <Card key={order.id}>
                <CardContent className="flex justify-between items-center p-4">
                  <div>
                    <p className="font-medium">
                      Order #{order.id.slice(0, 8).toUpperCase()}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {new Date(order.createdAt).toDateString()}
                    </p>
                  </div>

                  <div className="flex items-center gap-4">
                    <p className="font-bold">₹{order.total.toFixed(2)}</p>
                    <Link
                      href={`/orders/${order.id}`}
                      className="text-sm font-medium text-accent hover:underline"
                    >
                      View
                    </Link>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </main>

      <Footer />
    </div>
  )
}
