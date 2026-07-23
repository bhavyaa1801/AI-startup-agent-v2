"use client";

import { Sparkles } from "lucide-react";

export default function Footer() {
  return (
    <footer
      id="about"
      className="relative left-1/2 w-screen -translate-x-1/2 border-t border-white/10 bg-[#050505]"
    >
      <div className="mx-auto max-w-6xl px-6 py-10">

        {/* Logo + Description */}
        <div className="flex flex-col items-center text-center">

          <div className="flex items-center gap-3">

            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-violet-500 to-cyan-400 shadow-lg shadow-violet-500/25">
              <Sparkles className="h-5 w-5 text-white" />
            </div>

            <h2 className="text-2xl font-bold tracking-tight text-white">
              VentureAI
            </h2>

          </div>

          <p className="mt-4 max-w-2xl text-sm leading-7 text-gray-400">
            Build investor-ready startup blueprints using collaborative AI
            agents that automate business research, product planning,
            technical architecture, finance, and execution strategy.
          </p>

        </div>

        {/* Navigation */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-8 text-sm text-gray-400">

          <a
            href="#features"
            className="transition duration-200 hover:text-white"
          >
            Features
          </a>

          <a
            href="#agents"
            className="transition duration-200 hover:text-white"
          >
            AI Agents
          </a>

          <a
            href="#input"
            className="transition duration-200 hover:text-white"
          >
            Generate Blueprint
          </a>

        </div>

        {/* Divider */}
        <div className="my-8 h-px w-full bg-white/10" />

        {/* Bottom */}
        <div className="flex flex-col items-center justify-between gap-3 text-sm text-gray-500 md:flex-row">

          <p>
            © 2026 VentureAI. All rights reserved.
          </p>

          <p>
            Built with{" "}
            <span className="text-white">Next.js</span>
            <span className="mx-2">•</span>
            <span className="text-white">FastAPI</span>
            <span className="mx-2">•</span>
            <span className="text-white">Groq</span>
          </p>

        </div>

      </div>
    </footer>
  );
}