"use client"

import {
  FileText,
  Search,
  Users,
  Swords,
  Building,
  Grid2x2,
  CheckCircle2,
  ShieldAlert,
  Lightbulb,
} from "lucide-react"
import {
  ExpandableCard,
  MetricCard,
  Badge,
  BulletList,
  SubHeading,
  severityColor,
} from "@/components/dashboard/primitives"
import { businessResearch as d } from "@/lib/blueprint-data"

const ACCENT = "var(--primary)"

export function BusinessSection() {
  return (
    <div className="space-y-3">
      <ExpandableCard title="Executive Summary" icon={FileText} accent={ACCENT} defaultOpen>
        <p className="text-foreground/85">{d.executiveSummary}</p>
      </ExpandableCard>

      <ExpandableCard title="Market Research" icon={Search} accent={ACCENT} defaultOpen>
        <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
          {d.marketResearch.map((m) => (
            <MetricCard key={m.label} label={m.label} value={m.value} note={m.note} accent={ACCENT} />
          ))}
        </div>
      </ExpandableCard>

      <ExpandableCard title="Target Customers" icon={Users} accent={ACCENT}>
        <div className="space-y-4">
          {d.targetCustomers.map((c) => (
            <div key={c.name}>
              <div className="mb-1.5 flex items-center justify-between gap-3">
                <span className="text-sm font-medium text-foreground">{c.name}</span>
                <span className="font-mono text-xs text-muted-foreground">{c.share}%</span>
              </div>
              <div className="h-1.5 w-full overflow-hidden rounded-full bg-muted">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-primary to-secondary"
                  style={{ width: `${c.share}%` }}
                />
              </div>
              <p className="mt-1.5 text-xs text-muted-foreground">{c.desc}</p>
            </div>
          ))}
        </div>
      </ExpandableCard>

      <ExpandableCard title="Competitor Analysis" icon={Swords} accent={ACCENT}>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-border text-xs uppercase tracking-wider text-muted-foreground">
                <th className="pb-2.5 pr-4 font-medium">Competitor</th>
                <th className="pb-2.5 pr-4 font-medium">Strength</th>
                <th className="pb-2.5 pr-4 font-medium">Weakness</th>
                <th className="pb-2.5 font-medium">Threat</th>
              </tr>
            </thead>
            <tbody>
              {d.competitors.map((c) => (
                <tr key={c.name} className="border-b border-border/60 last:border-0">
                  <td className="py-3 pr-4 font-medium text-foreground">{c.name}</td>
                  <td className="py-3 pr-4 text-foreground/80">{c.strength}</td>
                  <td className="py-3 pr-4 text-foreground/80">{c.weakness}</td>
                  <td className="py-3">
                    <Badge color={severityColor(c.threat)}>{c.threat}</Badge>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </ExpandableCard>

      <ExpandableCard title="Business Model" icon={Building} accent={ACCENT}>
        <p className="text-foreground/85">{d.businessModel}</p>
      </ExpandableCard>

      <ExpandableCard title="SWOT Analysis" icon={Grid2x2} accent={ACCENT}>
        <div className="grid gap-3 sm:grid-cols-2">
          <SwotBox title="Strengths" items={d.swot.strengths} color="var(--success)" />
          <SwotBox title="Weaknesses" items={d.swot.weaknesses} color="var(--destructive)" />
          <SwotBox title="Opportunities" items={d.swot.opportunities} color="var(--secondary)" />
          <SwotBox title="Threats" items={d.swot.threats} color="var(--warning)" />
        </div>
      </ExpandableCard>

      <ExpandableCard title="Validation" icon={CheckCircle2} accent={ACCENT}>
        <BulletList items={d.validation} accent="var(--success)" />
      </ExpandableCard>

      <ExpandableCard title="Risks" icon={ShieldAlert} accent={ACCENT}>
        <div className="space-y-3">
          {d.risks.map((r) => (
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

      <ExpandableCard title="Recommendations" icon={Lightbulb} accent={ACCENT}>
        <BulletList items={d.recommendations} accent={ACCENT} />
      </ExpandableCard>
    </div>
  )
}

function SwotBox({ title, items, color }: { title: string; items: string[]; color: string }) {
  return (
    <div className="rounded-xl border border-border bg-background/40 p-4">
      <div className="mb-2.5 flex items-center gap-2">
        <span className="h-2 w-2 rounded-full" style={{ background: color }} />
        <SubHeading>{title}</SubHeading>
      </div>
      <BulletList items={items} accent={color} />
    </div>
  )
}
