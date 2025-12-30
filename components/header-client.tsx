"use client"
import Link from "next/link"
import { ShoppingCart, Menu, Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { UserMenu } from "./user-menu"
import { useCart } from "./card-context"
import Image from "next/image"

export function HeaderClient({ session }: { session: any }) {
  const { items } = useCart()


  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto grid h-16 grid-cols-3 items-center px-4">
        {/* LEFT - LOGO */}
<div className="flex items-center">
  <Link href="/" className="flex items-center space-x-2">
    {/* Logo Image */}
    <Image
      src="/logo.jpg"
      alt="CAR1PRO Logo"
      width={40}
      height={40}
      className="object-contain"
    />
    {/* Brand Text */}
    <span className="text-xl font-bold tracking-tight">CAR1PRO</span>
  </Link>
</div>


        {/* CENTER - NAV */}
        <nav className="hidden md:flex justify-center items-center gap-6">
          <Link href="/products" className="text-sm font-medium hover:text-accent transition-colors">
            Products
          </Link>
          <Link href="/services" className="text-sm font-medium hover:text-accent transition-colors">
            Services
          </Link>
          <Link href="/about" className="text-sm font-medium hover:text-accent transition-colors">
            About
          </Link>
          <Link href="/contact" className="text-sm font-medium hover:text-accent transition-colors">
            Contact
          </Link>
        </nav>

        {/* RIGHT - ACTIONS */}
        <div className="flex items-center justify-end gap-4">
          <Button variant="ghost" size="icon" className="hidden md:flex">
            <Search className="h-5 w-5" />
            <span className="sr-only">Search</span>
          </Button>

          <Link href="/cart">
            <Button variant="ghost" size="icon">
               <ShoppingCart />
            {items > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                {items}
              </span>
            )}
            </Button>
          </Link>

          {session ? (
            <UserMenu user={session} />
          ) : (
            <Button variant="default" size="sm" asChild>
              <Link href="/login">Sign In</Link>
            </Button>
          )}

          <Button variant="ghost" size="icon" className="md:hidden">
            <Menu className="h-5 w-5" />
            <span className="sr-only">Menu</span>
          </Button>
        </div>
      </div>
    </header>
  )
}
