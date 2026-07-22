"use client"

import { Sparkles, X } from "lucide-react"
import { AGENTS, type AgentId } from "@/lib/blueprint-data"
import { cn } from "@/lib/utils"

interface SidebarProps {
  active: AgentId
  onSelect: (id: AgentId) => void
  open: boolean
  onClose: () => void
}

export function Sidebar({ active, onSelect, open, onClose }: SidebarProps) {
  return (
    <>
      {/* mobile overlay */}
      {open && (
        <div
          className="fixed inset-0 z-30 bg-background/70 backdrop-blur-sm lg:hidden"
          onClick={onClose}
          aria-hidden="true"
        />
      )}

      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-40 flex w-72 flex-col border-r border-border glass px-4 py-5 transition-transform duration-300 lg:sticky lg:top-0 lg:z-10 lg:h-dvh lg:translate-x-0",
          open ? "translate-x-0" : "-translate-x-full",
        )}
      >
        <div className="flex items-center justify-between">
          <a href="#" className="flex items-center gap-2.5">
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-secondary text-primary-foreground shadow-lg shadow-primary/30">
              <Sparkles className="h-4 w-4" />
            </span>
            <span className="text-sm font-semibold tracking-tight">AI Startup Assistant</span>
          </a>
          <button
            onClick={onClose}
            className="flex h-8 w-8 items-center justify-center rounded-lg text-muted-foreground hover:bg-foreground/5 lg:hidden"
            aria-label="Close sidebar"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <div className="mt-8 mb-3 px-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          AI Agents
        </div>

        <nav className="flex flex-1 flex-col gap-1.5">
          {AGENTS.map((agent) => {
            const isActive = agent.id === active
            const Icon = agent.icon
            return (
              <button
                key={agent.id}
                onClick={() => {
                  onSelect(agent.id)
                  onClose()
                }}
                className={cn(
                  "group flex items-center gap-3 rounded-xl border px-3 py-2.5 text-left transition-all",
                  isActive
                    ? "border-transparent glass gradient-border shadow-lg shadow-primary/10"
                    : "border-transparent hover:bg-foreground/5",
                )}
              >
                <span
                  className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg transition-transform group-hover:scale-105"
                  style={{
                    background: isActive
                      ? `color-mix(in oklab, ${agent.accent} 22%, transparent)`
                      : "color-mix(in oklab, var(--foreground) 6%, transparent)",
                    color: isActive ? agent.accent : "var(--muted-foreground)",
                    boxShadow: isActive ? `0 0 18px -4px ${agent.accent}` : "none",
                  }}
                >
                  <Icon className="h-4 w-4" />
                </span>
                <span className="min-w-0 flex-1">
                  <span
                    className={cn(
                      "block truncate text-sm font-medium",
                      isActive ? "text-foreground" : "text-foreground/80",
                    )}
                  >
                    {agent.name}
                  </span>
                  <span className="block truncate text-xs text-muted-foreground">
                    {agent.tagline}
                  </span>
                </span>
              </button>
            )
          })}
        </nav>

        <div className="mt-4 rounded-xl border border-border bg-surface/50 p-3.5">
          <p className="text-xs font-medium text-foreground">Blueprint ready</p>
          <p className="mt-0.5 text-xs text-muted-foreground">
            All five agents completed their analysis.
          </p>
        </div>
      </aside>
    </>
  )
}
