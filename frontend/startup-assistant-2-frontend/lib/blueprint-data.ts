import type { LucideIcon } from "lucide-react"
import {
  BarChart3,
  Package,
  Settings,
  Wallet,
  CalendarDays,
} from "lucide-react"

export type AgentId = "business" | "product" | "technical" | "finance" | "planner"

export interface AgentMeta {
  id: AgentId
  name: string
  short: string
  icon: LucideIcon
  emoji: string
  accent: string // css color
  tagline: string
}

export const AGENTS: AgentMeta[] = [
  {
    id: "business",
    name: "Business Research",
    short: "Business",
    icon: BarChart3,
    emoji: "📊",
    accent: "var(--primary)",
    tagline: "Market, customers & competitive landscape",
  },
  {
    id: "product",
    name: "Product Planning",
    short: "Product",
    icon: Package,
    emoji: "📦",
    accent: "var(--secondary)",
    tagline: "Vision, MVP scope & product roadmap",
  },
  {
    id: "technical",
    name: "Technical Architecture",
    short: "Technical",
    icon: Settings,
    emoji: "⚙️",
    accent: "var(--accent)",
    tagline: "Stack, data model & infrastructure",
  },
  {
    id: "finance",
    name: "Finance & Growth",
    short: "Finance",
    icon: Wallet,
    emoji: "💰",
    accent: "var(--warning)",
    tagline: "Budget, revenue model & funding",
  },
  {
    id: "planner",
    name: "Execution Planner",
    short: "Planner",
    icon: CalendarDays,
    emoji: "📅",
    accent: "var(--destructive)",
    tagline: "Roadmap, milestones & go-to-market",
  },
]

export const AGENT_ORDER: AgentId[] = [
  "business",
  "product",
  "technical",
  "finance",
  "planner",
]

/* ---------------- Business Research ---------------- */
export const businessResearch = {
  executiveSummary:
    "LaunchLoop is an AI-native platform that turns a single startup idea into a complete, investor-ready operating blueprint. Targeting first-time founders and early operators, it collapses weeks of research, planning, and documentation into minutes using a team of collaborating agents.",
  marketResearch: [
    { label: "Total Addressable Market", value: "$47B", note: "Global startup tooling & advisory" },
    { label: "Serviceable Market", value: "$8.2B", note: "AI-assisted planning software" },
    { label: "Annual Growth Rate", value: "24%", note: "CAGR through 2030" },
    { label: "New Startups / yr", value: "5.1M", note: "US business formations" },
  ],
  targetCustomers: [
    { name: "First-time Founders", desc: "Solo and small teams validating a new idea without a co-founder network.", share: 42 },
    { name: "Indie Hackers", desc: "Technical builders who want business & GTM guidance fast.", share: 28 },
    { name: "Accelerators", desc: "Programs standardizing diligence and cohort onboarding.", share: 18 },
    { name: "Corporate Innovation", desc: "Intrapreneurs pitching new bets to leadership.", share: 12 },
  ],
  competitors: [
    { name: "Notion AI", strength: "Docs & flexibility", weakness: "No domain logic", threat: "Medium" },
    { name: "Traditional Consultants", strength: "Depth & trust", weakness: "Slow & costly", threat: "Low" },
    { name: "Generic LLM chat", strength: "Free & fast", weakness: "No structure or memory", threat: "High" },
    { name: "Pitch deck tools", strength: "Polished output", weakness: "Surface-level only", threat: "Medium" },
  ],
  businessModel:
    "Freemium SaaS. Free tier generates one blueprint per month; Pro ($29/mo) unlocks unlimited blueprints, exports, and revisions; Teams ($99/seat) adds collaboration, shared workspaces, and accelerator dashboards.",
  swot: {
    strengths: ["Multi-agent depth", "Speed to insight", "Structured, exportable output"],
    weaknesses: ["New brand", "Model cost per run", "Depends on input quality"],
    opportunities: ["Accelerator partnerships", "Template marketplace", "Regional expansion"],
    threats: ["Fast-moving incumbents", "LLM commoditization", "Data trust concerns"],
  },
  validation: [
    "84 of 120 surveyed founders would pay for structured AI planning",
    "3 accelerators signed letters of intent for cohort pilots",
    "Waitlist of 2,400 within first 6 weeks of teaser launch",
  ],
  risks: [
    { risk: "Model output accuracy", severity: "High", mitigation: "Human-in-the-loop review + citations" },
    { risk: "Rising inference cost", severity: "Medium", mitigation: "Caching + tiered model routing" },
    { risk: "Low activation", severity: "Medium", mitigation: "Guided onboarding & templates" },
  ],
  recommendations: [
    "Anchor launch on the accelerator channel for credibility and volume.",
    "Ship an export-to-pitch-deck feature to sharpen the value proposition.",
    "Instrument activation funnel before scaling paid acquisition.",
  ],
}

