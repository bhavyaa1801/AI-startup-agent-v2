"use client";

import { Cpu } from "lucide-react";

import { ExpandableCard } from "@/components/dashboard/primitives";
import { JsonRenderer } from "@/components/json/JsonRenderer";

interface TechnicalSectionProps {
  data: unknown;
}

const ACCENT = "var(--accent)";

export function TechnicalSection({
  data,
}: TechnicalSectionProps) {
  return (
    <ExpandableCard
      title="Technical Architecture"
      icon={Cpu}
      accent={ACCENT}
      defaultOpen
    >
      <JsonRenderer value={data} />
    </ExpandableCard>
  );
}