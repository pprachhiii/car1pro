import Link from "next/link"
import Image from "next/image"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { AddToCartButton } from "@/components/add-to-cart-button"

interface ProductCardProps {
  id: string
  name: string
  slug: string
  description: string
  price: number
  imageUrl: string
  inStock: boolean
}

export function ProductCard({ id, name, slug, description, price, imageUrl, inStock }: ProductCardProps) {
  return (
    <Card className="group overflow-hidden hover:shadow-lg transition-shadow">
      <Link href={`/products/${slug}`}>
        <div className="aspect-square overflow-hidden bg-muted">
          <Image
            src={imageUrl || "/placeholder.svg"}
            alt={name}
            width={400}
            height={400}
            className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300"
          />
        </div>
      </Link>
      <CardContent className="p-4">
        <Link href={`/products/${slug}`}>
          <h3 className="font-semibold text-base mb-1 group-hover:text-accent transition-colors line-clamp-1">
            {name}
          </h3>
        </Link>
        <p className="text-sm text-muted-foreground line-clamp-2 mb-2">{description}</p>
        <p className="text-lg font-bold">${price.toFixed(2)}</p>
      </CardContent>
      <CardFooter className="p-4 pt-0">
        <AddToCartButton productId={id} inStock={inStock} />
      </CardFooter>
    </Card>
  )
}