/* ---------------- Product Planning ---------------- */
export const productPlanning = {
  vision:
    "Become the default operating system for turning ideas into fundable companies — where every founder has an expert team from day zero.",
  problemStatement:
    "Founders waste weeks stitching together fragmented research, planning, and technical decisions, often producing shallow plans that fail to convince investors or guide execution.",
  targetUsers: ["First-time founders", "Indie hackers", "Accelerator managers", "Innovation teams"],
  personas: [
    {
      name: "Maya, the First-time Founder",
      role: "Non-technical, ex-marketer",
      goal: "Validate her idea and raise a pre-seed round",
      pain: "Doesn't know where to start or what investors expect",
    },
    {
      name: "Devon, the Indie Hacker",
      role: "Full-stack engineer",
      goal: "Skip the business busywork and ship",
      pain: "Strong on code, weak on GTM and finance",
    },
    {
      name: "Priya, the Program Lead",
      role: "Accelerator operations",
      goal: "Standardize cohort diligence at scale",
      pain: "Every founder submits wildly different quality",
    },
  ],
  mvpFeatures: [
    "Idea intake with guided prompts",
    "Five collaborating AI agents",
    "Expandable blueprint dashboard",
    "PDF & deck export",
    "Save & revisit blueprints",
  ],
  futureFeatures: [
    "Real-time collaboration",
    "Template marketplace",
    "Investor sharing links",
    "Financial model spreadsheets",
    "Integrations (Notion, Slack, CRM)",
  ],
  roadmap: [
    { phase: "Phase 1", title: "Core generation", items: "Intake, agents, dashboard, export" },
    { phase: "Phase 2", title: "Collaboration", items: "Workspaces, comments, sharing" },
    { phase: "Phase 3", title: "Ecosystem", items: "Marketplace, integrations, API" },
  ],
  userStories: [
    "As a founder, I can describe my idea and receive a full blueprint in minutes.",
    "As a founder, I can expand any section to see supporting detail.",
    "As a program lead, I can compare blueprints across a cohort.",
    "As a user, I can export my blueprint as a shareable PDF.",
  ],
  acceptanceCriteria: [
    "Blueprint generates in under 90 seconds for a typical idea.",
    "Every claim links back to its source agent.",
    "Exports preserve formatting and branding.",
  ],
  functionalRequirements: [
    "Idea intake form with validation",
    "Agent orchestration pipeline",
    "Section-level expand/collapse",
    "Export service",
  ],
  nonFunctionalRequirements: [
    "P95 generation latency < 90s",
    "99.9% uptime",
    "SOC 2-ready data handling",
    "WCAG AA accessibility",
  ],
  successMetrics: [
    { label: "Activation rate", value: "55%" },
    { label: "Blueprints / user", value: "3.4" },
    { label: "Free → Pro", value: "9%" },
    { label: "Weekly retention", value: "38%" },
  ],
  risks: ["Scope creep in MVP", "Overwhelming UI density", "Agent latency perception"],
}

