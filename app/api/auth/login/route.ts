import { type NextRequest, NextResponse } from "next/server"
import { loginUser } from "@/lib/auth"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { email, password } = body

    // Validation
    if (!email || !password) {
      return NextResponse.json({ success: false, error: "Missing required fields" }, { status: 400 })
    }

    const result = await loginUser(email, password)

    if (!result.success) {
      return NextResponse.json(result, { status: 401 })
    }

    return NextResponse.json(result, { status: 200 })
  } catch (error) {
    return NextResponse.json({ success: false, error: "Internal server error" }, { status: 500 })
  }
}
