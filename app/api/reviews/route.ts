import { type NextRequest, NextResponse } from "next/server"
import { getUserFromToken } from "@/lib/auth"
import { db } from "@/lib/db"
import type { Review } from "@/lib/types"

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const productId = searchParams.get("productId")

    let reviews = db.reviews

    if (productId) {
      reviews = reviews.filter((r) => r.productId === productId)
    }

    return NextResponse.json({
      success: true,
      data: { reviews },
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
    const { productId, rating, comment } = body

    if (!productId || !rating) {
      return NextResponse.json({ success: false, error: "Product ID and rating required" }, { status: 400 })
    }

    if (rating < 1 || rating > 5) {
      return NextResponse.json({ success: false, error: "Rating must be between 1 and 5" }, { status: 400 })
    }

    const review: Review = {
      id: Date.now().toString(),
      productId,
      userId: user.id,
      rating,
      comment: comment || "",
      createdAt: new Date(),
    }

    db.reviews.push(review)

    return NextResponse.json(
      {
        success: true,
        data: { review },
      },
      { status: 201 },
    )
  } catch (error) {
    return NextResponse.json({ success: false, error: "Internal server error" }, { status: 500 })
  }
}
