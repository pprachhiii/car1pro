import Link from "next/link"
import { Phone, Mail, MapPin, Facebook, Instagram } from "lucide-react"

export function Footer() {
  return (
    <footer className="border-t bg-muted/30">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* BRAND */}
          <div>
            <h3 className="font-bold text-lg mb-4">CAR1PRO</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Premium automotive care products for enthusiasts and professionals.
            </p>
          </div>

          {/* PRODUCTS */}
          <div>
            <h4 className="font-semibold mb-4">Products</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link href="/products?category=washing-cleaning" className="hover:text-foreground">
                  Washing & Cleaning
                </Link>
              </li>
              <li>
                <Link href="/products?category=polishes-protectants" className="hover:text-foreground">
                  Polishes & Protectants
                </Link>
              </li>
              <li>
                <Link href="/products?category=accessories-tools" className="hover:text-foreground">
                  Accessories & Tools
                </Link>
              </li>
            </ul>
          </div>

          {/* COMPANY */}
          <div>
            <h4 className="font-semibold mb-4">Company</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link href="/about" className="hover:text-foreground">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/services" className="hover:text-foreground">
                  Services
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-foreground">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* CONTACT */}
          <div>
            <h4 className="font-semibold mb-4">Contact Us</h4>
            <ul className="space-y-3 text-sm text-muted-foreground mb-4">
              <li className="flex items-center gap-2">
                <Phone className="h-4 w-4" />
                +91 xxxxx xxxxx
              </li>
              <li className="flex items-center gap-2">
                <Mail className="h-4 w-4" />
                c1pro1129@gmail.com
              </li>
              <li className="flex items-center gap-2">
                <MapPin className="h-4 w-4" />
                Lucknow, Uttar Pradesh, India
              </li>
            </ul>

            {/* SOCIAL ICONS UNDER CONTACT */}
            <div className="flex items-center gap-4">
              <Link href="#" aria-label="Facebook">
                <Facebook className="h-5 w-5 hover:text-foreground transition-colors" />
              </Link>
              <Link href="#" aria-label="Instagram">
                <Instagram className="h-5 w-5 hover:text-foreground transition-colors" />
              </Link>
            </div>
          </div>
        </div>

        {/* BOTTOM - ONLY COPYRIGHT */}
        <div className="border-t mt-10 pt-6 text-center">
          <p className="text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} CAR1PRO. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
