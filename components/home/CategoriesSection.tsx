import Link from "next/link"

export default function CategoriesSection() {
  return (
    <section className="py-16 bg-muted/30">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-8 text-center">
          Shop by Category
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Link href="/products?category=washing-cleaning" className="group">
            <div className="bg-card rounded-lg p-8 hover:shadow-lg transition-shadow">
              <h3 className="text-xl font-semibold mb-2 group-hover:text-accent transition-colors">
                Washing & Cleaning
              </h3>
              <p className="text-muted-foreground text-sm">
                Premium soaps, shampoos, and cleaning solutions
              </p>
            </div>
          </Link>

          <Link href="/products?category=polishes-protectants" className="group">
            <div className="bg-card rounded-lg p-8 hover:shadow-lg transition-shadow">
              <h3 className="text-xl font-semibold mb-2 group-hover:text-accent transition-colors">
                Polishes & Protectants
              </h3>
              <p className="text-muted-foreground text-sm">
                Waxes, sealants, and ceramic coatings
              </p>
            </div>
          </Link>

          <Link href="/products?category=accessories-tools" className="group">
            <div className="bg-card rounded-lg p-8 hover:shadow-lg transition-shadow">
              <h3 className="text-xl font-semibold mb-2 group-hover:text-accent transition-colors">
                Accessories & Tools
              </h3>
              <p className="text-muted-foreground text-sm">
                Professional-grade detailing equipment
              </p>
            </div>
          </Link>
        </div>
      </div>
    </section>
  )
}
