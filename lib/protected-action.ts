import { getSession } from "./auth"
import { redirect } from "next/navigation"

export async function requireAuth() {
  const session = await getSession()

  if (!session) {
    redirect("/login")
  }

  return session
}
