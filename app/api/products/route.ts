import { type NextRequest, NextResponse } from "next/server"
import { db } from "@/lib/db"
import { getUserFromToken } from "@/lib/auth"

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const category = searchParams.get("category")
    const featured = searchParams.get("featured")
    const search = searchParams.get("search")

    let products = db.products

    // Filter by category
    if (category) {
      products = products.filter((p) => p.category === category)
    }

    // Filter by featured
    if (featured === "true") {
      products = products.filter((p) => p.featured)
    }

    // Search
    if (search) {
      const searchLower = search.toLowerCase()
      products = products.filter(
        (p) => p.name.toLowerCase().includes(searchLower) || p.description.toLowerCase().includes(searchLower),
      )
    }

    return NextResponse.json({
      success: true,
      data: { products },
    })
  } catch (error) {
    return NextResponse.json({ success: false, error: "Internal server error" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const token = request.headers.get("authorization")?.replace("Bearer ", "")
    const user = token ? getUserFromToken(token) : null

    if (!user || user.role !== "admin") {
      return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 403 })
    }

    const body = await request.json()
    const product = {
      id: Date.now().toString(),
      ...body,
      createdAt: new Date(),
      updatedAt: new Date(),
    }

    db.products.push(product)

    return NextResponse.json(
      {
        success: true,
        data: { product },
      },
      { status: 201 },
    )
  } catch (error) {
    return NextResponse.json({ success: false, error: "Internal server error" }, { status: 500 })
  }
}
