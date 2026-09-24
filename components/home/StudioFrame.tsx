"use client"

import type { ReactNode } from "react"

export function StudioFrame({ room, children }: { room: string; children: ReactNode }) {
  return <section aria-label={`CAR1PRO ${room}`} className="relative min-h-[min(78vh,680px)] overflow-hidden bg-background text-foreground"><div className="absolute inset-0 bg-[radial-gradient(circle_at_top,var(--muted),transparent_60%)]" /><div className="relative h-[min(78vh,680px)] min-h-[560px]">{children}</div></section>
}
