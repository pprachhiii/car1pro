"use server"

import { prisma } from "@/lib/prisma"
import { requireAuth } from "@/lib/protected-action"
import { revalidatePath } from "next/cache"

/* ------------------------------------------------------------------ */
/* ADD TO CART                                                        */
/* ------------------------------------------------------------------ */

export async function addToCart(productId: string) {
  const session = await requireAuth()

  // find or create cart
  let cart = await prisma.cart.findFirst({
    where: { userId: session.id },
  })

  if (!cart) {
    cart = await prisma.cart.create({
      data: { userId: session.id },
    })
  }

  const product = await prisma.product.findUnique({
    where: { id: productId },
  })

  if (!product || !product.inStock || product.stock < 1) {
    return { success: false, error: "Product out of stock" }
  }

  const existingItem = await prisma.cartItem.findFirst({
    where: {
      cartId: cart.id,
      productId,
    },
  })

  if (existingItem) {
    await prisma.cartItem.update({
      where: { id: existingItem.id },
      data: { quantity: existingItem.quantity + 1 },
    })
  } else {
    await prisma.cartItem.create({
      data: {
        cartId: cart.id,
        productId,
        quantity: 1,
        price: product.price,
      },
    })
  }

  await recalculateCart(cart.id)

  revalidatePath("/cart")
  return { success: true }
}

/* ------------------------------------------------------------------ */
/* UPDATE CART ITEM QUANTITY                                          */
/* ------------------------------------------------------------------ */

export async function updateCartItemQuantity(itemId: string, quantity: number) {
  const session = await requireAuth()

  const cart = await prisma.cart.findFirst({
    where: { userId: session.id },
  })

  if (!cart) return { success: false }

  if (quantity <= 0) {
    await prisma.cartItem.delete({
      where: { id: itemId },
    })
  } else {
    await prisma.cartItem.update({
      where: { id: itemId },
      data: { quantity },
    })
  }

  await recalculateCart(cart.id)

  revalidatePath("/cart")
  return { success: true }
}

/* ------------------------------------------------------------------ */
/* REMOVE FROM CART                                                   */
/* ------------------------------------------------------------------ */

export async function removeFromCart(itemId: string) {
  const session = await requireAuth()

  const cart = await prisma.cart.findFirst({
    where: { userId: session.id },
  })

  if (!cart) return { success: false }

  await prisma.cartItem.delete({
    where: { id: itemId },
  })

  await recalculateCart(cart.id)

  revalidatePath("/cart")
  return { success: true }
}

/* ------------------------------------------------------------------ */
/* CLEAR CART                                                         */
/* ------------------------------------------------------------------ */

export async function clearCart() {
  const session = await requireAuth()

  const cart = await prisma.cart.findFirst({
    where: { userId: session.id },
  })

  if (cart) {
    await prisma.cartItem.deleteMany({
      where: { cartId: cart.id },
    })

    await prisma.cart.update({
      where: { id: cart.id },
      data: { total: 0 },
    })
  }

  revalidatePath("/cart")
  return { success: true }
}

/* ------------------------------------------------------------------ */
/* GET CART                                                           */
/* ------------------------------------------------------------------ */

export async function getCart() {
  const session = await requireAuth()

  return prisma.cart.findFirst({
    where: { userId: session.id },
    include: {
      items: {
        include: {
          product: true,
        },
      },
    },
  })
}

/* ------------------------------------------------------------------ */
/* HELPERS                                                            */
/* ------------------------------------------------------------------ */

async function recalculateCart(cartId: string) {
  const items = await prisma.cartItem.findMany({
    where: { cartId },
  })

  const total = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  )

  await prisma.cart.update({
    where: { id: cartId },
    data: {
      total,
      updatedAt: new Date(),
    },
  })
}
