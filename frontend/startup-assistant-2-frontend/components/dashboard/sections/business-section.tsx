"use client";

import { Briefcase } from "lucide-react";

import { ExpandableCard } from "@/components/dashboard/primitives";
import { JsonRenderer } from "@/components/json/JsonRenderer";

interface BusinessSectionProps {
  data: unknown;
}

const ACCENT = "var(--primary)";

export function BusinessSection({
  data,
}: BusinessSectionProps) {
  return (
    <ExpandableCard
      title="Business Research"
      icon={Briefcase}
      accent={ACCENT}
      defaultOpen
    >
      <JsonRenderer value={data} />
    </ExpandableCard>
  );
}