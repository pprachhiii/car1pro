// Type definitions for the application
// Synced with Prisma schema ✅

/* ------------------------------------------------------------------ */
/* ENUMS                                                               */
/* ------------------------------------------------------------------ */

export type UserRole = "user" | "admin"

export type OrderStatus =
  | "pending"
  | "processing"
  | "shipped"
  | "delivered"
  | "cancelled"

export type PaymentStatus = "pending" | "paid" | "failed"

/* ------------------------------------------------------------------ */
/* USER                                                                */
/* ------------------------------------------------------------------ */

export interface User {
  id: string
  email: string
  name: string
  password: string
  role: UserRole
  createdAt: Date
  updatedAt: Date
}

/* ------------------------------------------------------------------ */
/* PRODUCT                                                             */
/* ------------------------------------------------------------------ */

export interface Product {
  id: string

  name: string
  slug: string
  description: string
  longDescription?: string | null
  features: string[]

  price: number
  image: string
  category: string
  brand?: string | null
  model?: string | null
  year?: number | null

  featured: boolean
  isActive: boolean
  inStock: boolean
  stock: number

  createdAt: Date
  updatedAt: Date
}

/* ------------------------------------------------------------------ */
/* CART                                                                */
/* ------------------------------------------------------------------ */

export interface Cart {
  id: string
  userId: string
  total: number
  updatedAt: Date
  items: CartItem[]
}

export interface CartItem {
  id: string
  cartId: string
  productId: string
  quantity: number
  price: number
}

/* ------------------------------------------------------------------ */
/* ORDER                                                               */
/* ------------------------------------------------------------------ */

export interface Order {
  id: string
  userId: string
  total: number
  status: OrderStatus
  paymentMethod: string
  paymentStatus: PaymentStatus
  shippingAddress: Address | Record<string, any>
  createdAt: Date
  updatedAt: Date
  items: OrderItem[]
}

export interface OrderItem {
  id: string
  orderId: string
  productId: string
  quantity: number
  price: number
}

/* ------------------------------------------------------------------ */
/* ADDRESS                                                             */
/* ------------------------------------------------------------------ */

export interface Address {
  fullName: string
  street: string
  city: string
  state: string
  zipCode: string
  country: string
  phone: string
}

/* ------------------------------------------------------------------ */
/* REVIEW                                                              */
/* ------------------------------------------------------------------ */

export interface Review {
  id: string
  productId: string
  userId: string
  rating: number
  comment?: string | null
  createdAt: Date
}

/* ------------------------------------------------------------------ */
/* API RESPONSE                                                        */
/* ------------------------------------------------------------------ */

export interface ApiResponse<T = any> {
  success: boolean
  data?: T
  error?: string
  message?: string
}
