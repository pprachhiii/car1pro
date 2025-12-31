import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { requireAdmin } from "@/lib/auth"

export async function PUT(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const session = await requireAdmin()

  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  try {
    const { id } = await params
    const body = await request.json()
    const { status } = body

    const validStatuses = ["pending", "processing", "shipped", "delivered", "cancelled"]

    if (!validStatuses.includes(status)) {
      return NextResponse.json({ error: "Invalid status" }, { status: 400 })
    }

    const order = await prisma.order.update({
      where: { id },
      data: { status },
    })

    return NextResponse.json(order)
  } catch (error) {
    console.error("[ADMIN_ORDER_STATUS_PUT]", error)
    return NextResponse.json({ error: "Failed to update order status" }, { status: 500 })
  }
}
