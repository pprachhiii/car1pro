import type { Product } from "@/lib/types"
import styles from "./ProductArt.module.css"
export function ProductPiece({ product, x=0, y=0, scale=1 }: { product: Product; x?: number; y?: number; scale?: number }) { return product.image ? <image href={product.image} x={x} y={y} width={100*scale} height={100*scale} preserveAspectRatio="xMidYMid slice" aria-label={product.name}/> : null }
export function ProductPortrait({ product }: { product: Product }) { return <img src={product.image || "/placeholder.svg"} alt={product.name} loading="lazy" width={512} height={512} className={styles.portrait}/> }
