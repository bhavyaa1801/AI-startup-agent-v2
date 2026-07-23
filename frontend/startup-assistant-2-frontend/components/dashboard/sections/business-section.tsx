"use client"

import {
  Briefcase,
  Search,
  Users,
  Building,
  ShieldAlert,
  Lightbulb,
} from "lucide-react"

import {
  ExpandableCard,
  BulletList,
  MetricCard,
} from "@/components/dashboard/primitives"

interface Props {
  data: any
}

export function BusinessSection({ data }: Props) {
  if (!data) return null

  return (
    <div className="space-y-6">

      {/* Executive Summary */}

      <ExpandableCard
        title="Executive Summary"
        icon={Briefcase}
        defaultOpen
      >
        <p className="leading-7 text-foreground">
          {data.executive_summary}
        </p>
      </ExpandableCard>

      {/* Two column */}

      <div className="grid gap-6 lg:grid-cols-2">

        {/* Market */}

        <ExpandableCard
          title="Market Research"
          icon={Search}
          defaultOpen
        >
          <div className="space-y-5">

            <MetricCard
              label="Research Status"
              value={data.market_research?.research_status ?? "-"}
            />

            <p>
              {data.market_research?.market_definition}
            </p>

            <BulletList
              items={
                data.market_research?.demand_hypotheses ?? []
              }
            />

          </div>
        </ExpandableCard>

        {/* Customers */}

        <ExpandableCard
          title="Customer Analysis"
          icon={Users}
          defaultOpen
        >
          <div className="space-y-5">

            <MetricCard
              label="Early Adopter"
              value={
                data.target_customer_analysis
                  ?.recommended_early_adopter ?? "-"
              }
            />

            <BulletList
              items={
                data.target_customer_analysis
                  ?.possible_segments ?? []
              }
            />

          </div>
        </ExpandableCard>

        {/* Business */}

        <ExpandableCard
          title="Business Model"
          icon={Building}
          defaultOpen
        >
          <div className="space-y-5">

            <MetricCard
              label="Model"
              value={
                data.business_model
                  ?.recommended_model ?? "-"
              }
            />

            <BulletList
              items={
                data.business_model
                  ?.possible_acquisition_channels ?? []
              }
            />

          </div>
        </ExpandableCard>

        {/* Competitors */}

        <ExpandableCard
          title="Competitors"
          icon={ShieldAlert}
          defaultOpen
        >
          <BulletList
            items={
              data.competitor_analysis
                ?.competitor_categories ?? []
            }
          />
        </ExpandableCard>

      </div>

      {/* SWOT */}

      <ExpandableCard
        title="SWOT Analysis"
        defaultOpen
      >

        <div className="grid gap-4 lg:grid-cols-2">

          <MetricCard
            label="Strengths"
            value={`${data.swot_analysis?.strengths?.length ?? 0}`}
            note="Key strengths"
          />

          <MetricCard
            label="Weaknesses"
            value={`${data.swot_analysis?.weaknesses?.length ?? 0}`}
            note="Key weaknesses"
          />

          <BulletList
            items={data.swot_analysis?.strengths ?? []}
          />

          <BulletList
            items={data.swot_analysis?.weaknesses ?? []}
          />

        </div>

      </ExpandableCard>

      {/* Recommendation */}

      <ExpandableCard
        title="Recommendation"
        icon={Lightbulb}
        defaultOpen
      >

        <MetricCard
          label="Decision"
          value={data.recommendation?.decision ?? "-"}
        />

        <p className="mt-4">
          {data.recommendation?.reason}
        </p>

        <div className="mt-6">

          <BulletList
            items={
              data.recommendation?.next_steps ?? []
            }
          />

        </div>

      </ExpandableCard>

    </div>
  )
}