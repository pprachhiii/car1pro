import { type NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { getSessionFromBearerToken } from "@/lib/auth"

/* ------------------------------------------------------------------ */
/* GET SINGLE ORDER BY ID                                              */
/* ------------------------------------------------------------------ */
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const token = request.headers.get("authorization")?.replace("Bearer ", "")
    const user = token ? await getSessionFromBearerToken(token) : null

    if (!user) {
      return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 })
    }

    const { id } = await params

    const order = await prisma.order.findUnique({
      where: { id },
      include: {
        items: { include: { product: true } }
      }
    })

    if (!order) {
      return NextResponse.json({ success: false, error: "Order not found" }, { status: 404 })
    }

    if (order.userId !== user.id && user.role !== "admin") {
      return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 403 })
    }

    return NextResponse.json({ success: true, data: { order } })
  } catch (error) {
    console.error(error)
    return NextResponse.json({ success: false, error: "Internal server error" }, { status: 500 })
  }
}

/* ------------------------------------------------------------------ */
/* UPDATE ORDER STATUS (ADMIN ONLY)                                   */
/* ------------------------------------------------------------------ */
export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const token = request.headers.get("authorization")?.replace("Bearer ", "")
    const user = token ? await getSessionFromBearerToken(token) : null

    if (!user || user.role !== "admin") {
      return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 403 })
    }

    const { id } = await params
    const body = await request.json()

    const order = await prisma.order.update({
      where: { id },
      data: {
        ...body,
        updatedAt: new Date()
      },
      include: {
        items: { include: { product: true } }
      }
    })

    return NextResponse.json({ success: true, data: { order } })
  } catch (error) {
    console.error(error)
    return NextResponse.json({ success: false, error: "Internal server error" }, { status: 500 })
  }
}
