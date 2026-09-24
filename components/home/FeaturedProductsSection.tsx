import Link from "next/link"
import { ProductCard } from "@/components/product-card"
import { Button } from "@/components/ui/button"
import type { Product } from "@/lib/types"
import styles from "./FeaturedProductsSection.module.css"

async function getFeaturedProducts(): Promise<Product[]> { const res = await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/products?featured=true&limit=5`, { cache: "no-store" }); if (!res.ok) throw new Error("Failed to fetch featured products"); return (await res.json()).data.products }
export default async function FeaturedProductsSection() { const products = await getFeaturedProducts(); return <section className={styles.section}><div className={styles.container}><div className={styles.heading}><div><h2 className={styles.title}>Featured Products</h2><p className={styles.subtitle}>Our most popular automotive care solutions</p></div><Button variant="outline" asChild className={styles.desktopButton}><Link href="/products">View All Products</Link></Button></div><div className={styles.grid}>{products.map((product) => <ProductCard key={product.id} {...product}/>)}</div><div className={styles.mobileButton}><Button variant="outline" asChild><Link href="/products">View All Products</Link></Button></div></div></section> }
