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
    const { name, description, price, category, stock, image, featured, inStock, isActive, brand, model, year } = body

    // Update slug if name changed
    const updateData: any = {
      description,
      price: Number.parseFloat(price),
      category,
      stock: Number.parseInt(stock),
      image,
      featured,
      isActive,
      brand,
      model,
      year: year ? Number.parseInt(year) : null,
    }

    if (name) {
      updateData.name = name
      updateData.slug = name
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)/g, "")
    }

    // Auto-update inStock based on stock
    updateData.inStock = Number.parseInt(stock) > 0 ? (inStock ?? true) : false

    const product = await prisma.product.update({
      where: { id },
      data: updateData,
    })

    return NextResponse.json(product)
  } catch (error) {
    console.error("[ADMIN_PRODUCTS_PUT]", error)
    return NextResponse.json({ error: "Failed to update product" }, { status: 500 })
  }
}

export async function DELETE(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const session = await requireAdmin()

  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  try {
    const { id } = await params

    // Soft delete - set isActive to false
    const product = await prisma.product.update({
      where: { id },
      data: { isActive: false },
    })

    return NextResponse.json(product)
  } catch (error) {
    console.error("[ADMIN_PRODUCTS_DELETE]", error)
    return NextResponse.json({ error: "Failed to delete product" }, { status: 500 })
  }
}
