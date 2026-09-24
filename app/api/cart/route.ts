import { type NextRequest, NextResponse } from "next/server"
import { getSession } from "@/lib/auth"
import { prisma } from "@/lib/prisma"

export const dynamic = "force-dynamic"

export async function GET(_request: NextRequest) {
  const session = await getSession()
  if (!session) return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 })
  const cart = await prisma.cart.findFirst({ where: { userId: session.id }, include: { items: { include: { product: true } } } })
  return NextResponse.json({ success: true, data: { cart } })
}
