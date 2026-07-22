"use client"

import {
  Eye,
  AlertCircle,
  Users,
  UserSquare,
  Rocket,
  Sparkles,
  Map,
  BookOpen,
  ClipboardCheck,
  ListChecks,
  Gauge,
  Target,
  ShieldAlert,
} from "lucide-react"
import {
  ExpandableCard,
  MetricCard,
  Badge,
  BulletList,
  SubHeading,
} from "@/components/dashboard/primitives"
import { productPlanning as d } from "@/lib/blueprint-data"

const ACCENT = "var(--secondary)"

export function ProductSection() {
  return (
    <div className="space-y-3">
      <ExpandableCard title="Vision" icon={Eye} accent={ACCENT} defaultOpen>
        <p className="text-lg font-medium leading-relaxed text-foreground">{d.vision}</p>
      </ExpandableCard>

      <ExpandableCard title="Problem Statement" icon={AlertCircle} accent={ACCENT} defaultOpen>
        <p className="text-foreground/85">{d.problemStatement}</p>
      </ExpandableCard>

      <ExpandableCard title="Target Users" icon={Users} accent={ACCENT}>
        <div className="flex flex-wrap gap-2">
          {d.targetUsers.map((u) => (
            <Badge key={u} color={ACCENT}>
              {u}
            </Badge>
          ))}
        </div>
      </ExpandableCard>

      <ExpandableCard title="User Personas" icon={UserSquare} accent={ACCENT}>
        <div className="grid gap-3 md:grid-cols-3">
          {d.personas.map((p) => (
            <div key={p.name} className="rounded-xl border border-border bg-background/40 p-4">
              <p className="text-sm font-semibold text-foreground">{p.name}</p>
              <p className="mb-3 text-xs text-secondary">{p.role}</p>
              <div className="space-y-2 text-xs">
                <div>
                  <SubHeading>Goal</SubHeading>
                  <p className="text-foreground/80">{p.goal}</p>
                </div>
                <div>
                  <SubHeading>Pain</SubHeading>
                  <p className="text-foreground/80">{p.pain}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </ExpandableCard>

      <div className="grid gap-3 lg:grid-cols-2">
        <ExpandableCard title="MVP Features" icon={Rocket} accent={ACCENT} defaultOpen>
          <BulletList items={d.mvpFeatures} accent="var(--success)" />
        </ExpandableCard>
        <ExpandableCard title="Future Features" icon={Sparkles} accent={ACCENT} defaultOpen>
          <BulletList items={d.futureFeatures} accent={ACCENT} />
        </ExpandableCard>
      </div>

      <ExpandableCard title="Roadmap" icon={Map} accent={ACCENT}>
        <div className="grid gap-3 md:grid-cols-3">
          {d.roadmap.map((r) => (
            <div key={r.phase} className="rounded-xl border border-border bg-background/40 p-4">
              <Badge color={ACCENT}>{r.phase}</Badge>
              <p className="mt-2.5 text-sm font-semibold text-foreground">{r.title}</p>
              <p className="mt-1 text-xs text-muted-foreground">{r.items}</p>
            </div>
          ))}
        </div>
      </ExpandableCard>

      <ExpandableCard title="User Stories" icon={BookOpen} accent={ACCENT}>
        <BulletList items={d.userStories} accent={ACCENT} />
      </ExpandableCard>

      <ExpandableCard title="Acceptance Criteria" icon={ClipboardCheck} accent={ACCENT}>
        <BulletList items={d.acceptanceCriteria} accent="var(--success)" />
      </ExpandableCard>

      <div className="grid gap-3 lg:grid-cols-2">
        <ExpandableCard title="Functional Requirements" icon={ListChecks} accent={ACCENT}>
          <BulletList items={d.functionalRequirements} accent={ACCENT} />
        </ExpandableCard>
        <ExpandableCard title="Non-Functional Requirements" icon={Gauge} accent={ACCENT}>
          <BulletList items={d.nonFunctionalRequirements} accent="var(--accent)" />
        </ExpandableCard>
      </div>

      <ExpandableCard title="Success Metrics" icon={Target} accent={ACCENT} defaultOpen>
        <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
          {d.successMetrics.map((m) => (
            <MetricCard key={m.label} label={m.label} value={m.value} accent={ACCENT} />
          ))}
        </div>
      </ExpandableCard>

      <ExpandableCard title="Risks" icon={ShieldAlert} accent={ACCENT}>
        <BulletList items={d.risks} accent="var(--warning)" />
      </ExpandableCard>
    </div>
  )
}
