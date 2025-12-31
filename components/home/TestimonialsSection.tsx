import { Star } from "lucide-react"

const testimonials = [
  {
    name: "Ahmed Al Mansoori",
    text: "CAR1PRO products transformed my car care routine. The BubbleWash foam is incredible!",
    rating: 5,
  },
  {
    name: "Sarah Johnson",
    text: "Professional quality products and excellent service. Highly recommended!",
    rating: 5,
  },
]

export default function TestimonialsSection() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl text-center mb-12">
          What Our Clients Say
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="bg-gray-50 p-8 rounded-lg">
              <div className="flex gap-1 mb-4">
                {Array.from({ length: testimonial.rating }).map((_, i) => (
                  <Star
                    key={i}
                    size={20}
                    fill="#FCD34D"
                    stroke="#FCD34D"
                  />
                ))}
              </div>
              <p className="text-gray-700 mb-4 italic">
                "{testimonial.text}"
              </p>
              <p className="text-gray-900">— {testimonial.name}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
