import { prisma } from "@/lib/prisma"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { OrderStatusSelector } from "@/components/admin/order-status-selector"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import { Eye } from "lucide-react"
import { Button } from "@/components/ui/button"

async function getOrders() {
  return await prisma.order.findMany({
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
              name: true,
            },
          },
        },
      },
    },
    orderBy: { createdAt: "desc" },
  })
}

export default async function OrdersPage() {
  const orders = await getOrders()

  return (
    <div className="space-y-6 p-8">
      <div>
        <h1 className="text-3xl font-bold">Orders</h1>
        <p className="text-muted-foreground">Manage customer orders</p>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Order ID</TableHead>
              <TableHead>Customer</TableHead>
              <TableHead>Items</TableHead>
              <TableHead>Total</TableHead>
              <TableHead>Payment</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Date</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {orders.map((order) => (
              <TableRow key={order.id}>
                <TableCell className="font-mono text-xs">{order.id.slice(0, 8)}...</TableCell>
                <TableCell>
                  <div>
                    <div className="font-medium">{order.user.name}</div>
                    <div className="text-sm text-muted-foreground">{order.user.email}</div>
                  </div>
                </TableCell>
                <TableCell>{order.items.length} items</TableCell>
                <TableCell className="font-medium">${order.total.toFixed(2)}</TableCell>
                <TableCell>
                  <Badge variant={order.paymentStatus === "paid" ? "default" : "secondary"}>
                    {order.paymentStatus}
                  </Badge>
                </TableCell>
                <TableCell>
                  <OrderStatusSelector orderId={order.id} currentStatus={order.status} />
                </TableCell>
                <TableCell>{new Date(order.createdAt).toLocaleDateString()}</TableCell>
                <TableCell className="text-right">
                  <Button variant="ghost" size="sm" asChild>
                    <Link href={`/admin/orders/${order.id}`}>
                      <Eye className="h-4 w-4" />
                    </Link>
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
