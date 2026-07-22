"use client"

import { useEffect, useMemo, useState } from "react"

interface AuroraBackgroundProps {
  /** density of floating particles */
  particles?: number
  className?: string
}

export function AuroraBackground({ particles = 26, className = "" }: AuroraBackgroundProps) {
  // Only render randomized particles after mount to avoid SSR/client hydration mismatch.
  const [mounted, setMounted] = useState(false)
  useEffect(() => setMounted(true), [])

  const dots = useMemo(
    () =>
      Array.from({ length: particles }).map((_, i) => ({
        id: i,
        left: Math.random() * 100,
        top: Math.random() * 100,
        size: Math.random() * 3 + 1,
        delay: Math.random() * 8,
        duration: Math.random() * 8 + 8,
        opacity: Math.random() * 0.4 + 0.2,
      })),
    [particles],
  )

  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}
    >
      {/* gradient blur blobs */}
      <div className="absolute -left-32 -top-32 h-[26rem] w-[26rem] rounded-full bg-primary/25 blur-[120px] animate-float-slow" />
      <div className="absolute right-[-6rem] top-24 h-[22rem] w-[22rem] rounded-full bg-secondary/20 blur-[130px] animate-float-slower" />
      <div className="absolute bottom-[-8rem] left-1/3 h-[24rem] w-[24rem] rounded-full bg-accent/15 blur-[140px] animate-float-slow" />

      {/* subtle grid */}
      <div
        className="absolute inset-0 opacity-[0.35]"
        style={{
          backgroundImage:
            "linear-gradient(to right, var(--border) 1px, transparent 1px), linear-gradient(to bottom, var(--border) 1px, transparent 1px)",
          backgroundSize: "64px 64px",
          maskImage: "radial-gradient(ellipse 80% 60% at 50% 0%, #000 40%, transparent 100%)",
          WebkitMaskImage: "radial-gradient(ellipse 80% 60% at 50% 0%, #000 40%, transparent 100%)",
        }}
      />

      {/* floating particles (client-only to prevent hydration mismatch) */}
      {mounted &&
        dots.map((d) => (
        <span
          key={d.id}
          className="absolute rounded-full bg-foreground"
          style={{
            left: `${d.left}%`,
            top: `${d.top}%`,
            width: d.size,
            height: d.size,
            opacity: d.opacity,
            animation: `particle-drift ${d.duration}s ease-in-out ${d.delay}s infinite`,
          }}
        />
      ))}
    </div>
  )
}
