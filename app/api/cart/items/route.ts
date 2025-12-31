
import { NextRequest, NextResponse } from "next/server"
import { getSession } from "@/lib/auth"
import { getSessionFromBearerToken } from "@/lib/auth"
import { removeFromCart, updateCartItem } from "@/lib/cart"

export async function PATCH(request: NextRequest) {
  try {
    const session = await getSession() // reads the HTTP-only cookie
    if (!session) {
      return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 })
    }

    const { productId, quantity } = await request.json()
    if (!productId || quantity === undefined) {
      return NextResponse.json({ success: false, error: "Product ID and quantity required" }, { status: 400 })
    }

    const result = await updateCartItem(session.id, productId, quantity)
    return NextResponse.json(result)
  } catch (error) {
    console.error(error)
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

    const result = await removeFromCart(user.id, productId)
    return NextResponse.json(result)
  } catch (error) {
    return NextResponse.json({ success: false, error: "Internal server error" }, { status: 500 })
  }
}
