import { redirect } from "next/navigation"
import { getSession } from "@/lib/auth"

import HeaderWrapper from "@/components/common/header-wrapper"
import { Footer } from "@/components/common/footer"
import HeroSection from "@/components/home/HeroSection"
import FeaturesSection from "@/components/home/FeaturesSection"
import FeaturedProductsSection from "@/components/home/FeaturedProductsSection"
import CategoriesSection from "@/components/home/CategoriesSection"
import TestimonialsSection from "@/components/home/TestimonialsSection"

export default async function HomePage() {
  const session = await getSession()

  // 🚨 Admins should never see public homepage
  if (session?.role === "admin") {
    redirect("/admin/dashboard")
  }

  return (
    <div className="min-h-screen flex flex-col">
      <HeaderWrapper />

      <main className="flex-1">
        <HeroSection />
        <FeaturesSection />
        <FeaturedProductsSection />
        <CategoriesSection />
      </main>

      <TestimonialsSection />
      <Footer />
    </div>
  )
}
