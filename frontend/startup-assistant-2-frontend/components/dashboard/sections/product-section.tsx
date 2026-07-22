"use client";

import { Package } from "lucide-react";

import { ExpandableCard } from "@/components/dashboard/primitives";
import { JsonRenderer } from "@/components/json/JsonRenderer";

interface ProductSectionProps {
  data: unknown;
}

const ACCENT = "var(--secondary)";

export function ProductSection({
  data,
}: ProductSectionProps) {
  return (
    <ExpandableCard
      title="Product Planning"
      icon={Package}
      accent={ACCENT}
      defaultOpen
    >
      <JsonRenderer value={data} />
    </ExpandableCard>
  );
}