"use client";

import {
  Wallet,
  DollarSign,
  TrendingUp,
  PiggyBank,
  AlertTriangle,
} from "lucide-react";

import {
  ExpandableCard,
  BulletList,
  MetricCard,
  SubHeading,
} from "@/components/dashboard/primitives";

interface FinanceSectionProps {
  data: any;
}

export function FinanceSection({ data }: FinanceSectionProps) {
  if (!data) return null;

  return (
    <div className="space-y-6">

      {/* Budget */}

      <ExpandableCard
        title="Estimated Budget"
        icon={Wallet}
        defaultOpen
      >
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">

          <MetricCard
            label="Development"
            value={data.estimated_budget?.development ?? "-"}
          />

          <MetricCard
            label="Marketing"
            value={data.estimated_budget?.marketing ?? "-"}
          />

          <MetricCard
            label="Operations"
            value={data.estimated_budget?.operations ?? "-"}
          />

          <MetricCard
            label="Legal"
            value={data.estimated_budget?.legal_and_registration ?? "-"}
          />

        </div>
      </ExpandableCard>

      {/* Monthly Cost */}

      <ExpandableCard
        title="Monthly Operating Cost"
        icon={DollarSign}
        defaultOpen
      >
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">

          <MetricCard
            label="Hosting"
            value={data.monthly_operating_cost?.hosting ?? "-"}
          />

          <MetricCard
            label="Database"
            value={data.monthly_operating_cost?.database ?? "-"}
          />

          <MetricCard
            label="AI API"
            value={data.monthly_operating_cost?.ai_api ?? "-"}
          />

          <MetricCard
            label="Maintenance"
            value={data.monthly_operating_cost?.maintenance ?? "-"}
          />

        </div>
      </ExpandableCard>

      {/* Revenue */}

      <ExpandableCard
        title="Revenue Model"
        icon={TrendingUp}
        defaultOpen
      >
        <BulletList
          items={data.revenue_model ?? []}
        />
      </ExpandableCard>

      {/* Funding */}

      <ExpandableCard
        title="Funding Strategy"
        icon={PiggyBank}
        defaultOpen
      >
        <BulletList
          items={data.funding_strategy ?? []}
        />
      </ExpandableCard>

      {/* Financial Metrics */}

      <ExpandableCard
        title="Financial Metrics"
        icon={TrendingUp}
        defaultOpen
      >
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">

          <MetricCard
            label="Break Even"
            value={data.break_even ?? "-"}
          />

          <MetricCard
            label="Gross Margin"
            value={data.financial_metrics?.expected_gross_margin ?? "-"}
          />

          <MetricCard
            label="Target Customers"
            value={data.financial_metrics?.target_customers_first_year ?? "-"}
          />

          <MetricCard
            label="Expected ROI"
            value={data.financial_metrics?.expected_roi ?? "-"}
          />

        </div>
      </ExpandableCard>

      {/* Risks */}

      {(data.financial_risks?.length ?? 0) > 0 && (
        <ExpandableCard
          title="Financial Risks"
          icon={AlertTriangle}
        >
          <BulletList
            items={data.financial_risks}
          />
        </ExpandableCard>
      )}

    </div>
  );
}