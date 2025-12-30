// Type definitions for the application

export interface User {
  id: string
  email: string
  name: string
  password: string
  role: "user" | "admin"
  createdAt: Date
  updatedAt: Date
}


export interface Product {
  id: string
  name: string
  slug: string
  description: string
  price: number
  image: string
  category: string
  brand?: string
  model?: string
  year?: number
  featured: boolean
  inStock: boolean
  stock: number
  createdAt: Date
  updatedAt: Date
}

export interface CartItem {
  id: string
  productId: string
  quantity: number
  price: number
}

export interface Cart {
  id: string
  userId: string
  items: CartItem[]
  total: number
  updatedAt: Date
}

export interface Order {
  id: string
  userId: string
  items: CartItem[]
  total: number
  status: "pending" | "processing" | "shipped" | "delivered" | "cancelled"
  shippingAddress: Address
  paymentMethod: string
  paymentStatus: "pending" | "paid" | "failed"
  createdAt: Date
  updatedAt: Date
}

export interface Address {
  fullName: string
  street: string
  city: string
  state: string
  zipCode: string
  country: string
  phone: string
}

export interface Review {
  id: string
  productId: string
  userId: string
  rating: number
  comment: string
  createdAt: Date
}

export interface ApiResponse<T = any> {
  success: boolean
  data?: T
  error?: string
  message?: string
}
