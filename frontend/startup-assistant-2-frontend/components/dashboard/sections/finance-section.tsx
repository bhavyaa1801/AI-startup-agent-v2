"use client";

import { Wallet } from "lucide-react";

import { ExpandableCard } from "@/components/dashboard/primitives";
import { JsonRenderer } from "@/components/json/JsonRenderer";

interface FinanceSectionProps {
  data: unknown;
}

const ACCENT = "var(--success)";

export function FinanceSection({
  data,
}: FinanceSectionProps) {
  return (
    <ExpandableCard
      title="Finance & Growth"
      icon={Wallet}
      accent={ACCENT}
      defaultOpen
    >
      <JsonRenderer value={data} />
    </ExpandableCard>
  );
}