"use client"

import { useState } from "react"
import {
  Menu,
  Moon,
  Sun,
  RotateCcw,
  Sparkles,
  Download,
  LoaderCircle,
} from "lucide-react"

import { Sidebar } from "@/components/dashboard/sidebar"
import { BusinessSection } from "@/components/dashboard/sections/business-section"
import { ProductSection } from "@/components/dashboard/sections/product-section"
import { TechnicalSection } from "@/components/dashboard/sections/technical-section"
import { FinanceSection } from "@/components/dashboard/sections/finance-section"
import { PlannerSection } from "@/components/dashboard/sections/planner-section"
import { MetricCard } from "@/components/dashboard/primitives"
import { useTheme } from "@/components/theme-provider"
import { AGENTS, type AgentId } from "@/lib/blueprint-data"
import { exportBlueprintPdf } from "@/lib/export-blueprint-pdf"

interface DashboardProps {
  blueprint: any
  onReset: () => void
}

export function Dashboard({
  blueprint,
  onReset,
}: DashboardProps) {
  const [active, setActive] =
    useState<AgentId>("business")

  const [sidebarOpen, setSidebarOpen] =
    useState(false)

  const [exporting, setExporting] =
    useState(false)

  const { theme, toggle } = useTheme()

  const agent = AGENTS.find(
    (item) => item.id === active,
  )!

  async function handleExport() {
    if (!blueprint || exporting) {
      return
    }

    try {
      setExporting(true)

      await exportBlueprintPdf(blueprint)
    } catch (error) {
      console.error(
        "PDF export failed:",
        error,
      )

      alert(
        "The PDF could not be generated. Please try again.",
      )
    } finally {
      setExporting(false)
    }
  }

  if (!blueprint) {
    return null
  }

  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar
        active={active}
        onSelect={setActive}
        open={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      <div className="flex min-w-0 flex-1 flex-col">
        <header className="sticky top-0 z-20 flex items-center justify-between border-b border-border bg-background/90 px-6 py-3 backdrop-blur">
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden"
              aria-label="Open navigation"
            >
              <Menu className="h-5 w-5" />
            </button>

            <span
              className="flex h-9 w-9 items-center justify-center rounded-lg"
              style={{
                background: `color-mix(in oklab, ${agent.accent} 18%, transparent)`,
                color: agent.accent,
              }}
            >
              <agent.icon className="h-4 w-4" />
            </span>

            <div>
              <h2 className="font-semibold">
                {agent.name}
              </h2>

              <p className="text-xs text-muted-foreground">
                {agent.tagline}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleExport}
              disabled={exporting}
              className="hidden items-center gap-2 rounded-lg border px-3 py-2 text-sm hover:bg-muted disabled:cursor-not-allowed disabled:opacity-60 sm:flex"
            >
              {exporting ? (
                <LoaderCircle className="h-4 w-4 animate-spin" />
              ) : (
                <Download className="h-4 w-4" />
              )}

              {exporting
                ? "Exporting..."
                : "Export PDF"}
            </button>

            <button
              type="button"
              onClick={onReset}
              className="flex items-center gap-2 rounded-lg border px-3 py-2 text-sm hover:bg-muted"
            >
              <RotateCcw className="h-4 w-4" />
              New
            </button>

            <button
              type="button"
              onClick={toggle}
              className="rounded-lg p-2 hover:bg-muted"
              aria-label="Change theme"
            >
              {theme === "dark" ? (
                <Sun className="h-5 w-5" />
              ) : (
                <Moon className="h-5 w-5" />
              )}
            </button>
          </div>
        </header>

        <main className="mx-auto w-full max-w-7xl flex-1 px-6 py-8">
          <section className="mb-8 rounded-3xl border border-border bg-card p-8">
            <div className="inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs text-muted-foreground">
              <Sparkles className="h-3 w-3" />
              Blueprint Generated
            </div>

            <h1 className="mt-4 text-4xl font-bold">
              {blueprint.business?.input_summary?.idea ??
                "Startup Blueprint"}
            </h1>

            <p className="mt-3 max-w-3xl text-muted-foreground">
              {blueprint.business?.executive_summary ??
                "AI startup blueprint generated successfully."}
            </p>

            <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              <MetricCard
                label="Industry"
                value={
                  blueprint.business?.input_summary
                    ?.industry_provided ?? "-"
                }
              />

              <MetricCard
                label="Region"
                value={
                  blueprint.business?.input_summary
                    ?.target_region ?? "-"
                }
              />

              <MetricCard
                label="Validation"
                value={`${
                  blueprint.business?.validation
                    ?.input_completeness_score ?? 0
                }/100`}
              />
            </div>
          </section>

          <div key={active}>
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