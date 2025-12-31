import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { requireAdmin } from "@/lib/auth"

export async function GET() {
  const session = await requireAdmin()

  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  try {
    // Get total users
    const totalUsers = await prisma.user.count()

    // Get total active products
    const totalProducts = await prisma.product.count({
      where: { isActive: true },
    })

    // Get total orders
    const totalOrders = await prisma.order.count()

    // Get total revenue (sum of paid orders)
    const revenue = await prisma.order.aggregate({
      where: { paymentStatus: "paid" },
      _sum: { total: true },
    })
    const totalRevenue = revenue._sum.total || 0

    // Get low stock products (stock < 5)
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

    return NextResponse.json({
      totalUsers,
      totalProducts,
      totalOrders,
      totalRevenue,
      lowStockProducts,
    })
  } catch (error) {
    console.error("[ADMIN_DASHBOARD]", error)
    return NextResponse.json({ error: "Failed to fetch dashboard data" }, { status: 500 })
  }
}
