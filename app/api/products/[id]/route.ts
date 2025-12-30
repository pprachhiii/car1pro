import { type NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { getSessionFromBearerToken } from "@/lib/auth"

/* ------------------------------------------------------------------ */
/* GET PRODUCT BY ID                                                   */
/* ------------------------------------------------------------------ */
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const product = await prisma.product.findUnique({ where: { id } })

    if (!product) {
      return NextResponse.json(
        { success: false, error: "Product not found" },
        { status: 404 }
      )
    }

    return NextResponse.json({ success: true, data: { product } })
  } catch (error) {
    console.error(error)
    return NextResponse.json(
      { success: false, error: "Internal server error" },
      { status: 500 }
    )
  }
}

/* ------------------------------------------------------------------ */
/* UPDATE PRODUCT (ADMIN ONLY)                                         */
/* ------------------------------------------------------------------ */
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const token = request.headers.get("authorization")?.replace("Bearer ", "")
    const user = token ? await getSessionFromBearerToken(token) : null

    if (!user || user.role !== "admin") {
      return NextResponse.json(
        { success: false, error: "Unauthorized" },
        { status: 403 }
      )
    }

    const { id } = await params
    const body = await request.json()

    const updatedProduct = await prisma.product.update({
      where: { id },
      data: { ...body, updatedAt: new Date() },
    })

    return NextResponse.json({ success: true, data: { product: updatedProduct } })
  } catch (error) {
    console.error(error)
    if ((error as any).code === "P2025") {
      // Prisma: Record not found
      return NextResponse.json(
        { success: false, error: "Product not found" },
        { status: 404 }
      )
    }
    return NextResponse.json(
      { success: false, error: "Internal server error" },
      { status: 500 }
    )
  }
}

/* ------------------------------------------------------------------ */
/* DELETE PRODUCT (ADMIN ONLY)                                         */
/* ------------------------------------------------------------------ */
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const token = request.headers.get("authorization")?.replace("Bearer ", "")
    const user = token ? await getSessionFromBearerToken(token) : null

    if (!user || user.role !== "admin") {
      return NextResponse.json(
        { success: false, error: "Unauthorized" },
        { status: 403 }
      )
    }

    const { id } = await params

    await prisma.product.delete({ where: { id } })

    return NextResponse.json({
      success: true,
      message: "Product deleted successfully",
    })
  } catch (error) {
    console.error(error)
    if ((error as any).code === "P2025") {
      return NextResponse.json(
        { success: false, error: "Product not found" },
        { status: 404 }
      )
    }
    return NextResponse.json(
      { success: false, error: "Internal server error" },
      { status: 500 }
    )
  }
}
