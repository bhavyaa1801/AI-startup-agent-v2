"use client";

import { CalendarCheck } from "lucide-react";

import { ExpandableCard } from "@/components/dashboard/primitives";
import { JsonRenderer } from "@/components/json/JsonRenderer";

interface PlannerSectionProps {
  data: unknown;
}

const ACCENT = "var(--warning)";

export function PlannerSection({
  data,
}: PlannerSectionProps) {
  return (
    <ExpandableCard
      title="Execution Planner"
      icon={CalendarCheck}
      accent={ACCENT}
      defaultOpen
    >
      <JsonRenderer value={data} />
    </ExpandableCard>
  );
}