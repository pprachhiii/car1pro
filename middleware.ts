import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import { getSessionFromBearerToken } from "@/lib/auth"

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Only run on root
  if (pathname !== "/") return NextResponse.next()

  const token = request.cookies.get("session")?.value

  if (!token) return NextResponse.next()

  const user = await getSessionFromBearerToken(token)

  if (user?.role === "admin") {
    return NextResponse.redirect(new URL("/admin/dashboard", request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/"],
}
