"use client"

import { useState } from "react"
import Link from "next/link"
import { ShoppingCart, Menu, X, Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { UserMenu } from "../user-menu"
import { useCart } from "../card-context"
import Image from "next/image"

export function HeaderClient({ session }: { session: any }) {
  const [menuOpen, setMenuOpen] = useState(false)
  const { itemCount } = useCart()

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">

        {/* LEFT — LOGO */}
        <Link href="/" className="flex items-center gap-2">
          <Image
            src="/logo.jpg"
            alt="CAR1PRO Logo"
            width={36}
            height={36}
          />
          <span className="hidden sm:inline text-lg font-bold">
            CAR1PRO
          </span>
        </Link>

        {/* DESKTOP NAV */}
        <nav className="hidden md:flex items-center gap-6">
          <Link className=" hover:text-accent transition-colors" href="/products">Products</Link>
          <Link className=" hover:text-accent transition-colors" href="/services">Services</Link>
          <Link className=" hover:text-accent transition-colors" href="/about">About</Link>
          <Link className=" hover:text-accent transition-colors" href="/contact">Contact</Link>
        </nav>

        {/* RIGHT — ACTIONS */}
        <div className="flex items-center gap-3">

          {/* Cart */}
          <Link href="/cart" className="relative">
            <ShoppingCart className="h-5 w-5  hover:text-accent transition-colors hover:scale-110" />

{itemCount > 0 && (
  <span className="absolute -top-1 -right-2 h-5 w-5 rounded-full bg-red-500 text-xs text-white flex items-center justify-center">
    {itemCount}
  </span>
)}

          </Link>

          {/* Desktop User */}
          <div className="hidden md:block ">
            {session ? <UserMenu user={session} /> : <Link href="/login">Sign In</Link>}
          </div>

          {/* MOBILE MENU BUTTON */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <X /> : <Menu />}
          </Button>
        </div>
      </div>

      {/* MOBILE MENU*/}
      {menuOpen && (
        <nav className="md:hidden border-t bg-background px-6 py-4 flex flex-col gap-4 text-base">
          <Link className=" hover:text-accent transition-colors" href="/products" onClick={() => setMenuOpen(false)}>Products</Link>
          <Link className=" hover:text-accent transition-colors" href="/services" onClick={() => setMenuOpen(false)}>Services</Link>
          <Link className=" hover:text-accent transition-colors" href="/about" onClick={() => setMenuOpen(false)}>About</Link>
          <Link className=" hover:text-accent transition-colors" href="/contact" onClick={() => setMenuOpen(false)}>Contact</Link>

          <hr />

          {session ? (
            <UserMenu user={session} />
          ) : (
            <Link href="/login" onClick={() => setMenuOpen(false)}>
              Sign In
            </Link>
          )}
        </nav>
      )}
    </header>
  )
}