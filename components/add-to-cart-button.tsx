"use client"
import { Button } from "@/components/ui/button"
import { useTransition } from "react"
import { toast } from "react-hot-toast" 
import { addToCart } from "@/app/actions/cart"
import { useCart } from "./card-context"

interface AddToCartButtonProps {
  productId: string
  inStock: boolean
}

export function AddToCartButton({ productId, inStock }: AddToCartButtonProps) {
  const [isPending, startTransition] = useTransition()
  const { setItems } = useCart()

  const handleAddToCart = () => {
    startTransition(async () => {
      try {
        const result = await addToCart(productId)
        if (result.success) {
          toast.success("Product added to cart!")
          // Increment cart count locally
          setItems(prevItems => prevItems + 1)
        } else {
          toast.error(result.error || "Failed to add to cart")
        }
      } catch (error) {
        toast.error("Error adding product")
        console.error(error)
      }
    })
  }

  return (
    <Button onClick={handleAddToCart} disabled={!inStock || isPending} className="w-full">
      {isPending ? "Adding..." : inStock ? "Add to Cart" : "Out of Stock"}
    </Button>
  )
}
