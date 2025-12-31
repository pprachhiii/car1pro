"use server"

import { z } from "zod"
import { redirect } from "next/navigation"
import { createUser, loginUser, destroySession } from "@/lib/auth"

/* ------------------------------------------------------------------ */
/* SCHEMAS                                                            */
/* ------------------------------------------------------------------ */

const signupSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  password: z.string().min(8),
})

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1),
})

/* ------------------------------------------------------------------ */
/* SIGNUP                                                              */
/* ------------------------------------------------------------------ */

export async function signup(formData: FormData) {
  const data = {
    name: formData.get("name"),
    email: formData.get("email"),
    password: formData.get("password"),
  }

  const parsed = signupSchema.safeParse(data)
  if (!parsed.success) {
    return { error: parsed.error.errors[0].message }
  }

  const res = await createUser(parsed.data.email, parsed.data.password, parsed.data.name)

  if (!res.success) {
    return { error: res.error }
  }

  redirect("/products")
}

/* ------------------------------------------------------------------ */
/* LOGIN                                                               */
/* ------------------------------------------------------------------ */

export async function login(formData: FormData) {
  const data = {
    email: formData.get("email"),
    password: formData.get("password"),
  }

  const parsed = loginSchema.safeParse(data)
  if (!parsed.success) {
    return { error: parsed.error.errors[0].message }
  }

  const res = await loginUser(parsed.data.email, parsed.data.password)

  if (!res.success) {
    return { error: res.error }
  }

  redirect("/products")
}

/* ------------------------------------------------------------------ */
/* LOGOUT                                                              */
/* ------------------------------------------------------------------ */

export async function logout() {
  await destroySession()
  redirect("/")
}
