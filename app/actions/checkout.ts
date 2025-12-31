"use server"

import { prisma } from "@/lib/prisma"
import { requireAuth } from "@/lib/protected-action"
import { redirect } from "next/navigation"

export async function createOrder() {
  const session = await requireAuth()

  // Fetch cart with items + products
  const cart = await prisma.cart.findFirst({
    where: { userId: session.id },
    include: {
      items: {
        include: {
          product: true,
        },
      },
    },
  })

  if (!cart || cart.items.length === 0) {
    return { error: "Cart is empty" }
  }

  // Calculate total from DB prices
  const total = cart.items.reduce((sum, item) => {
    return sum + item.product.price * item.quantity
  }, 0)

  // Transaction (order + items + stock + clear cart)
  const order = await prisma.$transaction(async (tx) => {
    // Create order
    const order = await tx.order.create({
      data: {
        userId: session.id,
        total,
        status: "pending",
        paymentMethod: "cod",
        paymentStatus: "pending",
        shippingAddress: {
          fullName: session.name ?? "Customer",
        },
        items: {
          create: cart.items.map((item) => ({
            productId: item.productId,
            quantity: item.quantity,
            price: item.product.price,
          })),
        },
      },
    })

    // Reduce product stock
    for (const item of cart.items) {
      await tx.product.update({
        where: { id: item.productId },
        data: {
          stock: { decrement: item.quantity },
        },
      })
    }

    // Clear cart
    await tx.cartItem.deleteMany({
      where: { cartId: cart.id },
    })

    await tx.cart.update({
      where: { id: cart.id },
      data: { total: 0 },
    })

    return order
  })

  redirect(`/orders/${order.id}`)
}
