"use client"

import Link from "next/link"
import { motion } from "motion/react"
import type { ReactNode } from "react"

const doors = [{ href: "/", label: "Lobby" }, { href: "/products", label: "Browse" }, { href: "/about", label: "About" }, { href: "/services", label: "Services" }, { href: "/contact", label: "Contact" }]

export function StudioFrame({ room, children }: { room: string; children: ReactNode }) {
  return <div className="relative h-[min(78vh,680px)] min-h-[560px] w-full overflow-hidden bg-primary text-primary-foreground">{children}<header className="pointer-events-none absolute inset-x-0 top-0 z-30 flex flex-wrap items-center gap-x-4 gap-y-2 px-4 py-3 sm:px-6"><Link href="/" className="pointer-events-auto text-lg font-bold tracking-[.2em] text-accent">CAR1PRO</Link><nav className="pointer-events-auto flex flex-wrap gap-3 text-xs text-primary-foreground/80">{doors.map((door) => <Link key={door.href} href={door.href} className="hover:text-accent">{door.label}</Link>)}</nav></header><motion.p key={room} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="pointer-events-none absolute bottom-3 left-4 z-30 text-xs text-accent/80 sm:left-6">You are in · {room}</motion.p></div>
}