/* ---------------- Technical Architecture ---------------- */
export const technicalArchitecture = {
  reason:
    "A serverless, edge-first architecture keeps latency low and scales elastically with bursty generation traffic, while a streaming agent pipeline gives users perceived speed as results arrive.",
  techStack: {
    Frontend: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Framer Motion"],
    Backend: ["Node.js", "Edge Functions", "AI SDK", "Zod"],
    Database: ["Postgres", "Drizzle ORM", "Redis"],
    AI: ["GPT-class LLM", "Embeddings", "Vector search", "Tool calling"],
    Deployment: ["Vercel", "CDN", "Object storage"],
  } as Record<string, string[]>,
  architectureDiagram: [
    { layer: "Client", desc: "Next.js app · streaming UI · optimistic state" },
    { layer: "Edge API", desc: "Auth, rate limiting, request routing" },
    { layer: "Agent Orchestrator", desc: "Sequences the 5 agents & shares context" },
    { layer: "LLM + Tools", desc: "Model calls, retrieval, structured output" },
    { layer: "Data", desc: "Postgres · Redis cache · Blob storage" },
  ],
  databaseTables: [
    { name: "users", columns: "id, email, plan, created_at" },
    { name: "blueprints", columns: "id, user_id, idea, industry, region, status" },
    { name: "sections", columns: "id, blueprint_id, agent, content, updated_at" },
    { name: "exports", columns: "id, blueprint_id, format, url" },
  ],
  apiEndpoints: [
    { method: "POST", path: "/api/blueprints", desc: "Start a new blueprint generation", auth: "Required" },
    { method: "GET", path: "/api/blueprints/:id", desc: "Fetch a blueprint & sections", auth: "Required" },
    { method: "POST", path: "/api/blueprints/:id/regenerate", desc: "Re-run a single agent", auth: "Required" },
    { method: "POST", path: "/api/exports", desc: "Generate a PDF / deck export", auth: "Required" },
    { method: "GET", path: "/api/health", desc: "Service health check", auth: "Public" },
  ],
  security: [
    "OAuth 2.0 + short-lived JWT sessions",
    "Row-level access scoping per user",
    "Encryption at rest and in transit",
    "Rate limiting & abuse detection",
  ],
  scalability: [
    "Stateless edge functions scale horizontally",
    "Redis caching for repeated agent context",
    "Queue-backed generation for burst traffic",
    "Tiered model routing to control cost",
  ],
  deploymentPipeline: [
    "Push to main triggers CI",
    "Type-check, lint & tests",
    "Preview deploy per PR",
    "Automatic production rollout + rollback",
  ],
}

/* ---------------- Finance & Growth ---------------- */
export const financeGrowth = {
  estimatedBudget: [
    { label: "Initial Budget", value: "$250K", icon: "wallet", note: "12-month runway target" },
    { label: "Monthly Burn", value: "$18K", icon: "flame", note: "Lean team of 4" },
    { label: "Runway", value: "13.8 mo", icon: "gauge", note: "At current burn" },
    { label: "CAC", value: "$42", icon: "users", note: "Blended acquisition" },
  ],
  operatingCosts: [
    { item: "Team & contractors", monthly: "$11,000", share: 61 },
    { item: "LLM & infrastructure", monthly: "$3,800", share: 21 },
    { item: "Tooling & software", monthly: "$1,400", share: 8 },
    { item: "Marketing", monthly: "$1,800", share: 10 },
  ],
  revenueModel:
    "Subscription-led revenue with three tiers (Free, Pro $29/mo, Teams $99/seat) plus usage-based export credits and accelerator enterprise agreements.",
  fundingStrategy: [
    { stage: "Pre-seed", amount: "$500K", use: "Product & first hires", status: "Active" },
    { stage: "Seed", amount: "$3M", use: "GTM & scaling", status: "Planned" },
    { stage: "Series A", amount: "$12M", use: "Expansion & enterprise", status: "Future" },
  ],
  breakEven: {
    month: "Month 19",
    customers: "1,850 paying users",
    mrr: "$62K MRR",
  },
  financialRisks: [
    { risk: "Inference cost spikes", severity: "High" },
    { risk: "Slow conversion to paid", severity: "Medium" },
    { risk: "Churn above target", severity: "Medium" },
  ],
  financialMetrics: [
    { label: "LTV", value: "$540" },
    { label: "LTV : CAC", value: "12.8x" },
    { label: "Gross margin", value: "78%" },
    { label: "Payback", value: "3.1 mo" },
  ],
  revenueProjection: [
    { month: "M3", mrr: 4 },
    { month: "M6", mrr: 12 },
    { month: "M9", mrr: 26 },
    { month: "M12", mrr: 44 },
    { month: "M15", mrr: 58 },
    { month: "M18", mrr: 79 },
  ],
}

