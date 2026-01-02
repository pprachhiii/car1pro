import Link from "next/link"
import Image from "next/image"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { AddToCartButton } from "@/components/add-to-cart-button"
import { Product } from "@/lib/types"

type ProductCardProps = Pick<
  Product,
  "id" | "name" | "slug" | "description" | "price" | "image" | "inStock"
>

export function ProductCard({
  id,
  name,
  slug,
  description,
  price,
  image,
  inStock,
}: ProductCardProps) {
  return (
    <Card className="group py-0 overflow-hidden hover:shadow-lg transition-shadow">
      <Link href={`/products/${slug}`} className="block">
        <div className="aspect-square bg-muted">
          <Image
            src={image || "/placeholder.svg"}
            alt={name}
            width={400}
            height={400}
            className="block object-cover w-full h-full group-hover:scale-105 transition-transform duration-300"
          />
        </div>
      </Link>

      <CardContent className="p-4">
        <Link href={`/products/${slug}`}>
          <h3 className="font-semibold text-base mb-1 group-hover:text-accent transition-colors line-clamp-1">
            {name}
          </h3>
        </Link>
        <p className="text-sm text-muted-foreground line-clamp-2 mb-2">
          {description}
        </p>
        <p className="text-lg font-bold">${price.toFixed(2)}</p>
      </CardContent>

      <CardFooter className="p-4 pt-0">
        <AddToCartButton productId={id} inStock={inStock} />
      </CardFooter>
    </Card>
  )
}
