import { prisma } from "@/lib/prisma"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { OrderStatusSelector } from "@/components/admin/order-status-selector"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import Image from "next/image"
import { notFound } from "next/navigation"

async function getOrder(id: string) {
  const order = await prisma.order.findUnique({
    where: { id },
    include: {
      user: {
        select: {
          id: true,
          name: true,
          email: true,
        },
      },
      items: {
        include: {
          product: {
            select: {
              id: true,
              name: true,
              image: true,
            },
          },
        },
      },
    },
  })

  if (!order) notFound()

  return order
}

export default async function OrderDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const order = await getOrder(id)
  const shippingAddress = order.shippingAddress as any

  return (
    <div className="space-y-6 p-8">
      <div>
        <h1 className="text-3xl font-bold">Order Details</h1>
        <p className="text-muted-foreground">Order ID: {order.id}</p>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Order Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Status</span>
              <OrderStatusSelector orderId={order.id} currentStatus={order.status} />
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Payment Status</span>
              <Badge variant={order.paymentStatus === "paid" ? "default" : "secondary"}>{order.paymentStatus}</Badge>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Payment Method</span>
              <span className="font-medium">{order.paymentMethod}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Total</span>
              <span className="text-lg font-bold">${order.total.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Order Date</span>
              <span>{new Date(order.createdAt).toLocaleString()}</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Customer Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <div className="text-sm text-muted-foreground">Name</div>
              <div className="font-medium">{order.user.name}</div>
            </div>
            <div>
              <div className="text-sm text-muted-foreground">Email</div>
              <div className="font-medium">{order.user.email}</div>
            </div>
            <div>
              <div className="text-sm text-muted-foreground">Shipping Address</div>
              <div className="font-medium">
                {shippingAddress?.street && <div>{shippingAddress.street}</div>}
                {shippingAddress?.city && (
                  <div>
                    {shippingAddress.city}, {shippingAddress.state} {shippingAddress.zip}
                  </div>
                )}
                {shippingAddress?.country && <div>{shippingAddress.country}</div>}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Order Items</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Product</TableHead>
                <TableHead>Quantity</TableHead>
                <TableHead>Price</TableHead>
                <TableHead className="text-right">Subtotal</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {order.items.map((item) => (
                <TableRow key={item.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Image
                        src={item.product.image || "/placeholder.svg"}
                        alt={item.product.name}
                        width={50}
                        height={50}
                        className="rounded-md object-cover"
                      />
                      <span className="font-medium">{item.product.name}</span>
                    </div>
                  </TableCell>
                  <TableCell>{item.quantity}</TableCell>
                  <TableCell>${item.price.toFixed(2)}</TableCell>
                  <TableCell className="text-right">${(item.quantity * item.price).toFixed(2)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