/* ---------------- Execution Planner ---------------- */
export const executionPlanner = {
  executiveSummary:
    "A focused 18-month plan to launch LaunchLoop, reach product-market fit with founders and accelerators, and raise a seed round on the back of strong activation and retention.",
  businessSummary: "Freemium multi-agent planning SaaS targeting a $8.2B serviceable market, led by the accelerator channel.",
  productSummary: "Ship the core generation experience first, then layer collaboration and an ecosystem of templates and integrations.",
  technicalSummary: "Edge-first, streaming agent orchestration on Next.js and Postgres, built for low latency and cost control.",
  financialSummary: "Raise $500K pre-seed for a 14-month runway, targeting break-even around month 19 at $62K MRR.",
  roadmap: [
    { quarter: "Q1", title: "Foundation", desc: "MVP generation, intake, dashboard, export. Private beta.", status: "done" },
    { quarter: "Q2", title: "Launch", desc: "Public launch, accelerator pilots, activation tuning.", status: "active" },
    { quarter: "Q3", title: "Collaboration", desc: "Workspaces, sharing, comments, Pro tier scale.", status: "todo" },
    { quarter: "Q4", title: "Ecosystem", desc: "Template marketplace, integrations, seed raise.", status: "todo" },
  ],
  milestones: [
    { title: "500 beta blueprints generated", target: "Month 2" },
    { title: "First 3 accelerator pilots live", target: "Month 4" },
    { title: "1,000 paying users", target: "Month 9" },
    { title: "Break-even MRR", target: "Month 19" },
  ],
  priorityTasks: [
    { task: "Finalize activation onboarding", priority: "P0", owner: "Product" },
    { task: "Sign 3 accelerator partners", priority: "P0", owner: "Founder" },
    { task: "Ship PDF & deck export", priority: "P1", owner: "Eng" },
    { task: "Instrument analytics funnel", priority: "P1", owner: "Eng" },
    { task: "Launch content & SEO engine", priority: "P2", owner: "Growth" },
  ],
  goToMarket: [
    "Lead with accelerator partnerships for trust and volume",
    "Content & SEO around 'startup blueprint' intent",
    "Founder communities & indie hacker channels",
    "Referral loop with shareable blueprint links",
  ],
  riskAnalysis: [
    { risk: "Incumbent moves fast", severity: "High", mitigation: "Deep, defensible multi-agent workflow" },
    { risk: "Activation too low", severity: "Medium", mitigation: "Guided onboarding & templates" },
    { risk: "Cost per generation", severity: "Medium", mitigation: "Caching & tiered routing" },
  ],
  successMetrics: [
    { label: "Activation", value: "55%" },
    { label: "Paid users", value: "1,850" },
    { label: "NRR", value: "112%" },
    { label: "MRR @ M18", value: "$79K" },
  ],
  scalingStrategy: [
    "Automate accelerator onboarding into repeatable playbook",
    "Expand to adjacent segments (SMB, corporate innovation)",
    "Open API & marketplace to grow supply-side",
  ],
  finalRecommendations: [
    "Prioritize the accelerator channel to compound credibility and volume.",
    "Guard MVP scope — depth of insight beats breadth of features.",
    "Raise on activation & retention proof, not vanity signups.",
  ],
}

export const LOADING_STEPS: { id: AgentId; label: string; detail: string }[] = [
  { id: "business", label: "Business Agent", detail: "Researching market & competitors" },
  { id: "product", label: "Product Agent", detail: "Defining vision & MVP scope" },
  { id: "technical", label: "Technical Agent", detail: "Designing architecture & stack" },
  { id: "finance", label: "Finance Agent", detail: "Modeling budget & revenue" },
  { id: "planner", label: "Planner Agent", detail: "Assembling execution roadmap" },
]
