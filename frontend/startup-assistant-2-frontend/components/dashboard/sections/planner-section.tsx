"use client"

import {
  FileText,
  Route,
  Flag,
  ListTodo,
  Megaphone,
  ShieldAlert,
  Target,
  Expand,
  CheckCircle2,
  Check,
  Loader2,
  Circle,
} from "lucide-react"
import {
  ExpandableCard,
  MetricCard,
  Badge,
  BulletList,
  severityColor,
} from "@/components/dashboard/primitives"
import { executionPlanner as d } from "@/lib/blueprint-data"

const ACCENT = "var(--destructive)"

const SUMMARIES = [
  { label: "Executive", text: d.executiveSummary, color: "var(--primary)" },
  { label: "Business", text: d.businessSummary, color: "var(--primary)" },
  { label: "Product", text: d.productSummary, color: "var(--secondary)" },
  { label: "Technical", text: d.technicalSummary, color: "var(--accent)" },
  { label: "Financial", text: d.financialSummary, color: "var(--warning)" },
]

function priorityColor(p: string) {
  if (p === "P0") return "var(--destructive)"
  if (p === "P1") return "var(--warning)"
  return "var(--secondary)"
}

export function PlannerSection() {
  return (
    <div className="space-y-3">
      <ExpandableCard title="Summaries" icon={FileText} accent={ACCENT} defaultOpen>
        <div className="space-y-3">
          {SUMMARIES.map((s) => (
            <div key={s.label} className="flex gap-3">
              <span
                className="mt-0.5 w-20 shrink-0 text-xs font-semibold uppercase tracking-wider"
                style={{ color: s.color }}
              >
                {s.label}
              </span>
              <p className="text-sm text-foreground/85">{s.text}</p>
            </div>
          ))}
        </div>
      </ExpandableCard>

      <ExpandableCard title="Execution Roadmap" icon={Route} accent={ACCENT} defaultOpen>
        <div className="relative pl-6">
          <div className="absolute left-[7px] top-1 bottom-1 w-px bg-border" />
          <div className="space-y-5">
            {d.roadmap.map((r) => {
              const done = r.status === "done"
              const active = r.status === "active"
              return (
                <div key={r.quarter} className="relative">
                  <span
                    className="absolute -left-6 top-0.5 flex h-4 w-4 items-center justify-center rounded-full"
                    style={{
                      background: done
                        ? "var(--success)"
                        : active
                          ? "var(--destructive)"
                          : "var(--muted)",
                      color: "#fff",
                      boxShadow: active ? "0 0 12px -1px var(--destructive)" : "none",
                    }}
                  >
                    {done ? (
                      <Check className="h-2.5 w-2.5" strokeWidth={3.5} />
                    ) : active ? (
                      <Loader2 className="h-2.5 w-2.5 animate-spin" />
                    ) : (
                      <Circle className="h-2 w-2" />
                    )}
                  </span>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-semibold text-foreground">{r.quarter}</span>
                    <span className="text-sm text-foreground/85">· {r.title}</span>
                    {active && <Badge color="var(--destructive)">In progress</Badge>}
                    {done && <Badge color="var(--success)">Done</Badge>}
                  </div>
                  <p className="mt-0.5 text-xs text-muted-foreground">{r.desc}</p>
                </div>
              )
            })}
          </div>
        </div>
      </ExpandableCard>

      <ExpandableCard title="Milestones" icon={Flag} accent={ACCENT}>
        <div className="grid gap-3 sm:grid-cols-2">
          {d.milestones.map((m) => (
            <div
              key={m.title}
              className="flex items-center gap-3 rounded-xl border border-border bg-background/40 p-3.5"
            >
              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-destructive/15 text-destructive">
                <Flag className="h-4 w-4" />
              </span>
              <div>
                <p className="text-sm font-medium text-foreground">{m.title}</p>
                <p className="text-xs text-muted-foreground">{m.target}</p>
              </div>
            </div>
          ))}
        </div>
      </ExpandableCard>

      <ExpandableCard title="Priority Tasks" icon={ListTodo} accent={ACCENT} defaultOpen>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-border text-xs uppercase tracking-wider text-muted-foreground">
                <th className="pb-2.5 pr-3 font-medium">Priority</th>
                <th className="pb-2.5 pr-4 font-medium">Task</th>
                <th className="pb-2.5 font-medium">Owner</th>
              </tr>
            </thead>
            <tbody>
              {d.priorityTasks.map((t) => (
                <tr key={t.task} className="border-b border-border/60 last:border-0">
                  <td className="py-3 pr-3">
                    <Badge color={priorityColor(t.priority)}>{t.priority}</Badge>
                  </td>
                  <td className="py-3 pr-4 text-foreground/85">{t.task}</td>
                  <td className="py-3 text-xs text-muted-foreground">{t.owner}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </ExpandableCard>

      <ExpandableCard title="Go-To-Market Strategy" icon={Megaphone} accent={ACCENT}>
        <BulletList items={d.goToMarket} accent={ACCENT} />
      </ExpandableCard>

      <ExpandableCard title="Risk Analysis" icon={ShieldAlert} accent={ACCENT}>
        <div className="space-y-3">
          {d.riskAnalysis.map((r) => (
            <div
              key={r.risk}
              className="flex flex-col gap-2 rounded-xl border border-border bg-background/40 p-3.5 sm:flex-row sm:items-center sm:justify-between"
            >
              <div>
                <p className="text-sm font-medium text-foreground">{r.risk}</p>
                <p className="text-xs text-muted-foreground">{r.mitigation}</p>
              </div>
              <Badge color={severityColor(r.severity)}>{r.severity}</Badge>
            </div>
          ))}
        </div>
      </ExpandableCard>

      <ExpandableCard title="Success Metrics" icon={Target} accent={ACCENT} defaultOpen>
        <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
          {d.successMetrics.map((m) => (
            <MetricCard key={m.label} label={m.label} value={m.value} accent={ACCENT} />
          ))}
        </div>
      </ExpandableCard>

      <ExpandableCard title="Scaling Strategy" icon={Expand} accent={ACCENT}>
        <BulletList items={d.scalingStrategy} accent={ACCENT} />
      </ExpandableCard>

      <ExpandableCard title="Final Recommendations" icon={CheckCircle2} accent={ACCENT} defaultOpen>
        <BulletList items={d.finalRecommendations} accent="var(--success)" />
      </ExpandableCard>
    </div>
  )
}
