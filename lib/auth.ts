import bcrypt from "bcryptjs"
import { SignJWT, jwtVerify } from "jose"
import { cookies } from "next/headers"

import { prisma } from "@/lib/prisma"
import type { User, ApiResponse } from "./types"

/* ------------------------------------------------------------------ */
/* JWT CONFIG                                                         */
/* ------------------------------------------------------------------ */

const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET!)

/* ------------------------------------------------------------------ */
/* SESSION TYPE                                                       */
/* ------------------------------------------------------------------ */

export interface SessionUser {
  id: string
  email: string
  name: string | null
  role: "user" | "admin"
}

/* ------------------------------------------------------------------ */
/* PASSWORD UTILITIES                                                 */
/* ------------------------------------------------------------------ */

export async function hashPassword(password: string) {
  return bcrypt.hash(password, 10)
}

export async function comparePassword(password: string, hashed: string) {
  return bcrypt.compare(password, hashed)
}

/* ------------------------------------------------------------------ */
/* SESSION UTILITIES (FIXED)                                          */
/* ------------------------------------------------------------------ */
/* CREATE SESSION */
export async function createSession(user: SessionUser) {
  const token = await new SignJWT({ user })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("7d")
    .sign(JWT_SECRET)

  const cookieStore = await cookies()

  cookieStore.set("session", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 60 * 60 * 24 * 7,
    path: "/",
  })
}

/* GET SESSION */
export async function getSession(): Promise<SessionUser | null> {
  const cookieStore = await cookies()
  const token = cookieStore.get("session")

  if (!token) return null

  try {
    const { payload } = await jwtVerify(token.value, JWT_SECRET)
    return payload.user as SessionUser
  } catch {
    return null
  }
}

/* DESTROY SESSION */
export async function destroySession() {
  const cookieStore = await cookies()
  cookieStore.delete("session")
}

export async function createUser(
  email: string,
  password: string,
  name: string
): Promise<ApiResponse<Omit<User, "password">>> {
  try {
    const exists = await prisma.user.findUnique({ where: { email } })
    if (exists) {
      return { success: false, error: "User already exists" }
    }

    const hashedPassword = await hashPassword(password)

    const user = await prisma.user.create({
      data: {
        email,
        name,
        password: hashedPassword,
        role: "user", // Prisma role is string
      },
    })

    await createSession({
      id: user.id,
      email: user.email,
      name: user.name,
      role: "user", // explicitly narrow type
    })

    // Explicitly type safeUser
    const safeUser: Omit<User, "password"> = {
      id: user.id,
      email: user.email,
      name: user.name,
      role: "user", // narrow type
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    }

    return { success: true, data: safeUser }
  } catch (err) {
    console.error(err)
    return { success: false, error: "Failed to create user" }
  }
}

export async function loginUser(
  email: string,
  password: string
): Promise<ApiResponse<Omit<User, "password">>> {
  try {
    const user = await prisma.user.findUnique({ where: { email } })
    if (!user) {
      return { success: false, error: "Invalid email or password" }
    }

    const valid = await comparePassword(password, user.password)
    if (!valid) {
      return { success: false, error: "Invalid email or password" }
    }

    await createSession({
      id: user.id,
      email: user.email,
      name: user.name,
      role: user.role === "admin" ? "admin" : "user", // narrow type
    })

    const safeUser: Omit<User, "password"> = {
      id: user.id,
      email: user.email,
      name: user.name,
      role: user.role === "admin" ? "admin" : "user", // narrow type
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    }

    return { success: true, data: safeUser }
  } catch (err) {
    console.error(err)
    return { success: false, error: "Failed to login" }
  }
}

// auth.ts
export async function getSessionFromBearerToken(token: string): Promise<SessionUser | null> {
  try {
    const { payload } = await jwtVerify(token, JWT_SECRET)
    return payload.user as SessionUser
  } catch {
    return null
  }
}
