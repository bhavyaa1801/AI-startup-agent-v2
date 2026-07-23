"use client"

import { ArrowRight, Play, Sparkles } from "lucide-react"
import { Navbar } from "@/components/navbar"
import { AuroraBackground } from "@/components/aurora-background"
import { InputCard } from "@/components/input-card"
import { AGENTS } from "@/lib/blueprint-data"
import Footer from "./footer";
interface LandingPageProps {
  onGenerate: (data: any) => void
}

export function LandingPage({ onGenerate }: LandingPageProps) {
  return (
    <div id="home" className="relative min-h-dvh overflow-hidden">
      <AuroraBackground particles={30} />

      <div className="relative z-10 px-4">
        <Navbar />

        {/* Hero */}
        <section className="mx-auto max-w-4xl pt-20 pb-10 text-center md:pt-28">
          <div className="mx-auto mb-6 inline-flex items-center gap-2 rounded-full border border-border glass px-3.5 py-1.5 text-xs text-muted-foreground">
            <span className="flex h-1.5 w-1.5 rounded-full bg-accent shadow-[0_0_8px_var(--accent)]" />
            Powered by five collaborating AI agents
          </div>

          <h1 className="text-balance text-4xl font-bold leading-[1.05] tracking-tight sm:text-6xl md:text-7xl">
            Build Your Startup
            <br />
            with <span className="gradient-text">AI Agents</span>
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-pretty text-base leading-relaxed text-muted-foreground md:text-lg">
            Generate a complete investor-ready startup blueprint using five specialized AI agents
            that collaborate together.
          </p>

          <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <button
              onClick={onGenerate}
              className="group relative flex w-full items-center justify-center gap-2 overflow-hidden rounded-xl bg-gradient-to-r from-primary to-secondary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/30 transition-all hover:brightness-110 hover:shadow-xl hover:shadow-primary/40 active:scale-[0.99] sm:w-auto"
            >
              <Sparkles className="h-4 w-4" />
              Generate Blueprint
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </button>
            <a
              href="#input"
              className="flex w-full items-center justify-center gap-2 rounded-xl border border-border glass px-6 py-3 text-sm font-semibold text-foreground transition-colors hover:bg-foreground/5 sm:w-auto"
            >
              <Play className="h-3.5 w-3.5" />
              See Example
            </a>
          </div>

          {/* agent chips */}
          <div id="agents" className="mt-14 flex flex-wrap items-center justify-center gap-2.5">
            {AGENTS.map((a) => (
              <div
                key={a.id}
                className="flex items-center gap-2 rounded-full border border-border glass px-3.5 py-1.5 text-xs text-muted-foreground"
              >
                <a.icon className="h-3.5 w-3.5" style={{ color: a.accent }} />
                {a.name}
              </div>
            ))}
          </div>
        </section>

                {/* Input card */}
        <section
          id="input"
          className="mx-auto flex max-w-4xl scroll-mt-24 justify-center pb-24 pt-6"
        >
          <InputCard onGenerate={onGenerate} />
        </section>

        <Footer />
      </div>
    </div>
  )
}
