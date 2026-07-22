"use client"

import {
  Lightbulb,
  Layers,
  Network,
  Database,
  Server,
  ShieldCheck,
  TrendingUp,
  GitBranch,
} from "lucide-react"
import { ExpandableCard, Badge, BulletList } from "@/components/dashboard/primitives"
import { technicalArchitecture as d } from "@/lib/blueprint-data"

const ACCENT = "var(--accent)"

const STACK_COLORS: Record<string, string> = {
  Frontend: "var(--secondary)",
  Backend: "var(--primary)",
  Database: "var(--accent)",
  AI: "var(--warning)",
  Deployment: "var(--destructive)",
}

export function TechnicalSection() {
  return (
    <div className="space-y-3">
      <ExpandableCard title="Reason" icon={Lightbulb} accent={ACCENT} defaultOpen>
        <p className="text-foreground/85">{d.reason}</p>
      </ExpandableCard>

      <ExpandableCard title="Tech Stack" icon={Layers} accent={ACCENT} defaultOpen>
        <div className="space-y-4">
          {Object.entries(d.techStack).map(([group, items]) => (
            <div key={group}>
              <div className="mb-2 flex items-center gap-2">
                <span
                  className="h-2 w-2 rounded-full"
                  style={{ background: STACK_COLORS[group] ?? ACCENT }}
                />
                <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  {group}
                </span>
              </div>
              <div className="flex flex-wrap gap-2">
                {items.map((tech) => (
                  <Badge key={tech} color={STACK_COLORS[group] ?? ACCENT}>
                    {tech}
                  </Badge>
                ))}
              </div>
            </div>
          ))}
        </div>
      </ExpandableCard>

      <ExpandableCard title="Architecture Diagram" icon={Network} accent={ACCENT}>
        <div className="space-y-2">
          {d.architectureDiagram.map((layer, i) => (
            <div key={layer.layer}>
              <div className="flex items-center gap-3 rounded-xl border border-border bg-background/40 p-3.5">
                <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-accent/15 font-mono text-xs text-accent">
                  {i + 1}
                </span>
                <div>
                  <p className="text-sm font-medium text-foreground">{layer.layer}</p>
                  <p className="text-xs text-muted-foreground">{layer.desc}</p>
                </div>
              </div>
              {i < d.architectureDiagram.length - 1 && (
                <div className="ml-[26px] h-3 w-px bg-border" />
              )}
            </div>
          ))}
        </div>
      </ExpandableCard>

      <ExpandableCard title="Database Tables" icon={Database} accent={ACCENT}>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-border text-xs uppercase tracking-wider text-muted-foreground">
                <th className="pb-2.5 pr-4 font-medium">Table</th>
                <th className="pb-2.5 font-medium">Columns</th>
              </tr>
            </thead>
            <tbody>
              {d.databaseTables.map((t) => (
                <tr key={t.name} className="border-b border-border/60 last:border-0">
                  <td className="py-3 pr-4">
                    <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-xs text-accent">
                      {t.name}
                    </code>
                  </td>
                  <td className="py-3 font-mono text-xs text-foreground/75">{t.columns}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </ExpandableCard>

      <ExpandableCard title="API Endpoints" icon={Server} accent={ACCENT} defaultOpen>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-border text-xs uppercase tracking-wider text-muted-foreground">
                <th className="pb-2.5 pr-3 font-medium">Method</th>
                <th className="pb-2.5 pr-4 font-medium">Endpoint</th>
                <th className="pb-2.5 pr-4 font-medium">Description</th>
                <th className="pb-2.5 font-medium">Auth</th>
              </tr>
            </thead>
            <tbody>
              {d.apiEndpoints.map((e) => (
                <tr key={e.path} className="border-b border-border/60 last:border-0">
                  <td className="py-3 pr-3">
                    <Badge color={methodColor(e.method)}>{e.method}</Badge>
                  </td>
                  <td className="py-3 pr-4 font-mono text-xs text-foreground/85">{e.path}</td>
                  <td className="py-3 pr-4 text-xs text-muted-foreground">{e.desc}</td>
                  <td className="py-3">
                    <span className="text-xs text-foreground/70">{e.auth}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </ExpandableCard>

      <div className="grid gap-3 lg:grid-cols-2">
        <ExpandableCard title="Security" icon={ShieldCheck} accent={ACCENT}>
          <BulletList items={d.security} accent="var(--success)" />
        </ExpandableCard>
        <ExpandableCard title="Scalability" icon={TrendingUp} accent={ACCENT}>
          <BulletList items={d.scalability} accent={ACCENT} />
        </ExpandableCard>
      </div>

      <ExpandableCard title="Deployment Pipeline" icon={GitBranch} accent={ACCENT}>
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
          {d.deploymentPipeline.map((step, i) => (
            <div key={step} className="flex items-center gap-2">
              <span className="rounded-lg border border-border bg-background/40 px-3 py-1.5 text-xs text-foreground/85">
                {step}
              </span>
              {i < d.deploymentPipeline.length - 1 && (
                <span className="hidden text-muted-foreground sm:inline">→</span>
              )}
            </div>
          ))}
        </div>
      </ExpandableCard>
    </div>
  )
}

function methodColor(method: string) {
  switch (method) {
    case "GET":
      return "var(--secondary)"
    case "POST":
      return "var(--success)"
    case "PUT":
      return "var(--warning)"
    case "DELETE":
      return "var(--destructive)"
    default:
      return "var(--primary)"
  }
}
