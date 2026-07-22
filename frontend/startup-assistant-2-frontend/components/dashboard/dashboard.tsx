"use client"

import { useState } from "react"
import { Menu, Moon, Sun, RotateCcw, Sparkles, Download } from "lucide-react"
import { GithubIcon } from "@/components/icons"
import { Sidebar } from "@/components/dashboard/sidebar"
import { BusinessSection } from "@/components/dashboard/sections/business-section"
import { ProductSection } from "@/components/dashboard/sections/product-section"
import { TechnicalSection } from "@/components/dashboard/sections/technical-section"
import { FinanceSection } from "@/components/dashboard/sections/finance-section"
import { PlannerSection } from "@/components/dashboard/sections/planner-section"
import { useTheme } from "@/components/theme-provider"
import { AGENTS, type AgentId } from "@/lib/blueprint-data"

interface DashboardProps {
  blueprint: any
  onReset: () => void
}

const HERO_STATS = [
  { label: "Market size", value: "$8.2B" },
  { label: "Break-even", value: "Mo 19" },
  { label: "Funding ask", value: "$500K" },
  { label: "MRR @ M18", value: "$79K" },
]

export function Dashboard({ blueprint, onReset, }: DashboardProps) {
  const [active, setActive] = useState<AgentId>("business")
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const { theme, toggle } = useTheme()

  const agent = AGENTS.find((a) => a.id === active)!
  if (!blueprint) {
    return null
  }

  return (
    <div className="flex min-h-dvh">
      <Sidebar
        active={active}
        onSelect={setActive}
        open={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      <div className="flex min-w-0 flex-1 flex-col">
        {/* Topbar */}
        <header className="sticky top-0 z-20 flex items-center justify-between gap-3 border-b border-border glass px-4 py-3 md:px-6">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setSidebarOpen(true)}
              className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground hover:bg-foreground/5 lg:hidden"
              aria-label="Open sidebar"
            >
              <Menu className="h-5 w-5" />
            </button>
            <div className="flex items-center gap-2.5">
              <span
                className="flex h-8 w-8 items-center justify-center rounded-lg"
                style={{
                  background: `color-mix(in oklab, ${agent.accent} 18%, transparent)`,
                  color: agent.accent,
                }}
              >
                <agent.icon className="h-4 w-4" />
              </span>
              <div>
                <p className="text-sm font-semibold leading-tight">{agent.name}</p>
                <p className="hidden text-xs text-muted-foreground sm:block">{agent.tagline}</p>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-1.5">
            <button className="hidden items-center gap-2 rounded-lg border border-border px-3 py-2 text-xs font-medium text-foreground transition-colors hover:bg-foreground/5 sm:flex">
              <Download className="h-3.5 w-3.5" />
              Export
            </button>
            <button
              onClick={onReset}
              className="flex h-9 items-center gap-2 rounded-lg border border-border px-3 text-xs font-medium text-foreground transition-colors hover:bg-foreground/5"
            >
              <RotateCcw className="h-3.5 w-3.5" />
              <span className="hidden sm:inline">New</span>
            </button>
            <a
              href="https://github.com"
              target="_blank"
              rel="noreferrer noopener"
              className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground hover:bg-foreground/5"
              aria-label="GitHub"
            >
              <GithubIcon className="h-[18px] w-[18px]" />
            </a>
            <button
              onClick={toggle}
              className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground hover:bg-foreground/5"
              aria-label="Toggle theme"
            >
              {theme === "dark" ? <Sun className="h-[18px] w-[18px]" /> : <Moon className="h-[18px] w-[18px]" />}
            </button>
          </div>
        </header>

        {/* Main content */}
        <main className="mx-auto w-full max-w-4xl flex-1 px-4 py-6 md:px-6 md:py-8">
          {/* Summary hero */}
          <section className="relative mb-6 overflow-hidden rounded-3xl gradient-border glass p-6 md:p-8">
            <div className="absolute -right-16 -top-16 h-48 w-48 rounded-full bg-primary/20 blur-3xl" />
            <div className="relative">
              <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-border bg-background/40 px-3 py-1 text-xs text-muted-foreground">
                <Sparkles className="h-3 w-3 text-accent" />
                Blueprint generated
              </div>
              <h1 className="text-balance text-2xl font-bold tracking-tight md:text-3xl">
                {blueprint.business?.input_summary?.idea ??
                  "Your Startup Blueprint"}
              </h1>
              <p className="mt-2 max-w-2xl text-pretty text-sm text-muted-foreground">
                {blueprint.business?.executive_summary ??
                  "Your startup blueprint has been generated successfully."}
              </p>

              <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
                {HERO_STATS.map((s) => (
                  <div key={s.label} className="rounded-2xl border border-border bg-background/40 p-3.5">
                    <p className="text-xs text-muted-foreground">{s.label}</p>
                    <p className="mt-1 text-xl font-semibold tracking-tight">{s.value}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Active agent section */}
          <div
            key={active}
            className="animate-in fade-in slide-in-from-bottom-2 duration-500"
          >
            {active === "business" && (
              <BusinessSection
                data={blueprint.business}
              />
            )}

            {active === "product" && (
              <ProductSection
                data={blueprint.product}
              />
            )}

            {active === "technical" && (
              <TechnicalSection
                data={blueprint.technical}
              />
            )}

            {active === "finance" && (
              <FinanceSection
                data={blueprint.finance}
              />
            )}

            {active === "planner" && (
              <PlannerSection
                data={blueprint.planner}
              />
            )}
          </div>
        </main>
      </div>
    </div>
  )
}
