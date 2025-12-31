import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { requireAdmin } from "@/lib/auth"

export async function GET() {
  const session = await requireAdmin()

  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  try {
    const products = await prisma.product.findMany({
      orderBy: { createdAt: "desc" },
    })

    return NextResponse.json(products)
  } catch (error) {
    console.error("[ADMIN_PRODUCTS_GET]", error)
    return NextResponse.json({ error: "Failed to fetch products" }, { status: 500 })
  }
}

export async function POST(request: Request) {
  const session = await requireAdmin()

  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  try {
    const body = await request.json()
    const { name, description, price, category, stock, image, featured, brand, model, year } = body

    // Generate slug from name
    const slug = name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "")

    // Determine inStock based on stock
    const inStock = stock > 0

    const product = await prisma.product.create({
      data: {
        name,
        slug,
        description,
        price: Number.parseFloat(price),
        category: category || "other",
        stock: Number.parseInt(stock),
        image,
        featured: featured || false,
        inStock,
        isActive: true,
        brand,
        model,
        year: year ? Number.parseInt(year) : null,
      },
    })

    return NextResponse.json(product)
  } catch (error) {
    console.error("[ADMIN_PRODUCTS_POST]", error)
    return NextResponse.json({ error: "Failed to create product" }, { status: 500 })
  }
}
