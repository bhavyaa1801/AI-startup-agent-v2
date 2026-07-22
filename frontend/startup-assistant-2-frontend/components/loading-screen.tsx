"use client"

import { useEffect, useState } from "react"
import { Check, Loader2, Sparkles, ArrowDown } from "lucide-react"
import { AuroraBackground } from "@/components/aurora-background"
import { LOADING_STEPS, AGENTS } from "@/lib/blueprint-data"

interface LoadingScreenProps {
  onComplete: () => void
  /** ms per step */
  stepDuration?: number
}

export function LoadingScreen({ onComplete, stepDuration = 1400 }: LoadingScreenProps) {
  const [current, setCurrent] = useState(0)

  useEffect(() => {
    if (current >= LOADING_STEPS.length) {
      const t = setTimeout(onComplete, 700)
      return () => clearTimeout(t)
    }
    const t = setTimeout(() => setCurrent((c) => c + 1), stepDuration)
    return () => clearTimeout(t)
  }, [current, stepDuration, onComplete])

  const progress = Math.min(100, Math.round((current / LOADING_STEPS.length) * 100))

  return (
    <div className="relative flex min-h-dvh items-center justify-center overflow-hidden px-4">
      <AuroraBackground particles={34} />

      <div className="relative z-10 w-full max-w-md">
        <div className="mb-8 text-center">
          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-primary to-secondary text-primary-foreground shadow-lg shadow-primary/40">
            <Sparkles className="h-5 w-5" />
          </div>
          <h1 className="text-xl font-semibold tracking-tight">Assembling your blueprint</h1>
          <p className="mt-1.5 text-sm text-muted-foreground">
            Agents are collaborating on your startup plan
          </p>
        </div>

        {/* progress bar */}
        <div className="mb-8">
          <div className="mb-2 flex items-center justify-between text-xs text-muted-foreground">
            <span>Progress</span>
            <span className="font-mono text-foreground">{progress}%</span>
          </div>
          <div className="h-2 w-full overflow-hidden rounded-full bg-muted">
            <div
              className="h-full rounded-full bg-gradient-to-r from-primary via-secondary to-accent transition-all duration-700 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* steps */}
        <div className="space-y-3">
          {LOADING_STEPS.map((step, i) => {
            const agent = AGENTS.find((a) => a.id === step.id)!
            const isDone = i < current
            const isActive = i === current
            const Icon = agent.icon

            return (
              <div key={step.id}>
                <div
                  className={`flex items-center gap-3.5 rounded-2xl border px-4 py-3.5 transition-all duration-500 ${
                    isActive
                      ? "glass gradient-border scale-[1.02] shadow-lg shadow-primary/10"
                      : isDone
                        ? "border-border bg-surface/40"
                        : "border-border bg-surface/20 opacity-55"
                  }`}
                >
                  <span
                    className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl transition-colors ${
                      isActive ? "animate-pulse-ring" : ""
                    }`}
                    style={{
                      background: isDone
                        ? "color-mix(in oklab, var(--success) 18%, transparent)"
                        : "color-mix(in oklab, " + agent.accent + " 16%, transparent)",
                      color: isDone ? "var(--success)" : agent.accent,
                    }}
                  >
                    {isDone ? (
                      <Check className="h-4 w-4" strokeWidth={3} />
                    ) : isActive ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                      <Icon className="h-4 w-4" />
                    )}
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-medium">{step.label}</p>
                    <p className="truncate text-xs text-muted-foreground">
                      {isDone ? "Completed" : step.detail}
                    </p>
                  </div>
                  {isDone && (
                    <span className="rounded-full bg-success/15 px-2 py-0.5 text-[10px] font-medium text-success">
                      Done
                    </span>
                  )}
                </div>

                {i < LOADING_STEPS.length - 1 && (
                  <div className="flex justify-center py-0.5">
                    <ArrowDown
                      className={`h-3.5 w-3.5 transition-colors ${
                        i < current ? "text-success" : "text-muted-foreground/40"
                      }`}
                    />
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
