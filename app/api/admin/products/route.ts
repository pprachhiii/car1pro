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

    const {
      name,
      description,
      longDescription,
      features,
      price,
      category,
      stock,
      image,
      featured,
      brand,
      model,
      year,
    } = body

    if (!name || !description || !price || !image) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      )
    }

    // slug
    const slug = name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "")

    const parsedStock = Number(stock) || 0

    const product = await prisma.product.create({
      data: {
        name,
        slug,
        description,
        longDescription: longDescription || null,
        features: Array.isArray(features) ? features : [],

        price: Number(price),
        category: category || "other",
        stock: parsedStock,
        inStock: parsedStock > 0,

        image,
        featured: Boolean(featured),
        isActive: true,

        brand: brand || null,
        model: model || null,
        year: year ? Number(year) : null,
      },
    })

    return NextResponse.json({
      success: true,
      data: { product },
    })
  } catch (error) {
    console.error("[ADMIN_PRODUCTS_POST]", error)
    return NextResponse.json(
      { error: "Failed to create product" },
      { status: 500 }
    )
  }
}
