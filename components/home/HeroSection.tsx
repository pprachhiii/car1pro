"use client"

import Link from "next/link"
import { motion } from "motion/react"
import { useEffect, useState } from "react"
import { ProductPiece } from "./ProductArt"
import { ProductInspector } from "./ProductInspector"
import { StudioFrame } from "./StudioFrame"
import type { Product } from "@/lib/types"

const positions = [
  { x: 118, y: 332, scale: 0.72 },
  { x: 230, y: 326, scale: 0.7 },
  { x: 660, y: 330, scale: 0.7 },
  { x: 770, y: 332, scale: 0.72 },
]

export default function HeroSection() {
  const [products, setProducts] = useState<Product[]>([])
  const [selected, setSelected] = useState<Product | null>(null)

  useEffect(() => {
    let cancelled = false
    fetch("/api/products?limit=4", { cache: "no-store" })
      .then((response) => {
        if (!response.ok) throw new Error("Failed to load products")
        return response.json()
      })
      .then((json) => {
        if (!cancelled) setProducts(json.data?.products ?? [])
      })
      .catch((error) => console.error("Hero products error:", error))
    return () => { cancelled = true }
  }, [])

  return (
    <StudioFrame room="outside the shop">
      <motion.div className="scene-shell h-full w-full" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.7 }}>
        <svg viewBox="0 0 1000 620" className="h-full w-full" preserveAspectRatio="xMidYMid slice">
          <defs>
            <linearGradient id="streetSky" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="var(--sky-dusk)" /><stop offset="100%" stopColor="var(--secondary)" /></linearGradient>
            <linearGradient id="shopGlass" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stopColor="var(--walnut-deep)" stopOpacity=".92" /><stop offset="55%" stopColor="var(--walnut)" stopOpacity=".72" /><stop offset="100%" stopColor="var(--sky-dusk)" stopOpacity=".6" /></linearGradient>
            <linearGradient id="pavement" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="var(--floor)" /><stop offset="100%" stopColor="var(--floor-shade)" /></linearGradient>
            <filter id="windowShadow"><feDropShadow dx="0" dy="8" stdDeviation="8" floodColor="var(--walnut-deep)" floodOpacity=".35" /></filter>
            <clipPath id="leftWindow"><rect x="70" y="242" width="335" height="225" /></clipPath><clipPath id="rightWindow"><rect x="595" y="242" width="335" height="225" /></clipPath>
          </defs>
          <rect width="1000" height="620" fill="url(#streetSky)" /><rect y="108" width="1000" height="388" fill="var(--plaster)" />
          <g stroke="var(--border)" strokeWidth="1" opacity=".45">{[132,178,224,270,316,362,408,454].map((y) => <path key={y} d={`M0 ${y}h1000`} />)}{[28,158,288,418,548,678,808,938].map((x, i) => <path key={x} d={`M${x + (i % 2 ? 64 : 0)} 108v388`} />)}</g>
          <rect y="496" width="1000" height="124" fill="url(#pavement)" /><path d="M0 520h1000M0 584h1000" stroke="var(--floor-shade)" strokeWidth="2" opacity=".6" />
          {[70,255,450,640,825].map((x) => <path key={x} d={`M${x} 496l-28 124`} stroke="var(--floor-shade)" opacity=".55" />)}
          <rect x="43" y="120" width="914" height="388" rx="2" fill="var(--walnut-deep)" filter="url(#windowShadow)" /><rect x="55" y="132" width="890" height="92" fill="var(--walnut)" /><path d="M55 224h890" stroke="var(--brass)" strokeWidth="4" />
          <text x="500" y="178" textAnchor="middle" fill="var(--brass)" fontSize="35" fontFamily="var(--font-display)" letterSpacing="7">CAR1PRO</text><text x="500" y="204" textAnchor="middle" fill="var(--plaster)" opacity=".76" fontSize="9" fontFamily="var(--font-sans)" letterSpacing="4">AUTOMOTIVE CARE · ACCESSORIES · DETAILING</text>
          <rect x="70" y="242" width="335" height="225" fill="url(#shopGlass)" /><rect x="595" y="242" width="335" height="225" fill="url(#shopGlass)" /><g opacity=".4" stroke="var(--brass)" strokeWidth="2"><path d="M80 245h315M605 245h315M82 401h311M607 401h311" /></g><g fill="var(--plaster)" opacity=".92"><path d="M92 413h286l-12 54H104z" /><path d="M617 413h286l-12 54H629z" /></g>
          {products.map((product, index) => { const position = positions[index]; return position ? <motion.g key={product.id} role="button" tabIndex={0} className="cursor-pointer" aria-label={`View ${product.name}`} onClick={() => setSelected(product)} onKeyDown={(event) => { if (event.key === "Enter" || event.key === " ") setSelected(product) }} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: .35 + index * .08 }} whileHover={{ y: -5 }}><rect x={position.x - 8} y={position.y - 8} width="108" height="108" fill="transparent" /><ProductPiece product={product} x={position.x} y={position.y} scale={position.scale} /></motion.g> : null })}
          <g fill="var(--walnut)"><rect x="66" y="238" width="8" height="237" /><rect x="401" y="238" width="8" height="237" /><rect x="591" y="238" width="8" height="237" /><rect x="926" y="238" width="8" height="237" /></g><g fill="var(--plaster)" opacity=".16"><path d="M88 244h66L82 465H74z" clipPath="url(#leftWindow)" /><path d="M612 244h66l-72 221h-8z" clipPath="url(#rightWindow)" /></g>
          <Link href="/products"><g className="cursor-pointer"><rect x="429" y="239" width="142" height="269" rx="2" fill="var(--walnut)" /><rect x="440" y="250" width="120" height="203" fill="url(#shopGlass)" stroke="var(--brass)" strokeWidth="2" /><rect x="458" y="326" width="84" height="42" rx="2" fill="var(--plaster)" /><text x="500" y="343" textAnchor="middle" fill="var(--walnut)" fontSize="8" fontFamily="var(--font-sans)" letterSpacing="2">PLEASE COME IN</text><text x="500" y="358" textAnchor="middle" fill="var(--clay)" fontSize="6.5" fontFamily="var(--font-sans)" letterSpacing="1.3">OPEN · BROWSE INSIDE</text><circle cx="546" cy="387" r="5" fill="var(--brass)" /></g></Link>
          <rect x="32" y="486" width="936" height="14" fill="var(--walnut)" /><rect x="418" y="500" width="164" height="12" fill="var(--cloth-ink)" opacity=".7" />
        </svg>
      </motion.div>
      <div className="absolute right-4 bottom-14 z-20 flex gap-2 sm:right-6"><Link href="/services" className="rounded-sm border border-brass/60 bg-walnut-deep/90 px-3 py-2 text-plaster">View services</Link><Link href="/products" className="rounded-sm bg-brass px-3 py-2 text-walnut-deep">Enter shop</Link></div>
      <ProductInspector product={selected} onClose={() => setSelected(null)} />
    </StudioFrame>
  )
}
