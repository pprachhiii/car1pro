import Link from "next/link"

import { Footer } from "@/components/footer"
import { LoginForm } from "@/components/login-form"
import { getSession } from "@/lib/auth"
import { redirect } from "next/navigation"
import HeaderWrapper from "@/components/header-wrapper"

export default async function LoginPage() {
  const session = await getSession()

  // If already logged in, redirect to products
  if (session) {
    redirect("/products")
  }

  return (
    <div className="min-h-screen flex flex-col">
      <HeaderWrapper />

      <main className="flex-1 flex items-center justify-center py-12 px-4">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold mb-2">Welcome Back</h1>
            <p className="text-muted-foreground">Sign in to your CAR1PRO account</p>
          </div>

          <LoginForm />

          <p className="text-center text-sm text-muted-foreground mt-6">
            Don't have an account?{" "}
            <Link href="/signup" className="text-accent hover:underline font-medium">
              Sign up
            </Link>
          </p>
        </div>
      </main>

      <Footer />
    </div>
  )
}
