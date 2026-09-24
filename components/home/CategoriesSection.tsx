import Link from "next/link"
import styles from "./CategoriesSection.module.css"

const categories = [
  ["washing-cleaning", "Washing & Cleaning", "Premium soaps, shampoos, and cleaning solutions"],
  ["polishes-protectants", "Polishes & Protectants", "Waxes, sealants, and ceramic coatings"],
  ["accessories-tools", "Accessories & Tools", "Professional-grade detailing equipment"],
]

export default function CategoriesSection() {
  return <section className={styles.section}><div className={styles.container}><h2 className={styles.title}>Shop by Category</h2><div className={styles.grid}>{categories.map(([slug, title, description]) => <Link key={slug} href={`/products?category=${slug}`} className={styles.link}><div className={styles.card}><h3 className={styles.cardTitle}>{title}</h3><p className={styles.description}>{description}</p></div></Link>)}</div></div></section>
}
