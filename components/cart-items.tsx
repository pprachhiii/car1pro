"use client"

import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Minus, Plus, X } from "lucide-react"
import { updateCartItemQuantity, removeFromCart } from "@/app/actions/cart"
import { createOrder } from "@/app/actions/checkout"
import { useState, useTransition } from "react"

interface CartItemsProps {
  items: Array<{
    id: string
    quantity: number
    product: {
      id: string
      name: string
      slug: string
      price: number
      imageUrl: string
    }
  }>
}

export function CartItems({ items }: CartItemsProps) {
  const [isPending, startTransition] = useTransition()
  const [isCheckingOut, setIsCheckingOut] = useState(false)

  const subtotal = items.reduce((sum, item) => sum + item.product.price * item.quantity, 0)
  const tax = subtotal * 0.1 // 10% tax
  const total = subtotal + tax

  const handleUpdateQuantity = (itemId: string, newQuantity: number) => {
    startTransition(async () => {
      await updateCartItemQuantity(itemId, newQuantity)
    })
  }

  const handleRemoveItem = (itemId: string) => {
    startTransition(async () => {
      await removeFromCart(itemId)
    })
  }

  const handleCheckout = async () => {
    setIsCheckingOut(true)
    try {
      await createOrder()
    } catch (error) {
      setIsCheckingOut(false)
    }
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <div className="lg:col-span-2 space-y-4">
        {items.map((item) => (
          <Card key={item.id}>
            <CardContent className="p-4">
              <div className="flex gap-4">
                <Link href={`/products/${item.product.slug}`} className="flex-shrink-0">
                  <div className="w-24 h-24 bg-muted rounded-lg overflow-hidden">
                    <Image
                      src={item.product.imageUrl || "/placeholder.svg"}
                      alt={item.product.name}
                      width={96}
                      height={96}
                      className="object-cover w-full h-full"
                    />
                  </div>
                </Link>

                <div className="flex-1 min-w-0">
                  <Link href={`/products/${item.product.slug}`}>
                    <h3 className="font-semibold mb-1 hover:text-accent transition-colors">{item.product.name}</h3>
                  </Link>
                  <p className="text-lg font-bold">${item.product.price.toFixed(2)}</p>

                  <div className="flex items-center gap-2 mt-3">
                    <Button
                      variant="outline"
                      size="icon"
                      className="h-8 w-8 bg-transparent"
                      onClick={() => handleUpdateQuantity(item.id, item.quantity - 1)}
                      disabled={isPending}
                    >
                      <Minus className="h-4 w-4" />
                    </Button>
                    <span className="w-12 text-center font-medium">{item.quantity}</span>
                    <Button
                      variant="outline"
                      size="icon"
                      className="h-8 w-8 bg-transparent"
                      onClick={() => handleUpdateQuantity(item.id, item.quantity + 1)}
                      disabled={isPending}
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                <div className="flex flex-col items-end justify-between">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8"
                    onClick={() => handleRemoveItem(item.id)}
                    disabled={isPending}
                  >
                    <X className="h-4 w-4" />
                    <span className="sr-only">Remove item</span>
                  </Button>
                  <p className="font-bold">${(item.product.price * item.quantity).toFixed(2)}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="lg:col-span-1">
        <Card className="sticky top-20">
          <CardContent className="p-6">
            <h2 className="text-xl font-bold mb-4">Order Summary</h2>

            <div className="space-y-3 mb-6">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Subtotal</span>
                <span className="font-medium">${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Tax (10%)</span>
                <span className="font-medium">${tax.toFixed(2)}</span>
              </div>
              <div className="border-t pt-3">
                <div className="flex justify-between">
                  <span className="font-bold">Total</span>
                  <span className="font-bold text-xl">${total.toFixed(2)}</span>
                </div>
              </div>
            </div>

            <Button className="w-full" size="lg" onClick={handleCheckout} disabled={isCheckingOut || isPending}>
              {isCheckingOut ? "Processing..." : "Proceed to Checkout"}
            </Button>

            <Link href="/products">
              <Button variant="outline" className="w-full mt-3 bg-transparent">
                Continue Shopping
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
