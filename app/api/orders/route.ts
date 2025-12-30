import { type NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { getSessionFromBearerToken } from "@/lib/auth"

/* ------------------------------------------------------------------ */
/* GET USER ORDERS                                                     */
/* ------------------------------------------------------------------ */
export async function GET(request: NextRequest) {
  try {
    const token = request.headers.get("authorization")?.replace("Bearer ", "")
    const user = token ? await getSessionFromBearerToken(token) : null

    if (!user) {
      return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 })
    }

    const orders = await prisma.order.findMany({
      where: { userId: user.id },
      include: {
        items: { include: { product: true } }
      },
      orderBy: { createdAt: "desc" }
    })

    return NextResponse.json({ success: true, data: { orders } })
  } catch (error) {
    console.error(error)
    return NextResponse.json({ success: false, error: "Internal server error" }, { status: 500 })
  }
}

/* ------------------------------------------------------------------ */
/* CREATE ORDER (FROM USER CART)                                       */
/* ------------------------------------------------------------------ */
export async function POST(request: NextRequest) {
  try {
    const token = request.headers.get("authorization")?.replace("Bearer ", "")
    const user = token ? await getSessionFromBearerToken(token) : null

    if (!user) {
      return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 })
    }

    const body = await request.json()
    const { shippingAddress, paymentMethod } = body

    if (!shippingAddress || !paymentMethod) {
      return NextResponse.json({ success: false, error: "Missing required fields" }, { status: 400 })
    }

    // Use findFirst because userId is not unique
    const cart = await prisma.cart.findFirst({
      where: { userId: user.id },
      include: { items: true }
    })

    if (!cart || cart.items.length === 0) {
      return NextResponse.json({ success: false, error: "Cart is empty" }, { status: 400 })
    }

    // Create order with items
    const order = await prisma.order.create({
      data: {
        userId: user.id,
        total: cart.total,
        status: "pending",
        shippingAddress,
        paymentMethod,
        paymentStatus: "pending",
        items: {
          create: cart.items.map((item) => ({
            productId: item.productId,
            quantity: item.quantity,
            price: item.price
          }))
        }
      },
      include: { items: true }
    })

    // Clear user's cart
    await prisma.cartItem.deleteMany({ where: { cartId: cart.id } })
    await prisma.cart.update({ where: { id: cart.id }, data: { total: 0 } })

    return NextResponse.json({ success: true, data: { order } }, { status: 201 })
  } catch (error) {
    console.error(error)
    return NextResponse.json({ success: false, error: "Internal server error" }, { status: 500 })
  }
}
