import { type NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { getSessionFromBearerToken } from "@/lib/auth"

/* ------------------------------------------------------------------ */
/* GET PRODUCTS WITH FILTERS                                           */
/* ------------------------------------------------------------------ */
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const category = searchParams.get("category")
    const featured = searchParams.get("featured")
    const search = searchParams.get("search")

    const where: any = {}

    if (category) where.category = category
    if (featured === "true") where.featured = true
    if (search) {
      where.OR = [
        { name: { contains: search, mode: "insensitive" } },
        { description: { contains: search, mode: "insensitive" } },
      ]
    }

    const products = await prisma.product.findMany({ where })

    return NextResponse.json({ success: true, data: { products } })
  } catch (error) {
    console.error(error)
    return NextResponse.json(
      { success: false, error: "Internal server error" },
      { status: 500 }
    )
  }
}

/* ------------------------------------------------------------------ */
/* CREATE PRODUCT (ADMIN ONLY)                                         */
/* ------------------------------------------------------------------ */
export async function POST(request: NextRequest) {
  try {
    const token = request.headers.get("authorization")?.replace("Bearer ", "")
    const user = token ? await getSessionFromBearerToken(token) : null

    if (!user || user.role !== "admin") {
      return NextResponse.json(
        { success: false, error: "Unauthorized" },
        { status: 403 }
      )
    }

    const body = await request.json()
    const product = await prisma.product.create({
      data: {
        ...body,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    })

    return NextResponse.json(
      { success: true, data: { product } },
      { status: 201 }
    )
  } catch (error) {
    console.error(error)
    return NextResponse.json(
      { success: false, error: "Internal server error" },
      { status: 500 }
    )
  }
}
