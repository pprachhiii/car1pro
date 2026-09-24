"use client"

import { AnimatePresence, motion } from "motion/react"
import { useState } from "react"
import { addToCart } from "@/app/actions/cart"
import type { Product } from "@/lib/types"

export function ProductInspector({ product, onClose }: { product: Product | null; onClose: () => void }) {
  const [qty, setQty] = useState(1)
  const [status, setStatus] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  async function handleAdd() {
    if (!product) return
    setLoading(true)
    const result = await Promise.all(Array.from({ length: qty }, () => addToCart(product.id)))
    setStatus(result.every((item) => item.success) ? "In your trolley" : result.find((item) => item.error)?.error ?? "Unable to add")
    setLoading(false)
  }

  return <AnimatePresence onExitComplete={() => { setQty(1); setStatus(null) }}>{product && <motion.aside key={product.id} initial={{ opacity: 0, y: 40, scale: .94 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 30, scale: .96 }} className="absolute inset-x-3 bottom-3 z-40 max-h-[72dvh] overflow-auto rounded-sm border border-accent/40 bg-card/95 p-4 shadow-2xl backdrop-blur sm:inset-x-auto sm:right-6 sm:bottom-6 sm:w-[26rem] sm:p-5">
    <div className="flex gap-4"><div className="h-24 w-24 shrink-0 overflow-hidden rounded-sm border bg-muted p-1"><img src={product.image || "/placeholder.svg"} alt={product.name} className="h-full w-full object-cover" /></div><div><p className="text-xs uppercase text-muted-foreground">{product.category}</p><h2 className="mt-1 text-xl leading-tight">{product.name}</h2><p className="mt-1 text-lg text-accent">₹{product.price.toLocaleString("en-IN")}</p></div></div>
    <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{product.longDescription || product.description}</p>
    {product.features?.length > 0 && <ul className="mt-3 space-y-1 text-sm text-muted-foreground">{product.features.map((feature) => <li key={feature}>• {feature}</li>)}</ul>}
    <div className="mt-4 flex items-center gap-3"><div className="flex items-center rounded-sm border"><button className="px-3 py-1.5 text-lg" onClick={() => setQty((value) => Math.max(1, value - 1))}>−</button><span className="w-8 text-center text-sm">{qty}</span><button className="px-3 py-1.5 text-lg" onClick={() => setQty((value) => Math.min(product.stock || 1, value + 1))}>+</button></div><button onClick={handleAdd} disabled={!product.inStock || loading} className="flex-1 rounded-sm bg-primary px-4 py-2.5 text-primary-foreground disabled:opacity-50">{!product.inStock ? "Out of stock" : loading ? "Adding..." : status || "Put it in the trolley"}</button></div>
    <button onClick={onClose} className="mt-3 ml-auto block text-sm text-muted-foreground underline">Set it back down</button>
  </motion.aside>}</AnimatePresence>
}
