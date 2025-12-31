import Link from "next/link"

import { Footer } from "@/components/common/footer"
import { SignupForm } from "@/components/auth/signup-form"
import { getSession } from "@/lib/auth"
import { redirect } from "next/navigation"
import HeaderWrapper from "@/components/common/header-wrapper"

export default async function SignupPage() {
  const session = await getSession()

  // If already logged in, redirect to home page
  if (session) {
    redirect("/")
  }

  return (
    <div className="min-h-screen flex flex-col">
      <HeaderWrapper />

      <main className="flex-1 flex items-center justify-center py-12 px-4">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold mb-2">Create Account</h1>
            <p className="text-muted-foreground">Join CAR1PRO and start shopping</p>
          </div>

          <SignupForm />

          <p className="text-center text-sm text-muted-foreground mt-6">
            Already have an account?{" "}
            <Link href="/login" className="text-accent hover:underline font-medium">
              Sign in
            </Link>
          </p>
        </div>
      </main>

      <Footer />
    </div>
  )
}
