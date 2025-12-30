"use client"

import { createContext, useContext, useState, ReactNode } from "react"

interface CartContextType {
  items: number
  setItems: React.Dispatch<React.SetStateAction<number>>
}

const CartContext = createContext<CartContextType | undefined>(undefined)

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<number>(0) // <-- type here

  return (
    <CartContext.Provider value={{ items, setItems }}>
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const context = useContext(CartContext)
  if (!context) throw new Error("useCart must be used within CartProvider")
  return context
}
