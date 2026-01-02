import { PrismaClient } from "@prisma/client"
import { products } from "./product-slug.seed" 

const prisma = new PrismaClient()

async function main() {
  console.log("Seeding database...")

  for (const product of products) {
    await prisma.product.upsert({
      where: { slug: product.slug },
      update: {},
      create: {
        name: product.name,
        slug: product.slug,
        description: product.description,
        longDescription: product.longDescription,
        price: product.price,
        image: product.Image,
        category: product.category,
        inStock: product.inStock,
        isActive: true,
        featured: false,
        stock: product.inStock ? 50 : 0,
        features: product.features,
      },
    })
  }

  console.log("Seeding finished")
}

main()
  .catch((e) => {
    console.error("Seeding error", e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
