"use client"

import Link from "next/link"
import { useEffect, useState } from "react"
import { motion } from "motion/react"
import type { Product } from "@/lib/types"
import { ProductPiece } from "./ProductArt"
import { ProductInspector } from "./ProductInspector"
import { StudioFrame } from "./StudioFrame"

type ProductResponse = { success: boolean; data?: { products: Product[] } }

const displayPositions = [
  { x: 118, y: 332, scale: 0.72 },
  { x: 230, y: 326, scale: 0.7 },
  { x: 660, y: 330, scale: 0.7 },
  { x: 770, y: 332, scale: 0.72 },
]

export default function HeroSection() {
  const [products, setProducts] = useState<Product[]>([])
  const [selected, setSelected] = useState<Product | null>(null)

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const response = await fetch("/api/products?featured=true&limit=4", { cache: "no-store" })
        const json: ProductResponse = await response.json()
        if (response.ok && json.success) setProducts(json.data?.products ?? [])
      } catch (error) {
        console.error("Unable to load hero products", error)
      }
    }
    void loadProducts()
  }, [])

  return (
    <StudioFrame room="outside the shop">
      <motion.div className="scene-shell" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.7 }}>
        <svg viewBox="0 0 1000 620" className="h-full w-full" preserveAspectRatio="xMidYMid slice" aria-label="CAR1PRO product display">
          <defs>
            <linearGradient id="hero-sky" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="var(--primary)" /><stop offset="100%" stopColor="var(--secondary)" /></linearGradient>
            <linearGradient id="hero-glass" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stopColor="var(--primary)" stopOpacity=".95" /><stop offset="100%" stopColor="var(--secondary)" stopOpacity=".7" /></linearGradient>
            <linearGradient id="hero-floor" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="var(--muted)" /><stop offset="100%" stopColor="var(--background)" /></linearGradient>
          </defs>
          <rect width="1000" height="620" fill="url(#hero-sky)" />
          <rect y="108" width="1000" height="388" fill="var(--muted)" />
          <g stroke="var(--border)" opacity=".45">{[132,178,224,270,316,362,408,454].map((y) => <path key={y} d={`M0 ${y}h1000`} />)}</g>
          <rect y="496" width="1000" height="124" fill="url(#hero-floor)" />
          <rect x="43" y="120" width="914" height="388" rx="2" fill="var(--foreground)" opacity=".92" />
          <rect x="55" y="132" width="890" height="92" fill="var(--primary)" />
          <path d="M55 224h890" stroke="var(--accent)" strokeWidth="4" />
          <text x="500" y="178" textAnchor="middle" fill="var(--accent)" fontSize="35" fontWeight="700" letterSpacing="7">CAR1PRO</text>
          <text x="500" y="204" textAnchor="middle" fill="var(--background)" opacity=".8" fontSize="9" letterSpacing="4">AUTOMOTIVE CARE · ACCESSORIES · DETAILING</text>
          <rect x="70" y="242" width="335" height="225" rx="2" fill="url(#hero-glass)" />
          <rect x="595" y="242" width="335" height="225" rx="2" fill="url(#hero-glass)" />
          <g fill="var(--background)" opacity=".9"><path d="M92 413h286l-12 54H104z" /><path d="M617 413h286l-12 54H629z" /></g>
          {products.map((product, index) => {
            const position = displayPositions[index]
            if (!position) return null
            return <motion.g key={product.id} role="button" tabIndex={0} className="cursor-pointer" aria-label={`View ${product.name}`} onClick={() => setSelected(product)} onKeyDown={(event) => { if (event.key === "Enter" || event.key === " ") setSelected(product) }} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: .35 + index * .08 }} whileHover={{ y: -5 }}><rect x={position.x - 8} y={position.y - 8} width="88" height="93" fill="transparent" /><g transform={`translate(${position.x} ${position.y})`}><ProductPiece product={product} scale={position.scale} /></g></motion.g>
          })}
          <rect x="429" y="239" width="142" height="269" rx="2" fill="var(--primary)" />
          <rect x="440" y="250" width="120" height="203" rx="1" fill="url(#hero-glass)" stroke="var(--accent)" strokeWidth="2" />
          <rect x="458" y="326" width="84" height="42" rx="2" fill="var(--background)" />
          <text x="500" y="343" textAnchor="middle" fill="var(--foreground)" fontSize="8" letterSpacing="2">PLEASE COME IN</text>
          <text x="500" y="358" textAnchor="middle" fill="var(--accent)" fontSize="6.5" letterSpacing="1.3">OPEN · BROWSE INSIDE</text>
          <g fill="var(--primary)"><rect x="66" y="238" width="8" height="237" /><rect x="401" y="238" width="8" height="237" /><rect x="591" y="238" width="8" height="237" /><rect x="926" y="238" width="8" height="237" /></g>
        </svg>
      </motion.div>
      <div className="absolute right-4 bottom-14 z-20 flex gap-2 sm:right-6"><Link href="/services" className="rounded-sm border border-accent/60 bg-primary/90 px-3 py-2 text-primary-foreground backdrop-blur">View services</Link><Link href="/products" className="rounded-sm bg-accent px-3 py-2 text-accent-foreground shadow-lg">Enter shop</Link></div>
      <p className="pointer-events-none absolute bottom-3 right-4 z-20 hidden text-accent/80 sm:block">Window display · select an item to inspect</p>
      <ProductInspector product={selected} onClose={() => setSelected(null)} />
    </StudioFrame>
  )
}
