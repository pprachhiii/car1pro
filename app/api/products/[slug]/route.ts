import { type NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

/* ------------------------------------------------------------------ */
/* GET PRODUCT BY SLUG (CUSTOMER)                                      */
/* ------------------------------------------------------------------ */
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params

    const product = await prisma.product.findUnique({
      where: { slug }, 
    })

    if (!product) {
      return NextResponse.json(
        { success: false, error: "Product not found" },
        { status: 404 }
      )
    }

    return NextResponse.json({
      success: true,
      data: { product },
    })
  } catch (error) {
    console.error(error)
    return NextResponse.json(
      { success: false, error: "Internal server error" },
      { status: 500 }
    )
  }
}
