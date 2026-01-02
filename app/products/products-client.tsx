"use client"

import { useState } from "react"
import { Product } from "@/lib/types"
import { ProductCard } from "@/components/product-card"
import { Button } from "@/components/ui/button"

const CATEGORY_CONFIG = [
  { key: "washing-cleaning", title: "Washing & Cleaning Solutions" },
  { key: "polishes-protectants", title: "Polishes & Protectants" },
  { key: "accessories-tools", title: "Accessories & Tools" },
  { key: "others", title: "Others" },
]

const MAIN_CATEGORIES = [
  "washing-cleaning",
  "polishes-protectants",
  "accessories-tools",
]

interface Props {
  products: Product[]
}

export default function ProductsClient({ products }: Props) {
  const [expanded, setExpanded] = useState<Record<string, boolean>>({})

  const toggleCategory = (category: string) => {
    setExpanded((prev) => ({
      ...prev,
      [category]: !prev[category],
    }))
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="mb-12">
        <h1 className="text-4xl font-bold mb-4">All Products</h1>
        <p className="text-muted-foreground text-lg">
          Browse our complete collection of professional automotive care products
        </p>
      </div>

      {CATEGORY_CONFIG.map(({ key, title }) => {
        const categoryProducts =
  key === "others"
    ? products.filter(
        (p) =>
          !p.category ||
          p.category === "others" ||
          !MAIN_CATEGORIES.includes(p.category)
      )
    : products.filter((p) => p.category === key)

        if (!categoryProducts.length) return null

        const isExpanded = expanded[key]
        const visibleProducts = isExpanded
          ? categoryProducts
          : categoryProducts.slice(0, 10)

        return (
          <section key={key} className="mb-16">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold">{title}</h2>

              {categoryProducts.length > 10 && (
                <Button
                  variant="outline"
                  className="bg-transparent"
                  onClick={() => toggleCategory(key)}
                >
                  {isExpanded ? "Show Less" : "View All"}
                </Button>
              )}
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-6 transition-all">
              {visibleProducts.map((product) => (
                <ProductCard key={product.id} {...product} />
              ))}
            </div>
          </section>
        )
      })}
    </div>
  )
}
