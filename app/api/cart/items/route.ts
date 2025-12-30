import { type NextRequest, NextResponse } from "next/server"
import { getSessionFromBearerToken } from "@/lib/auth"
import { updateCartItem, removeFromCart } from "@/lib/cart"

export async function PATCH(request: NextRequest) {
  try {
    const token = request.headers.get("authorization")?.replace("Bearer ", "")
    const user = token ? await getSessionFromBearerToken(token) : null
    if (!user) return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 })

    const { productId, quantity } = await request.json()
    if (!productId || quantity === undefined) {
      return NextResponse.json({ success: false, error: "Product ID and quantity required" }, { status: 400 })
    }

    const result = updateCartItem(user.id, productId, quantity)
    return NextResponse.json(result)
  } catch (error) {
    return NextResponse.json({ success: false, error: "Internal server error" }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const token = request.headers.get("authorization")?.replace("Bearer ", "")
    const user = token ? await getSessionFromBearerToken(token) : null
    if (!user) return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 })

    const productId = new URL(request.url).searchParams.get("productId")
    if (!productId) return NextResponse.json({ success: false, error: "Product ID required" }, { status: 400 })

    const result = removeFromCart(user.id, productId)
    return NextResponse.json(result)
  } catch (error) {
    return NextResponse.json({ success: false, error: "Internal server error" }, { status: 500 })
  }
}
