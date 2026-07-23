"use client";

import {
  Cpu,
  Layers,
  Database,
  Globe,
  Cloud,
  Shield,
} from "lucide-react";

import {
  ExpandableCard,
  BulletList,
  MetricCard,
  SubHeading,
} from "@/components/dashboard/primitives";

interface TechnicalSectionProps {
  data: any;
}

export function TechnicalSection({ data }: TechnicalSectionProps) {
  if (!data) return null;

  return (
    <div className="space-y-6">

      {/* Overview */}

      <ExpandableCard
        title="Technical Overview"
        icon={Cpu}
        defaultOpen
      >
        <div className="space-y-5">

          <MetricCard
            label="Technical Required"
            value={data.technical_required ? "Yes" : "No"}
          />

          <div>
            <SubHeading>Reason</SubHeading>
            <p>{data.reason}</p>
          </div>

        </div>
      </ExpandableCard>

      {/* Tech Stack */}

      <ExpandableCard
        title="Technology Stack"
        icon={Layers}
        defaultOpen
      >
        <div className="grid gap-6 md:grid-cols-2">

          <div>
            <SubHeading>Frontend</SubHeading>
            <BulletList items={data.tech_stack?.frontend ?? []} />
          </div>

          <div>
            <SubHeading>Backend</SubHeading>
            <BulletList items={data.tech_stack?.backend ?? []} />
          </div>

          <div>
            <SubHeading>Database</SubHeading>
            <BulletList items={data.tech_stack?.database ?? []} />
          </div>

          <div>
            <SubHeading>AI</SubHeading>
            <BulletList items={data.tech_stack?.ai ?? []} />
          </div>

          <div className="md:col-span-2">
            <SubHeading>Deployment</SubHeading>
            <BulletList items={data.tech_stack?.deployment ?? []} />
          </div>

        </div>
      </ExpandableCard>

      {/* Architecture */}

      <ExpandableCard
        title="Architecture"
        icon={Layers}
        defaultOpen
      >
        <BulletList
          items={data.architecture ?? []}
        />
      </ExpandableCard>

      {/* Database */}

      <ExpandableCard
        title="Database Tables"
        icon={Database}
        defaultOpen
      >
        <BulletList
          items={data.database_tables ?? []}
        />
      </ExpandableCard>

      {/* APIs */}

      <ExpandableCard
        title="API Endpoints"
        icon={Globe}
        defaultOpen
      >
        <div className="space-y-4">

          {(data.apis ?? []).map((api: any, index: number) => (
            <div
              key={index}
              className="rounded-xl border border-border p-4 bg-background/40"
            >
              <div className="flex items-center justify-between">

                <span className="rounded bg-primary/10 px-2 py-1 text-xs font-semibold text-primary">
                  {api.method}
                </span>

                <span className="font-mono text-sm">
                  {api.endpoint}
                </span>

              </div>

              <p className="mt-3 text-sm text-muted-foreground">
                {api.purpose}
              </p>

            </div>
          ))}

        </div>
      </ExpandableCard>

      {/* Deployment */}

      <ExpandableCard
        title="Deployment"
        icon={Cloud}
        defaultOpen
      >
        <div className="grid gap-4 md:grid-cols-3">

          <MetricCard
            label="Frontend"
            value={data.deployment?.frontend ?? "-"}
          />

          <MetricCard
            label="Backend"
            value={data.deployment?.backend ?? "-"}
          />

          <MetricCard
            label="Database"
            value={data.deployment?.database ?? "-"}
          />

        </div>
      </ExpandableCard>

      {/* Security */}

      {(data.security?.length ?? 0) > 0 && (
        <ExpandableCard
          title="Security"
          icon={Shield}
        >
          <BulletList
            items={data.security}
          />
        </ExpandableCard>
      )}

    </div>
  );
}