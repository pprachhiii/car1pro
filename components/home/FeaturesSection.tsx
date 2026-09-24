import { Sparkles, Shield, Truck } from "lucide-react"
import styles from "./FeaturesSection.module.css"

const features = [[Sparkles, "Premium Quality", "Professional-grade formulas designed for superior results"], [Shield, "Safe Formulas", "pH-balanced and safe for all surfaces and finishes"], [Truck, "Fast Shipping", "Quick delivery on all orders with tracking included"]] as const

export default function FeaturesSection() {
  return <section className={styles.section}><div className={styles.container}><div className={styles.grid}>{features.map(([Icon,title,description]) => <div className={styles.feature} key={title}><div className={styles.icon}><Icon size={24}/></div><div><h3 className={styles.title}>{title}</h3><p className={styles.description}>{description}</p></div></div>)}</div></div></section>
}
