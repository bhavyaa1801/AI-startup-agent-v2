"use client"

import { useState } from "react"
import {
  Sparkles,
  Lightbulb,
  Building2,
  Globe2,
  ArrowRight,
} from "lucide-react"

import { generateBlueprint } from "@/lib/api"

interface InputCardProps {
  onGenerate: (data: any) => void
}

export function InputCard({ onGenerate }: InputCardProps) {
  const [idea, setIdea] = useState(
    "An AI platform that turns a single startup idea into a complete investor-ready blueprint."
  )

  const [industry, setIndustry] = useState("SaaS")

  const [region, setRegion] = useState("Global")

  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()

    try {
      setLoading(true)

      const result = await generateBlueprint({
        idea,
        industry,
        target_region: region,
      })

      console.log(result)

      onGenerate(result)

    } catch (err) {
      console.error(err)
      alert("Failed to generate blueprint.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="group relative w-full max-w-2xl rounded-3xl glass gradient-border p-6 shadow-2xl shadow-black/40 transition-transform duration-500 md:p-8"
    >
      <div className="mb-6 flex items-center gap-2">
        <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/15 text-primary">
          <Sparkles className="h-4 w-4" />
        </span>

        <div>
          <h2 className="text-sm font-semibold">
            Describe your startup
          </h2>

          <p className="text-xs text-muted-foreground">
            Five AI agents will build your blueprint.
          </p>
        </div>
      </div>

      <div className="space-y-5">

        <Field
          label="Startup Idea"
          icon={<Lightbulb className="h-3.5 w-3.5" />}
        >
          <textarea
            value={idea}
            onChange={(e) => setIdea(e.target.value)}
            rows={3}
            className="w-full resize-none rounded-xl border border-border bg-background/40 px-4 py-3 text-sm outline-none"
          />
        </Field>

        <div className="grid gap-5 sm:grid-cols-2">

          <Field
            label="Industry"
            icon={<Building2 className="h-3.5 w-3.5" />}
          >
            <input
              value={industry}
              onChange={(e) => setIndustry(e.target.value)}
              className="w-full rounded-xl border border-border bg-background/40 px-4 py-2.5 text-sm outline-none"
            />
          </Field>

          <Field
            label="Target Region"
            icon={<Globe2 className="h-3.5 w-3.5" />}
          >
            <input
              value={region}
              onChange={(e) => setRegion(e.target.value)}
              className="w-full rounded-xl border border-border bg-background/40 px-4 py-2.5 text-sm outline-none"
            />
          </Field>

        </div>

        <button
          type="submit"
          disabled={loading}
          className="group/btn flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-primary to-secondary px-6 py-3.5 text-sm font-semibold text-white shadow-lg transition-all disabled:opacity-50"
        >
          <Sparkles className="h-4 w-4" />

          {loading ? "Generating..." : "Generate Blueprint"}

          <ArrowRight className="h-4 w-4" />
        </button>

      </div>
    </form>
  )
}

function Field({
  label,
  icon,
  children,
}: {
  label: string
  icon: React.ReactNode
  children: React.ReactNode
}) {
  return (
    <label className="block">
      <span className="mb-2 flex items-center gap-1.5 text-xs font-medium text-muted-foreground">
        <span className="text-primary">{icon}</span>
        {label}
      </span>
      {children}
    </label>
  )
}