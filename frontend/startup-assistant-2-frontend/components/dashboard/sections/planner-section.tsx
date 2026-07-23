"use client";

import {
  CalendarCheck,
  Rocket,
  Flag,
  CheckCircle2,
  TrendingUp,
  Lightbulb,
} from "lucide-react";

import {
  ExpandableCard,
  BulletList,
  MetricCard,
  SubHeading,
} from "@/components/dashboard/primitives";

interface PlannerSectionProps {
  data: any;
}

function RenderValue({ value }: { value: any }) {
  if (value == null) return <p>-</p>;

  if (Array.isArray(value)) {
    return <BulletList items={value} />;
  }

  if (typeof value === "object") {
    return (
      <div className="space-y-3">
        {Object.entries(value).map(([key, val]) => (
          <div key={key}>
            <SubHeading>{key.replace(/_/g, " ")}</SubHeading>

            {Array.isArray(val) ? (
              <BulletList items={val} />
            ) : (
              <p className="text-muted-foreground">
                {typeof val === "object"
                  ? JSON.stringify(val, null, 2)
                  : String(val)}
              </p>
            )}
          </div>
        ))}
      </div>
    );
  }

  return <p>{String(value)}</p>;
}

export function PlannerSection({ data }: PlannerSectionProps) {
  if (!data) return null;

  return (
    <div className="space-y-6">

      {/* Overview */}

      <ExpandableCard
        title="Project Overview"
        icon={CalendarCheck}
        defaultOpen
      >
        <div className="grid gap-4 md:grid-cols-2">

          <MetricCard
            label="Industry"
            value={data.executive_summary?.industry ?? "-"}
          />

          <MetricCard
            label="Target Region"
            value={data.executive_summary?.target_region ?? "-"}
          />

        </div>

        <div className="mt-6">
          <SubHeading>Description</SubHeading>
          <p>{data.executive_summary?.description}</p>
        </div>
      </ExpandableCard>

      {/* Roadmap */}

      <ExpandableCard
        title="Execution Roadmap"
        icon={Rocket}
        defaultOpen
      >
        <RenderValue value={data.execution_roadmap} />
      </ExpandableCard>

      {/* Milestones */}

      <ExpandableCard
        title="Milestones"
        icon={Flag}
        defaultOpen
      >
        <RenderValue value={data.milestones} />
      </ExpandableCard>

      {/* Priority */}

      <ExpandableCard
        title="Priority Tasks"
        icon={CheckCircle2}
        defaultOpen
      >
        <RenderValue value={data.priority_tasks} />
      </ExpandableCard>

      {/* GTM */}

      <ExpandableCard
        title="Go To Market"
        icon={TrendingUp}
        defaultOpen
      >
        <RenderValue value={data.go_to_market_plan} />
      </ExpandableCard>

      {/* Risks */}

      <ExpandableCard
        title="Risk Analysis"
        icon={TrendingUp}
      >
        <RenderValue value={data.risk_analysis} />
      </ExpandableCard>

      {/* Metrics */}

      <ExpandableCard
        title="Success Metrics"
        icon={TrendingUp}
      >
        <RenderValue value={data.success_metrics} />
      </ExpandableCard>

      {/* Scaling */}

      <ExpandableCard
        title="Scaling Strategy"
        icon={Rocket}
      >
        <RenderValue value={data.scaling_strategy} />
      </ExpandableCard>

      {/* Recommendation */}

      <ExpandableCard
        title="Final Recommendations"
        icon={Lightbulb}
      >
        <RenderValue value={data.final_recommendations} />
      </ExpandableCard>

    </div>
  );
}