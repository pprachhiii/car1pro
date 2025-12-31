import { Footer } from "@/components/common/footer"
import HeaderWrapper from "@/components/common/header-wrapper"
import { Target, Eye, Heart, Award } from "lucide-react"
import Image from "next/image"

export default function AboutPage() {
  const values = [
    {
      icon: Target,
      title: "Our Mission",
      description:
        "To deliver innovative and reliable MAE solutions that exceed client expectations while maintaining the highest standards of quality and safety.",
    },
    {
      icon: Eye,
      title: "Our Vision",
      description:
        "To be the leading MAE services provider in the region, known for excellence, innovation, and sustainable engineering solutions.",
    },
    {
      icon: Heart,
      title: "Our Values",
      description:
        "Integrity, Excellence, Safety, Innovation, and Customer Satisfaction drive everything we do.",
    },
    {
      icon: Award,
      title: "Quality Commitment",
      description:
        "We are committed to HSEQ (Health, Safety, Environment, Quality) standards in all our operations.",
    },
  ]

  return (
    <div className="min-h-screen flex flex-col">
      <HeaderWrapper />

      <main className="flex-1">
        {/* HER */}
        <section className="relative w-full text-white py-20">
          <Image
            src="https://images.unsplash.com/photo-1694702740570-0a31ee1525c7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1920"
            alt="Modern building"
            fill
            priority
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/90 to-black/70" />

          <div className="relative z-10 container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              About CAR1PRO
            </h1>
            <p className="text-lg md:text-xl text-white/90 max-w-2xl mx-auto">
              Engineering Excellence Since Day One
            </p>
          </div>
        </section>

        {/* WHO WE ARE */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Who We Are
              </h2>
              <p className="text-muted-foreground text-lg leading-relaxed">
                CAR1PRO is a premier provider of Mechanical, Electrical, and Plumbing (MAE) services,
                delivering innovative engineering solutions with a strong focus on quality, safety,
                and long-term reliability.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              {/* Image */}
              <div className="relative h-[400px] rounded-lg overflow-hidden">
                <Image
                  src="https://images.unsplash.com/photo-1664902578190-ec984429fabc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1600"
                  alt="Our team"
                  fill
                  className="object-cover"
                />
              </div>

              {/* Content */}
              <div>
                <h3 className="text-2xl md:text-3xl font-semibold mb-4">
                  Our Story
                </h3>
                <p className="text-muted-foreground mb-4 leading-relaxed">
                  Founded with a vision to transform the MAE services industry, CAR1PRO has grown
                  into a trusted partner for commercial, residential, and industrial projects.
                </p>
                <p className="text-muted-foreground mb-4 leading-relaxed">
                  Our success is built on technical excellence, innovative thinking, and an
                  unwavering commitment to our clients.
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  We continuously invest in people, technology, and best practices to exceed
                  industry standards.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* VALUES */}
        <section className="py-20 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {values.map((value, index) => {
                const Icon = value.icon
                return (
                  <div
                    key={index}
                    className="bg-background p-8 rounded-lg shadow-sm text-center"
                  >
                    <div className="flex justify-center mb-4">
                      <Icon className="h-10 w-10 text-accent" />
                    </div>
                    <h3 className="text-xl font-semibold mb-3">
                      {value.title}
                    </h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      {value.description}
                    </p>
                  </div>
                )
              })}
            </div>
          </div>
        </section>

        {/* HSEQ */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                HSEQ Commitment
              </h2>
              <p className="text-muted-foreground text-lg">
                Health, Safety, Environment, and Quality are fundamental to how we operate and deliver value.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              {[
                ["Safety First", "Rigorous safety protocols and continuous training for all teams."],
                ["Quality Assurance", "Robust quality systems ensuring excellence in every project."],
                ["Environmental Responsibility", "Sustainable practices to minimize environmental impact."],
                ["Continuous Improvement", "Ongoing process evaluation to stay ahead of industry standards."],
              ].map(([title, desc]) => (
                <div key={title} className="bg-muted/30 p-6 rounded-lg">
                  <h3 className="text-lg font-semibold mb-2">{title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
