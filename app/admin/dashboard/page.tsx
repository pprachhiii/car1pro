import { prisma } from "@/lib/prisma"
import { requireAdmin } from "@/lib/auth"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Users, Package, ShoppingCart, DollarSign, AlertTriangle } from "lucide-react"

export default async function AdminDashboard() {
  // Protect page
  const session = await requireAdmin()
  if (!session) return null

  // DATA QUERIES (DIRECT PRISMA)
  const totalUsers = await prisma.user.count()

  const totalProducts = await prisma.product.count({
    where: { isActive: true },
  })

  const totalOrders = await prisma.order.count()

  const revenue = await prisma.order.aggregate({
    where: { paymentStatus: "paid" },
    _sum: { total: true },
  })
  const totalRevenue = revenue._sum.total || 0

  const lowStockProducts = await prisma.product.findMany({
    where: {
      isActive: true,
      stock: { lt: 5 },
    },
    select: {
      id: true,
      name: true,
      stock: true,
    },
    orderBy: { stock: "asc" },
    take: 10,
  })

  const stats = [
    {
      title: "Total Users",
      value: totalUsers,
      icon: Users,
      description: "Registered users",
    },
    {
      title: "Total Products",
      value: totalProducts,
      icon: Package,
      description: "Active products",
    },
    {
      title: "Total Orders",
      value: totalOrders,
      icon: ShoppingCart,
      description: "All orders",
    },
    {
      title: "Total Revenue",
      value: `₹${totalRevenue.toFixed(2)}`,
      icon: DollarSign,
      description: "From paid orders",
    },
  ]

  return (
    <div className="space-y-8 p-8">
      <div>
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <p className="text-muted-foreground">
          Overview of your e-commerce store
        </p>
      </div>

      {/* KPI CARDS */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.title}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {stat.title}
              </CardTitle>
              <stat.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-muted-foreground">
                {stat.description}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* LOW STOCK ALERT */}
      {lowStockProducts.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-destructive" />
              Low Stock Alert
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {lowStockProducts.map((product) => (
                <div
                  key={product.id}
                  className="flex items-center justify-between border-b pb-4 last:border-0 last:pb-0"
                >
                  <span className="font-medium">{product.name}</span>
                  <Badge
                    variant={
                      product.stock === 0 ? "destructive" : "secondary"
                    }
                  >
                    {product.stock} in stock
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
