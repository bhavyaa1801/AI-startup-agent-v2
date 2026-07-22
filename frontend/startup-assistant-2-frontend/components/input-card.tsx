"use client"

import { useState } from "react"
import { Sparkles, Lightbulb, Building2, Globe2, ArrowRight } from "lucide-react"

interface InputCardProps {
  onGenerate: () => void
}

export function InputCard({ onGenerate }: InputCardProps) {
  const [idea, setIdea] = useState(
    "An AI platform that turns a single startup idea into a complete, investor-ready blueprint.",
  )
  const [industry, setIndustry] = useState("SaaS / Developer Tools")
  const [region, setRegion] = useState("North America")

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    onGenerate()
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
          <h2 className="text-sm font-semibold">Describe your startup</h2>
          <p className="text-xs text-muted-foreground">Five AI agents will build your blueprint.</p>
        </div>
      </div>

      <div className="space-y-5">
        <Field label="Startup Idea" icon={<Lightbulb className="h-3.5 w-3.5" />}>
          <textarea
            value={idea}
            onChange={(e) => setIdea(e.target.value)}
            rows={3}
            placeholder="Describe the problem you're solving and who it's for..."
            className="w-full resize-none rounded-xl border border-border bg-background/40 px-4 py-3 text-sm text-foreground outline-none transition-colors placeholder:text-muted-foreground/60 focus:border-primary/60 focus:ring-2 focus:ring-ring/40"
          />
        </Field>

        <div className="grid gap-5 sm:grid-cols-2">
          <Field label="Industry" icon={<Building2 className="h-3.5 w-3.5" />}>
            <input
              value={industry}
              onChange={(e) => setIndustry(e.target.value)}
              placeholder="e.g. Fintech"
              className="w-full rounded-xl border border-border bg-background/40 px-4 py-2.5 text-sm text-foreground outline-none transition-colors placeholder:text-muted-foreground/60 focus:border-primary/60 focus:ring-2 focus:ring-ring/40"
            />
          </Field>
          <Field label="Target Region" icon={<Globe2 className="h-3.5 w-3.5" />}>
            <input
              value={region}
              onChange={(e) => setRegion(e.target.value)}
              placeholder="e.g. Europe"
              className="w-full rounded-xl border border-border bg-background/40 px-4 py-2.5 text-sm text-foreground outline-none transition-colors placeholder:text-muted-foreground/60 focus:border-primary/60 focus:ring-2 focus:ring-ring/40"
            />
          </Field>
        </div>

        <button
          type="submit"
          className="group/btn relative flex w-full items-center justify-center gap-2 overflow-hidden rounded-xl bg-gradient-to-r from-primary to-secondary px-6 py-3.5 text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/30 transition-all hover:shadow-xl hover:shadow-primary/40 hover:brightness-110 active:scale-[0.99]"
        >
          <Sparkles className="h-4 w-4" />
          Generate Blueprint
          <ArrowRight className="h-4 w-4 transition-transform group-hover/btn:translate-x-0.5" />
          <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/25 to-transparent transition-transform duration-700 group-hover/btn:translate-x-full" />
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
