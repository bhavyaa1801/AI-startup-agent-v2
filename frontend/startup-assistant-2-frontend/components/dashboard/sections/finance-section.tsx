"use client"

import {
  Wallet,
  Flame,
  Gauge,
  Users,
  PieChart,
  Banknote,
  Landmark,
  Scale,
  ShieldAlert,
  LineChart,
  TrendingUp,
} from "lucide-react"
import type { LucideIcon } from "lucide-react"
import {
  ExpandableCard,
  MetricCard,
  Badge,
  severityColor,
} from "@/components/dashboard/primitives"
import { financeGrowth as d } from "@/lib/blueprint-data"

const ACCENT = "var(--warning)"

const ICONS: Record<string, LucideIcon> = {
  wallet: Wallet,
  flame: Flame,
  gauge: Gauge,
  users: Users,
}

export function FinanceSection() {
  const maxMrr = Math.max(...d.revenueProjection.map((p) => p.mrr))

  return (
    <div className="space-y-3">
      <ExpandableCard title="Estimated Budget" icon={Wallet} accent={ACCENT} defaultOpen>
        <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
          {d.estimatedBudget.map((b) => (
            <MetricCard
              key={b.label}
              label={b.label}
              value={b.value}
              note={b.note}
              icon={ICONS[b.icon] ?? Wallet}
              accent={ACCENT}
            />
          ))}
        </div>
      </ExpandableCard>

      <ExpandableCard title="Revenue Projection" icon={LineChart} accent={ACCENT} defaultOpen>
        <div className="flex h-48 items-end justify-between gap-2 sm:gap-4">
          {d.revenueProjection.map((p) => (
            <div key={p.month} className="flex flex-1 flex-col items-center gap-2">
              <span className="font-mono text-xs text-foreground/70">${p.mrr}k</span>
              <div className="flex w-full flex-1 items-end">
                <div
                  className="w-full rounded-t-lg bg-gradient-to-t from-primary/60 to-secondary transition-all duration-500"
                  style={{ height: `${(p.mrr / maxMrr) * 100}%` }}
                />
              </div>
              <span className="text-xs text-muted-foreground">{p.month}</span>
            </div>
          ))}
        </div>
      </ExpandableCard>

      <ExpandableCard title="Operating Costs" icon={PieChart} accent={ACCENT}>
        <div className="space-y-4">
          {d.operatingCosts.map((c) => (
            <div key={c.item}>
              <div className="mb-1.5 flex items-center justify-between text-sm">
                <span className="text-foreground/85">{c.item}</span>
                <span className="font-mono text-xs text-muted-foreground">
                  {c.monthly}/mo · {c.share}%
                </span>
              </div>
              <div className="h-1.5 w-full overflow-hidden rounded-full bg-muted">
                <div
                  className="h-full rounded-full"
                  style={{ width: `${c.share}%`, background: ACCENT }}
                />
              </div>
            </div>
          ))}
        </div>
      </ExpandableCard>

      <ExpandableCard title="Revenue Model" icon={Banknote} accent={ACCENT}>
        <p className="text-foreground/85">{d.revenueModel}</p>
      </ExpandableCard>

      <ExpandableCard title="Funding Strategy" icon={Landmark} accent={ACCENT} defaultOpen>
        <div className="grid gap-3 md:grid-cols-3">
          {d.fundingStrategy.map((f) => (
            <div key={f.stage} className="rounded-xl border border-border bg-background/40 p-4">
              <div className="mb-2 flex items-center justify-between">
                <span className="text-sm font-semibold text-foreground">{f.stage}</span>
                <Badge
                  color={
                    f.status === "Active"
                      ? "var(--success)"
                      : f.status === "Planned"
                        ? "var(--secondary)"
                        : "var(--muted-foreground)"
                  }
                >
                  {f.status}
                </Badge>
              </div>
              <p className="text-2xl font-semibold tracking-tight text-foreground">{f.amount}</p>
              <p className="mt-1 text-xs text-muted-foreground">{f.use}</p>
            </div>
          ))}
        </div>
      </ExpandableCard>

      <ExpandableCard title="Break Even" icon={Scale} accent={ACCENT}>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
          <MetricCard label="Break-even point" value={d.breakEven.month} accent={ACCENT} icon={Scale} />
          <MetricCard label="Customers needed" value={d.breakEven.customers} accent={ACCENT} icon={Users} />
          <MetricCard label="Target MRR" value={d.breakEven.mrr} accent={ACCENT} icon={TrendingUp} />
        </div>
      </ExpandableCard>

      <ExpandableCard title="Financial Risks" icon={ShieldAlert} accent={ACCENT}>
        <div className="space-y-3">
          {d.financialRisks.map((r) => (
            <div
              key={r.risk}
              className="flex items-center justify-between rounded-xl border border-border bg-background/40 p-3.5"
            >
              <span className="text-sm text-foreground/85">{r.risk}</span>
              <Badge color={severityColor(r.severity)}>{r.severity}</Badge>
            </div>
          ))}
        </div>
      </ExpandableCard>

      <ExpandableCard title="Financial Metrics" icon={TrendingUp} accent={ACCENT} defaultOpen>
        <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
          {d.financialMetrics.map((m) => (
            <MetricCard key={m.label} label={m.label} value={m.value} accent={ACCENT} />
          ))}
        </div>
      </ExpandableCard>
    </div>
  )
}
