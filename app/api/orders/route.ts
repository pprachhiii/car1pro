import { type NextRequest, NextResponse } from "next/server"
import { getUserFromToken } from "@/lib/auth"
import { getCart, clearCart } from "@/lib/cart"
import { db } from "@/lib/db"
import type { Order } from "@/lib/types"

export async function GET(request: NextRequest) {
  try {
    const token = request.headers.get("authorization")?.replace("Bearer ", "")
    const user = token ? getUserFromToken(token) : null

    if (!user) {
      return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 })
    }

    const orders = db.orders.filter((o) => o.userId === user.id)

    return NextResponse.json({
      success: true,
      data: { orders },
    })
  } catch (error) {
    return NextResponse.json({ success: false, error: "Internal server error" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const token = request.headers.get("authorization")?.replace("Bearer ", "")
    const user = token ? getUserFromToken(token) : null

    if (!user) {
      return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 })
    }

    const body = await request.json()
    const { shippingAddress, paymentMethod } = body

    if (!shippingAddress || !paymentMethod) {
      return NextResponse.json({ success: false, error: "Missing required fields" }, { status: 400 })
    }

    const cart = getCart(user.id)

    if (cart.items.length === 0) {
      return NextResponse.json({ success: false, error: "Cart is empty" }, { status: 400 })
    }

    // Create order
    const order: Order = {
      id: Date.now().toString(),
      userId: user.id,
      items: cart.items,
      total: cart.total,
      status: "pending",
      shippingAddress,
      paymentMethod,
      paymentStatus: "pending",
      createdAt: new Date(),
      updatedAt: new Date(),
    }

    db.orders.push(order)

    // Clear cart
    clearCart(user.id)

    return NextResponse.json(
      {
        success: true,
        data: { order },
      },
      { status: 201 },
    )
  } catch (error) {
    return NextResponse.json({ success: false, error: "Internal server error" }, { status: 500 })
  }
}
