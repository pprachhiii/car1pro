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
    const { role } = body

    if (role !== "user" && role !== "admin") {
      return NextResponse.json({ error: "Invalid role" }, { status: 400 })
    }

    const user = await prisma.user.update({
      where: { id },
      data: { role },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
      },
    })

    return NextResponse.json(user)
  } catch (error) {
    console.error("[ADMIN_USER_ROLE_PUT]", error)
    return NextResponse.json({ error: "Failed to update user role" }, { status: 500 })
  }
}
