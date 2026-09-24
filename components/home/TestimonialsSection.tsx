import { Star } from "lucide-react"
import styles from "./TestimonialsSection.module.css"

const testimonials = [{ name: "Ahmed Al Mansoori", text: "CAR1PRO products transformed my car care routine. The BubbleWash foam is incredible!", rating: 5 }, { name: "Sarah Johnson", text: "Professional quality products and excellent service. Highly recommended!", rating: 5 }]

export default function TestimonialsSection() { return <section className={styles.section}><div className={styles.container}><h2 className={styles.title}>What Our Clients Say</h2><div className={styles.grid}>{testimonials.map((testimonial) => <div className={styles.card} key={testimonial.name}><div className={styles.stars}>{Array.from({length:testimonial.rating}).map((_,index)=><Star key={index} size={20} fill="#FCD34D" stroke="#FCD34D"/>)}</div><p className={styles.quote}>“{testimonial.text}”</p><p className={styles.author}>— {testimonial.name}</p></div>)}</div></div></section> }
