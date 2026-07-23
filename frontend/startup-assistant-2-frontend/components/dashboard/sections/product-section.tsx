"use client";

import {
  Package,
  Target,
  Users,
  Rocket,
  CheckCircle,
  TrendingUp,
} from "lucide-react";

import {
  ExpandableCard,
  BulletList,
  MetricCard,
  SubHeading,
} from "@/components/dashboard/primitives";

interface ProductSectionProps {
  data: any;
}

export function ProductSection({ data }: ProductSectionProps) {
  if (!data) return null;

  return (
    <div className="space-y-6">

      {/* Hero */}
      <ExpandableCard
        title="Product Planning"
        icon={Package}
        defaultOpen
      >
        <div className="space-y-6">

          <div>
            <SubHeading>Product Vision</SubHeading>
            <p>{data.productVision}</p>
          </div>

          <div>
            <SubHeading>Problem Statement</SubHeading>
            <p>{data.problemStatement}</p>
          </div>

        </div>
      </ExpandableCard>

      {/* Users */}
      <ExpandableCard
        title="Users"
        icon={Users}
        defaultOpen
      >
        <div className="grid gap-6 md:grid-cols-2">

          <div>
            <SubHeading>Target Users</SubHeading>

            <BulletList
              items={data.targetUsers ?? []}
            />
          </div>

          <div>
            <SubHeading>User Personas</SubHeading>

            <BulletList
              items={data.userPersonas ?? []}
            />
          </div>

        </div>
      </ExpandableCard>

      {/* MVP */}
      <ExpandableCard
        title="MVP"
        icon={Rocket}
        defaultOpen
      >
        <div className="grid gap-6 md:grid-cols-2">

          <div>
            <SubHeading>MVP Features</SubHeading>

            <BulletList
              items={data.mvpFeatures ?? []}
            />
          </div>

          <div>
            <SubHeading>Future Features</SubHeading>

            <BulletList
              items={data.futureFeatures ?? []}
            />
          </div>

        </div>
      </ExpandableCard>

      {/* Roadmap */}
      <ExpandableCard
        title="Roadmap"
        icon={Target}
        defaultOpen
      >
        <BulletList
          items={data.roadmap ?? []}
        />
      </ExpandableCard>

      {/* Success */}
      <ExpandableCard
        title="Success Metrics"
        icon={TrendingUp}
        defaultOpen
      >
        <BulletList
          items={data.successMetrics ?? []}
        />
      </ExpandableCard>

      {/* Risks */}
      {(data.risks?.length ?? 0) > 0 && (
        <ExpandableCard
          title="Risks"
          icon={CheckCircle}
        >
          <BulletList
            items={data.risks}
          />
        </ExpandableCard>
      )}

    </div>
  );
}