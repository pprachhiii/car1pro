;
import { Footer } from "@/components/common/footer";
import { ContactForm } from "@/components/contact-form";
import { Phone, Mail, MapPin, MessageCircle } from "lucide-react";
import HeaderWrapper from "@/components/common/header-wrapper";

export default function ContactPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <HeaderWrapper />

      <main className="flex-1">
        {/* Hero */}
        <section className="bg-primary text-primary-foreground py-20">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Contact Us
            </h1>
            <p className="text-lg text-primary-foreground/90 max-w-2xl mx-auto">
              Let’s discuss your project or answer any questions you may have.
            </p>
          </div>
        </section>

        {/* Content */}
        <section className="py-20">
          <div className="container mx-auto px-4 grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Left: Form */}
            <ContactForm />

            {/* Right: Contact Info + Map */}
            <div className="space-y-6">
              <h2 className="text-3xl font-semibold mb-4">Get in Touch</h2>
              <p className="text-muted-foreground mb-8">
                Prefer reaching us directly? We’re happy to help.
              </p>

              <div className="space-y-4">
                <div className="flex gap-4">
                  <Phone className="text-accent" size={24} />
                  <div>
                    <p className="font-medium">Phone</p>
                    <p className="text-sm text-muted-foreground">+91 XXXXX XXXXX</p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <Mail className="text-accent" size={24} />
                  <div>
                    <p className="font-medium">Email</p>
                    <p className="text-sm text-muted-foreground">c1pro1129@gmail.com</p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <MapPin className="text-accent" size={24} />
                  <div>
                    <p className="font-medium">Office</p>
                    <p className="text-sm text-muted-foreground">
                      Lucknow, Uttar Pradesh, India
                    </p>
                  </div>
                </div>
              </div>

              {/* Quick Actions */}
              <div className="mt-8 flex flex-col gap-3">
                <a
                  href="tel:+91XXXXXXXX"
                  className="flex items-center justify-center gap-2 rounded-md bg-primary px-6 py-3 text-primary-foreground hover:opacity-90"
                >
                  <Phone size={18} /> Call Us
                </a>
                <a
                  href="https://wa.me/971XXXXXXX"
                  target="_blank"
                  className="flex items-center justify-center gap-2 rounded-md bg-green-600 px-6 py-3 text-white hover:bg-green-700"
                >
                  <MessageCircle size={18} /> WhatsApp
                </a>
              </div>

              {/* Map */}
              <div className="mt-8">
                <h3 className="text-xl mb-4">Location</h3>
                <div className="aspect-w-16 aspect-h-9 rounded-lg overflow-hidden">
                  <iframe
  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3609.037467617302!2d80.92113991502123!3d26.846693983151554!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x399bfd1aa8e3c0d3%3A0xbee1929d2be93c0!2sLucknow%2C%20Uttar%20Pradesh%2C%20India!5e0!3m2!1sen!2s!4v1700000000000"
  width="100%"
  height="300"
  style={{ border: 0 }}
  allowFullScreen
  loading="lazy"
  referrerPolicy="no-referrer-when-downgrade"
  title="Office Location in Lucknow"
/>

                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
