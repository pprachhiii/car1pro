import HeaderWrapper from "@/components/common/header-wrapper"
import { Footer } from "@/components/common/footer"

import HeroSection from "@/components/home/HeroSection"
import FeaturesSection from "@/components/home/FeaturesSection"
import FeaturedProductsSection from "@/components/home/FeaturedProductsSection"
import CategoriesSection from "@/components/home/CategoriesSection"
import TestimonialsSection from "@/components/home/TestimonialsSection"

export default function HomePage() {
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
