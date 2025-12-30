import { type NextRequest, NextResponse } from "next/server"
import { db } from "@/lib/db"
import { getUserFromToken } from "@/lib/auth"

export async function GET(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params
    const product = db.products.find((p) => p.id === id)

    if (!product) {
      return NextResponse.json({ success: false, error: "Product not found" }, { status: 404 })
    }

    return NextResponse.json({
      success: true,
      data: { product },
    })
  } catch (error) {
    return NextResponse.json({ success: false, error: "Internal server error" }, { status: 500 })
  }
}

export async function PUT(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const token = request.headers.get("authorization")?.replace("Bearer ", "")
    const user = token ? getUserFromToken(token) : null

    if (!user || user.role !== "admin") {
      return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 403 })
    }

    const { id } = await params
    const body = await request.json()
    const productIndex = db.products.findIndex((p) => p.id === id)

    if (productIndex === -1) {
      return NextResponse.json({ success: false, error: "Product not found" }, { status: 404 })
    }

    db.products[productIndex] = {
      ...db.products[productIndex],
      ...body,
      updatedAt: new Date(),
    }

    return NextResponse.json({
      success: true,
      data: { product: db.products[productIndex] },
    })
  } catch (error) {
    return NextResponse.json({ success: false, error: "Internal server error" }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const token = request.headers.get("authorization")?.replace("Bearer ", "")
    const user = token ? getUserFromToken(token) : null

    if (!user || user.role !== "admin") {
      return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 403 })
    }

    const { id } = await params
    const productIndex = db.products.findIndex((p) => p.id === id)

    if (productIndex === -1) {
      return NextResponse.json({ success: false, error: "Product not found" }, { status: 404 })
    }

    db.products.splice(productIndex, 1)

    return NextResponse.json({
      success: true,
      message: "Product deleted successfully",
    })
  } catch (error) {
    return NextResponse.json({ success: false, error: "Internal server error" }, { status: 500 })
  }
}
