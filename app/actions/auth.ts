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
  const parsed = signupSchema.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    password: formData.get("password"),
  })

  if (!parsed.success) {
    return { error: parsed.error.errors[0].message }
  }

  const res = await createUser(
    parsed.data.email,
    parsed.data.password,
    parsed.data.name
  )

  if (!res.success) {
    return { error: res.error }
  }

  // new users are customers
  redirect("/")
}


/* ------------------------------------------------------------------ */
/* LOGIN                                                               */
/* ------------------------------------------------------------------ */
export async function login(formData: FormData) {
  const parsed = loginSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
  })

  if (!parsed.success) {
    return { error: parsed.error.errors[0].message }
  }

  const res = await loginUser(parsed.data.email, parsed.data.password)

  if (!res.success) {
    return { error: res.error }
  }

  if (res.data?.role === "admin") {
    redirect("/admin/dashboard")
  }

  redirect("/")
}

/* ------------------------------------------------------------------ */
/* LOGOUT                                                              */
/* ------------------------------------------------------------------ */

export async function logout() {
  await destroySession()
  redirect("/")
}
