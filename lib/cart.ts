import { prisma } from "@/lib/prisma"
import type { Cart, ApiResponse } from "./types"

/* ------------------------------------------------------------------ */
/* GET OR CREATE CART                                                 */
/* ------------------------------------------------------------------ */

export async function getCart(userId: string): Promise<Cart> {
  let cart = await prisma.cart.findFirst({
    where: { userId },
    include: { items: true },
  })

  if (!cart) {
    cart = await prisma.cart.create({
      data: {
        userId,
        total: 0,
      },
      include: { items: true },
    })
  }

  return cart as Cart
}

/* ------------------------------------------------------------------ */
/* ADD TO CART                                                        */
/* ------------------------------------------------------------------ */

export async function addToCart(
  userId: string,
  productId: string,
  quantity = 1
): Promise<ApiResponse<Cart>> {
  try {
    const product = await prisma.product.findUnique({
      where: { id: productId },
    })

    if (!product) {
      return { success: false, error: "Product not found" }
    }

    if (!product.inStock || product.stock < quantity) {
      return { success: false, error: "Product out of stock" }
    }

    const cart = await getCart(userId)

    const existingItem = await prisma.cartItem.findFirst({
      where: {
        cartId: cart.id,
        productId,
      },
    })

    if (existingItem) {
      await prisma.cartItem.update({
        where: { id: existingItem.id },
        data: {
          quantity: existingItem.quantity + quantity,
        },
      })
    } else {
      await prisma.cartItem.create({
        data: {
          cartId: cart.id,
          productId,
          quantity,
          price: product.price,
        },
      })
    }

    const updatedCart = await recalculateCart(cart.id)
    return { success: true, data: updatedCart }
  } catch (err) {
    console.error(err)
    return { success: false, error: "Failed to add item to cart" }
  }
}

/* ------------------------------------------------------------------ */
/* UPDATE CART ITEM                                                   */
/* ------------------------------------------------------------------ */

export async function updateCartItem(
  userId: string,
  productId: string,
  quantity: number
): Promise<ApiResponse<Cart>> {
  try {
    const cart = await getCart(userId)

    const item = await prisma.cartItem.findFirst({
      where: { cartId: cart.id, productId },
    })

    if (!item) {
      return { success: false, error: "Item not found in cart" }
    }

    if (quantity <= 0) {
      return removeFromCart(userId, productId)
    }

    const product = await prisma.product.findUnique({
      where: { id: productId },
    })

    if (!product || product.stock < quantity) {
      return { success: false, error: "Insufficient stock" }
    }

    await prisma.cartItem.update({
      where: { id: item.id },
      data: { quantity },
    })

    const updatedCart = await recalculateCart(cart.id)
    return { success: true, data: updatedCart }
  } catch (err) {
    console.error(err)
    return { success: false, error: "Failed to update cart item" }
  }
}

/* ------------------------------------------------------------------ */
/* REMOVE FROM CART                                                   */
/* ------------------------------------------------------------------ */

export async function removeFromCart(
  userId: string,
  productId: string
): Promise<ApiResponse<Cart>> {
  try {
    const cart = await getCart(userId)

    await prisma.cartItem.deleteMany({
      where: { cartId: cart.id, productId },
    })

    const updatedCart = await recalculateCart(cart.id)
    return { success: true, data: updatedCart }
  } catch (err) {
    console.error(err)
    return { success: false, error: "Failed to remove item from cart" }
  }
}

/* ------------------------------------------------------------------ */
/* CLEAR CART                                                         */
/* ------------------------------------------------------------------ */

export async function clearCart(userId: string): Promise<ApiResponse<Cart>> {
  try {
    const cart = await getCart(userId)

    await prisma.cartItem.deleteMany({
      where: { cartId: cart.id },
    })

    const updatedCart = await prisma.cart.update({
      where: { id: cart.id },
      data: { total: 0 },
      include: { items: true },
    })

    return { success: true, data: updatedCart as Cart }
  } catch (err) {
    console.error(err)
    return { success: false, error: "Failed to clear cart" }
  }
}

/* ------------------------------------------------------------------ */
/* RECALCULATE CART TOTAL                                             */
/* ------------------------------------------------------------------ */

async function recalculateCart(cartId: string): Promise<Cart> {
  const items = await prisma.cartItem.findMany({
    where: { cartId },
  })

  const total = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  )

  const cart = await prisma.cart.update({
    where: { id: cartId },
    data: {
      total,
      updatedAt: new Date(),
    },
    include: { items: true },
  })

  return cart as Cart
}
