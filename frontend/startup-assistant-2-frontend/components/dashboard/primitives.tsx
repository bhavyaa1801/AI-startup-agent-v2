"use client"

import { useState } from "react"
import { ChevronDown } from "lucide-react"
import type { LucideIcon } from "lucide-react"
import { cn } from "@/lib/utils"

/* ---------- Expandable / Accordion card ---------- */
export function ExpandableCard({
  title,
  icon: Icon,
  accent = "var(--primary)",
  defaultOpen = false,
  badge,
  children,
}: {
  title: string
  icon?: LucideIcon
  accent?: string
  defaultOpen?: boolean
  badge?: React.ReactNode
  children: React.ReactNode
}) {
  const [open, setOpen] = useState(defaultOpen)

  return (
    <div
      className={cn(
        "group overflow-hidden rounded-2xl border border-border bg-surface/60 transition-all duration-300",
        "hover:-translate-y-0.5 hover:border-foreground/15 hover:shadow-xl hover:shadow-black/20",
        open && "gradient-border",
      )}
    >
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="flex w-full items-center gap-3 px-5 py-4 text-left"
        aria-expanded={open}
      >
        {Icon && (
          <span
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl transition-transform group-hover:scale-105"
            style={{
              background: `color-mix(in oklab, ${accent} 16%, transparent)`,
              color: accent,
            }}
          >
            <Icon className="h-4 w-4" />
          </span>
        )}
        <span className="flex-1 text-sm font-semibold md:text-[15px]">{title}</span>
        {badge}
        <ChevronDown
          className={cn(
            "h-4 w-4 shrink-0 text-muted-foreground transition-transform duration-300",
            open && "rotate-180",
          )}
        />
      </button>

      <div
        className={cn(
          "grid transition-all duration-300 ease-out",
          open ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0",
        )}
      >
        <div className="overflow-hidden">
          <div className="border-t border-border px-5 py-5 text-sm leading-relaxed text-muted-foreground">
            {children}
          </div>
        </div>
      </div>
    </div>
  )
}

/* ---------- Metric card ---------- */
export function MetricCard({
  label,
  value,
  note,
  icon: Icon,
  accent = "var(--primary)",
}: {
  label: string
  value: string
  note?: string
  icon?: LucideIcon
  accent?: string
}) {
  return (
    <div className="rounded-2xl border border-border bg-surface/60 p-4 transition-all hover:-translate-y-0.5 hover:border-foreground/15 hover:shadow-lg hover:shadow-black/20">
      <div className="flex items-center justify-between">
        <span className="text-xs text-muted-foreground">{label}</span>
        {Icon && (
          <span
            className="flex h-7 w-7 items-center justify-center rounded-lg"
            style={{ background: `color-mix(in oklab, ${accent} 16%, transparent)`, color: accent }}
          >
            <Icon className="h-3.5 w-3.5" />
          </span>
        )}
      </div>
      <p className="mt-2 text-2xl font-semibold tracking-tight text-foreground">{value}</p>
      {note && <p className="mt-0.5 text-xs text-muted-foreground/80">{note}</p>}
    </div>
  )
}

/* ---------- Badge ---------- */
export function Badge({
  children,
  color = "var(--primary)",
  tone = "soft",
}: {
  children: React.ReactNode
  color?: string
  tone?: "soft" | "solid"
}) {
  return (
    <span
      className="inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-medium"
      style={
        tone === "solid"
          ? { background: color, color: "#fff" }
          : {
              background: `color-mix(in oklab, ${color} 16%, transparent)`,
              color,
              border: `1px solid color-mix(in oklab, ${color} 30%, transparent)`,
            }
      }
    >
      {children}
    </span>
  )
}

export function severityColor(sev: string) {
  const s = sev.toLowerCase()
  if (s === "high") return "var(--destructive)"
  if (s === "medium") return "var(--warning)"
  return "var(--success)"
}

/* ---------- Bulleted list ---------- */
export function BulletList({ items, accent = "var(--primary)" }: { items: string[]; accent?: string }) {
  return (
    <ul className="space-y-2.5">
      {items.map((item, i) => (
        <li key={i} className="flex gap-2.5">
          <span
            className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full"
            style={{ background: accent }}
          />
          <span className="text-foreground/85">{item}</span>
        </li>
      ))}
    </ul>
  )
}

/* ---------- Section heading ---------- */
export function SubHeading({ children }: { children: React.ReactNode }) {
  return (
    <h4 className="mb-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
      {children}
    </h4>
  )
}
