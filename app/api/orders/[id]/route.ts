import { type NextRequest, NextResponse } from "next/server"
import { getUserFromToken } from "@/lib/auth"
import { db } from "@/lib/db"

export async function GET(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const token = request.headers.get("authorization")?.replace("Bearer ", "")
    const user = token ? getUserFromToken(token) : null

    if (!user) {
      return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 })
    }

    const { id } = await params
    const order = db.orders.find((o) => o.id === id)

    if (!order) {
      return NextResponse.json({ success: false, error: "Order not found" }, { status: 404 })
    }

    if (order.userId !== user.id && user.role !== "admin") {
      return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 403 })
    }

    return NextResponse.json({
      success: true,
      data: { order },
    })
  } catch (error) {
    return NextResponse.json({ success: false, error: "Internal server error" }, { status: 500 })
  }
}

export async function PATCH(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const token = request.headers.get("authorization")?.replace("Bearer ", "")
    const user = token ? getUserFromToken(token) : null

    if (!user || user.role !== "admin") {
      return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 403 })
    }

    const { id } = await params
    const body = await request.json()
    const orderIndex = db.orders.findIndex((o) => o.id === id)

    if (orderIndex === -1) {
      return NextResponse.json({ success: false, error: "Order not found" }, { status: 404 })
    }

    db.orders[orderIndex] = {
      ...db.orders[orderIndex],
      ...body,
      updatedAt: new Date(),
    }

    return NextResponse.json({
      success: true,
      data: { order: db.orders[orderIndex] },
    })
  } catch (error) {
    return NextResponse.json({ success: false, error: "Internal server error" }, { status: 500 })
  }
}
