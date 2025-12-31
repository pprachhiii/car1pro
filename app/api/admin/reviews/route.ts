import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { requireAdmin } from "@/lib/auth"

export async function GET() {
  const session = await requireAdmin()

  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  try {
    const reviews = await prisma.review.findMany({
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
        product: {
          select: {
            id: true,
            name: true,
            image: true,
          },
        },
      },
      orderBy: { createdAt: "desc" },
    })

    return NextResponse.json(reviews)
  } catch (error) {
    console.error("[ADMIN_REVIEWS_GET]", error)
    return NextResponse.json({ error: "Failed to fetch reviews" }, { status: 500 })
  }
}
