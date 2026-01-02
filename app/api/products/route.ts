import { type NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export const dynamic = "force-dynamic"

/* ------------------------------------------------------------------ */
/* GET PRODUCTS WITH FILTERS                                           */
/* ------------------------------------------------------------------ */
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)

    const category = searchParams.get("category")
    const featured = searchParams.get("featured")
    const search = searchParams.get("search")
    const limit = searchParams.get("limit")
    const skip = searchParams.get("skip")

    const where: any = {
      isActive: true,
    }

    if (category) {
      where.category = category
    }

    if (featured === "true") {
      where.featured = true
    }

    if (search) {
      where.OR = [
        { name: { contains: search, mode: "insensitive" } },
        { description: { contains: search, mode: "insensitive" } },
      ]
    }

    const products = await prisma.product.findMany({
      where,
      orderBy: { createdAt: "desc" },
      take: limit ? Number(limit) : undefined,
      skip: skip ? Number(skip) : undefined,
    })

    return NextResponse.json({
      success: true,
      data: { products },
    })
  } catch (error) {
    console.error("[API_PRODUCTS_GET]", error)
    return NextResponse.json(
      { success: false, error: "Internal server error" },
      { status: 500 }
    )
  }
}
