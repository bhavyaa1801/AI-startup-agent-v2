"use client"

import { Moon, Sun, Sparkles } from "lucide-react"
import { useTheme } from "@/components/theme-provider"


const NAV_LINKS = [
  { label: "Home", href: "#home" },
  { label: "Features", href: "#features" },
  { label: "Agents", href: "#agents" },
  { label: "About", href: "#about" },
]

export function Navbar() {
  const { theme, toggle } = useTheme()

  return (
    <header className="sticky top-0 z-50 w-full">
      <div className="mx-auto mt-4 flex max-w-6xl items-center justify-between gap-4 rounded-2xl glass gradient-border px-4 py-3 md:px-6">
        {/* Left: logo */}
        <a href="#home" className="flex items-center gap-2.5">
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-secondary text-primary-foreground shadow-lg shadow-primary/30">
            <Sparkles className="h-4.5 w-4.5" strokeWidth={2.2} />
          </span>
          <span className="text-sm font-semibold tracking-tight md:text-base">
            AI Startup Assistant
          </span>
        </a>

        {/* Center: links */}
        <nav className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-1 md:flex">
          {NAV_LINKS.map((l) => (
            <a
              key={l.label}
              href={l.href}
              className="rounded-lg px-3 py-1.5 text-sm text-muted-foreground transition-colors hover:bg-foreground/5 hover:text-foreground"
            >
              {l.label}
            </a>
          ))}
        </nav>

        
      </div>
    </header>
  )
}
