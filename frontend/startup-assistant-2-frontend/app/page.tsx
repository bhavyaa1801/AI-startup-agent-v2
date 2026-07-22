"use client"

import { useState } from "react"
import { ThemeProvider } from "@/components/theme-provider"
import { LandingPage } from "@/components/landing-page"
import { LoadingScreen } from "@/components/loading-screen"
import { Dashboard } from "@/components/dashboard/dashboard"

type View = "landing" | "loading" | "dashboard"

export default function Page() {
  const [view, setView] = useState<View>("landing")

  return (
    <ThemeProvider>
      {view === "landing" && <LandingPage onGenerate={() => setView("loading")} />}
      {view === "loading" && <LoadingScreen onComplete={() => setView("dashboard")} />}
      {view === "dashboard" && <Dashboard onReset={() => setView("landing")} />}
    </ThemeProvider>
  )
}
