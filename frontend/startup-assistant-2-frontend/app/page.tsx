"use client"

import { useState } from "react"

import { ThemeProvider } from "@/components/theme-provider"
import { LandingPage } from "@/components/landing-page"
import { LoadingScreen } from "@/components/loading-screen"
import { Dashboard } from "@/components/dashboard/dashboard"

type View = "landing" | "loading" | "dashboard"

export default function Page() {
  const [view, setView] = useState<View>("landing")

  const [blueprint, setBlueprint] = useState<any>(null)

  function handleGenerate(data: any) {
    // Save backend response
    setBlueprint(data)

    // Show loading animation
    setView("loading")
  }

  function handleLoadingComplete() {
    setView("dashboard")
  }

  function handleReset() {
    setBlueprint(null)
    setView("landing")
  }

  return (
    <ThemeProvider>

      {view === "landing" && (
        <LandingPage onGenerate={handleGenerate} />
      )}

      {view === "loading" && (
        <LoadingScreen
          onComplete={handleLoadingComplete}
        />
      )}

      {view === "dashboard" && (
        <Dashboard
          blueprint={blueprint}
          onReset={handleReset}
        />
      )}

    </ThemeProvider>
  )
}