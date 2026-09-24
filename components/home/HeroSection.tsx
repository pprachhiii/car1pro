"use client"

import Link from "next/link"
import { useEffect, useState } from "react"
import { motion } from "motion/react"
import type { Product } from "@/lib/types"
import { ProductPiece } from "./ProductArt"
import { ProductInspector } from "./ProductInspector"
import { StudioFrame } from "./StudioFrame"

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
    const controller = new AbortController()
    fetch("/api/products?featured=true&limit=4", { cache: "no-store", signal: controller.signal })
      .then(async (response) => {
        if (!response.ok) throw new Error("Unable to load featured products")
        const result = await response.json()
        setProducts(result.data?.products ?? [])
      })
      .catch((error) => {
        if (error.name !== "AbortError") console.error("Hero products:", error)
      })
    return () => controller.abort()
  }, [])

  return (
    <StudioFrame room="outside the shop">
      <motion.div className="scene-shell h-full" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.7 }}>
        <svg viewBox="0 0 1000 620" className="h-full w-full" preserveAspectRatio="xMidYMid slice" role="img" aria-label="CAR1PRO product display">
          <defs>
            <linearGradient id="streetSky" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="var(--primary)" /><stop offset="100%" stopColor="var(--secondary)" /></linearGradient>
            <linearGradient id="shopGlass" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stopColor="var(--primary)" stopOpacity=".94" /><stop offset="55%" stopColor="var(--secondary)" stopOpacity=".78" /><stop offset="100%" stopColor="var(--primary)" stopOpacity=".65" /></linearGradient>
            <linearGradient id="pavement" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="var(--muted)" /><stop offset="100%" stopColor="var(--background)" /></linearGradient>
            <filter id="windowShadow" x="-20%" y="-20%" width="140%" height="140%"><feDropShadow dx="0" dy="8" stdDeviation="8" floodColor="var(--foreground)" floodOpacity=".35" /></filter>
            <clipPath id="leftWindow"><rect x="70" y="242" width="335" height="225" rx="2" /></clipPath>
            <clipPath id="rightWindow"><rect x="595" y="242" width="335" height="225" rx="2" /></clipPath>
          </defs>
          <rect width="1000" height="620" fill="url(#streetSky)" />
          <rect y="108" width="1000" height="388" fill="var(--muted)" />
          <g stroke="var(--border)" strokeWidth="1" opacity=".45">{[132,178,224,270,316,362,408,454].map((y) => <path key={y} d={`M0 ${y}h1000`} />)}{[28,158,288,418,548,678,808,938].map((x, i) => <path key={x} d={`M${x + (i % 2 ? 64 : 0)} 108v388`} />)}</g>
          <rect y="496" width="1000" height="124" fill="url(#pavement)" />
          <path d="M0 520h1000M0 584h1000" stroke="var(--foreground)" strokeWidth="2" opacity=".2" />
          {[70,255,450,640,825].map((x) => <path key={x} d={`M${x} 496l-28 124`} stroke="var(--foreground)" opacity=".18" />)}
          <rect x="43" y="120" width="914" height="388" rx="2" fill="var(--foreground)" filter="url(#windowShadow)" />
          <rect x="55" y="132" width="890" height="92" fill="var(--primary)" />
          <path d="M55 224h890" stroke="var(--accent)" strokeWidth="4" />
          <text x="500" y="178" textAnchor="middle" fill="var(--accent)" fontSize="35" fontWeight="700" letterSpacing="7">CAR1PRO</text>
          <text x="500" y="204" textAnchor="middle" fill="var(--background)" opacity=".8" fontSize="9" letterSpacing="4">AUTOMOTIVE ACCESSORIES · CAR CARE · FITTING</text>
          <rect x="70" y="242" width="335" height="225" rx="2" fill="url(#shopGlass)" />
          <rect x="595" y="242" width="335" height="225" rx="2" fill="url(#shopGlass)" />
          <g opacity=".4" stroke="var(--accent)" strokeWidth="2"><path d="M80 245h315M605 245h315M82 401h311M607 401h311" /></g>
          <g fill="var(--background)" opacity=".92"><path d="M92 413h286l-12 54H104z" /><path d="M617 413h286l-12 54H629z" /></g>
          <g fill="var(--accent)" opacity=".7"><ellipse cx="238" cy="276" rx="92" ry="34" /><ellipse cx="762" cy="276" rx="92" ry="34" /></g>
          {products.map((product, index) => {
            const position = positions[index]
            if (!position) return null
            return <motion.g key={product.id} role="button" tabIndex={0} className="cursor-pointer" aria-label={`View ${product.name}`} onClick={() => setSelected(product)} onKeyDown={(event) => { if (event.key === "Enter" || event.key === " ") setSelected(product) }} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: .35 + index * .08 }} whileHover={{ y: -5 }}><rect x={position.x - 8} y={position.y - 8} width="88" height="93" fill="transparent" /><ProductPiece product={product} x={position.x} y={position.y} scale={position.scale} /></motion.g>
          })}
          <g fill="var(--primary)"><rect x="66" y="238" width="8" height="237" /><rect x="401" y="238" width="8" height="237" /><rect x="591" y="238" width="8" height="237" /><rect x="926" y="238" width="8" height="237" /></g>
          <g fill="var(--background)" opacity=".16"><path d="M88 244h66L82 465H74z" clipPath="url(#leftWindow)" /><path d="M180 244h28l-70 221h-28z" clipPath="url(#leftWindow)" /><path d="M612 244h66l-72 221h-8z" clipPath="url(#rightWindow)" /><path d="M704 244h28l-70 221h-28z" clipPath="url(#rightWindow)" /></g>
          <Link href="/products"><g role="link" tabIndex={0} className="cursor-pointer" aria-label="Browse products"><rect x="429" y="239" width="142" height="269" rx="2" fill="var(--primary)" /><rect x="440" y="250" width="120" height="203" rx="1" fill="url(#shopGlass)" stroke="var(--accent)" strokeWidth="2" /><path d="M448 259h104L478 445h-30z" fill="var(--background)" opacity=".12" /><rect x="458" y="326" width="84" height="42" rx="2" fill="var(--background)" /><text x="500" y="343" textAnchor="middle" fill="var(--foreground)" fontSize="8" letterSpacing="2">PLEASE COME IN</text><text x="500" y="358" textAnchor="middle" fill="var(--accent)" fontSize="6.5" letterSpacing="1.3">OPEN · BROWSE INSIDE</text><circle cx="546" cy="387" r="5" fill="var(--accent)" /><rect x="444" y="464" width="112" height="30" fill="var(--foreground)" /><text x="500" y="483" textAnchor="middle" fill="var(--accent)" fontSize="7" letterSpacing="2">CAR1PRO SHOP</text></g></Link>
          <g fill="var(--accent)" fontSize="7" letterSpacing="1.6"><text x="237" y="454" textAnchor="middle">DETAILING · PROTECTION</text><text x="762" y="454" textAnchor="middle">TECH · STORAGE · TRAVEL</text></g>
          <rect x="32" y="486" width="936" height="14" fill="var(--primary)" /><rect x="418" y="500" width="164" height="12" rx="1" fill="var(--foreground)" opacity=".7" />
        </svg>
      </motion.div>
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: .55 }} className="absolute right-4 bottom-14 z-20 flex max-w-[calc(100vw-2rem)] gap-2 sm:right-6"><Link href="/services" className="rounded-sm border border-accent/60 bg-primary/90 px-3 py-2 text-primary-foreground backdrop-blur">View services</Link><Link href="/products" className="rounded-sm bg-accent px-3 py-2 text-accent-foreground shadow-lg">Enter shop</Link></motion.div>
      <p className="pointer-events-none absolute bottom-3 right-4 z-20 hidden text-accent/80 sm:block">Window display · select an item to inspect</p>
      <ProductInspector product={selected} onClose={() => setSelected(null)} />
    </StudioFrame>
  )
}
