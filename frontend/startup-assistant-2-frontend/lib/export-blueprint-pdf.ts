import type { jsPDF } from "jspdf"

type Blueprint = Record<string, unknown>

type AgentSection = {
  key: string
  title: string
  subtitle: string
  color: [number, number, number]
}

const AGENT_SECTIONS: AgentSection[] = [
  {
    key: "business",
    title: "Business and Market Research",
    subtitle: "Market opportunity, customers, competition, and validation",
    color: [124, 92, 255],
  },
  {
    key: "product",
    title: "Product Planning",
    subtitle: "Product strategy, features, and customer experience",
    color: [65, 105, 225],
  },
  {
    key: "technical",
    title: "Technical Architecture",
    subtitle: "Technology stack, architecture, security, and deployment",
    color: [20, 184, 166],
  },
  {
    key: "finance",
    title: "Finance and Growth",
    subtitle: "Costs, revenue, funding, and financial strategy",
    color: [234, 179, 8],
  },
  {
    key: "planner",
    title: "Execution Planner",
    subtitle: "Roadmap, milestones, priorities, and success metrics",
    color: [236, 72, 153],
  },
]

export async function exportBlueprintPdf(
  blueprint: Blueprint,
): Promise<void> {
  if (!blueprint || typeof blueprint !== "object") {
    throw new Error("No blueprint data is available to export.")
  }

  const { jsPDF } = await import("jspdf")

  const document: jsPDF = new jsPDF({
    orientation: "portrait",
    unit: "mm",
    format: "a4",
    compress: true,
  })

  const pageWidth = document.internal.pageSize.getWidth()
  const pageHeight = document.internal.pageSize.getHeight()

  const leftMargin = 18
  const rightMargin = 18
  const contentWidth = pageWidth - leftMargin - rightMargin
  const contentBottom = pageHeight - 20

  let y = 30
  let currentSection = "Startup Blueprint"
  let currentColor: [number, number, number] = [124, 92, 255]

  const business = asRecord(blueprint.business)
  const inputSummary = asRecord(business.input_summary)

  const startupIdea =
    valueToText(inputSummary.idea) || "Startup Blueprint"

  const industry =
    valueToText(inputSummary.industry_provided) ||
    valueToText(inputSummary.industry) ||
    "Not provided"

  const region =
    valueToText(inputSummary.target_region) ||
    "Not provided"

  const generatedDate = new Intl.DateTimeFormat("en-IN", {
    dateStyle: "long",
    timeStyle: "short",
  }).format(new Date())

  function drawPageHeader(): void {
    document.setFillColor(
      currentColor[0],
      currentColor[1],
      currentColor[2],
    )

    document.rect(
      0,
      0,
      pageWidth,
      4,
      "F",
    )

    document.setFont("helvetica", "bold")
    document.setFontSize(9)
    document.setTextColor(
      currentColor[0],
      currentColor[1],
      currentColor[2],
    )

    document.text(
      "AI STARTUP BLUEPRINT",
      leftMargin,
      13,
    )

    document.setFont("helvetica", "normal")
    document.setFontSize(8)
    document.setTextColor(100, 100, 115)

    document.text(
      currentSection,
      pageWidth - rightMargin,
      13,
      {
        align: "right",
      },
    )

    document.setDrawColor(225, 225, 235)

    document.line(
      leftMargin,
      17,
      pageWidth - rightMargin,
      17,
    )
  }

  function addContentPage(): void {
    document.addPage()

    drawPageHeader()

    y = 27
  }

  function ensureSpace(
    requiredHeight: number,
  ): void {
    if (y + requiredHeight > contentBottom) {
      addContentPage()
    }
  }

  function writeWrappedText(
    text: string,
    options: {
      indent?: number
      fontSize?: number
      bold?: boolean
      color?: [number, number, number]
      prefix?: string
      spacingAfter?: number
    } = {},
  ): void {
    const {
      indent = 0,
      fontSize = 9.5,
      bold = false,
      color = [55, 55, 70],
      prefix = "",
      spacingAfter = 2,
    } = options

    const x = leftMargin + indent
    const availableWidth =
      contentWidth - indent

    document.setFont(
      "helvetica",
      bold ? "bold" : "normal",
    )

    document.setFontSize(fontSize)

    document.setTextColor(
      color[0],
      color[1],
      color[2],
    )

    const printableText =
      `${prefix}${text}`.trim() || "Not provided"

    const lines = document.splitTextToSize(
      printableText,
      availableWidth,
    ) as string[]

    const lineHeight = Math.max(
      4.5,
      fontSize * 0.48,
    )

    for (const line of lines) {
      ensureSpace(lineHeight + 1)

      document.text(
        line,
        x,
        y,
      )

      y += lineHeight
    }

    y += spacingAfter
  }

  function writeHeading(
    text: string,
    depth: number,
  ): void {
    if (!text.trim()) {
      return
    }

    const headingStyles = [
      {
        size: 15,
        spacingBefore: 7,
        spacingAfter: 4,
        color: currentColor,
      },
      {
        size: 12,
        spacingBefore: 5,
        spacingAfter: 3,
        color: [35, 35, 50] as [number, number, number],
      },
      {
        size: 10,
        spacingBefore: 3,
        spacingAfter: 2,
        color: [70, 70, 85] as [number, number, number],
      },
    ]

    const style =
      headingStyles[Math.min(depth, 2)]

    ensureSpace(
      style.spacingBefore +
      style.size * 0.6 +
      style.spacingAfter,
    )

    y += style.spacingBefore

    document.setFont(
      "helvetica",
      "bold",
    )

    document.setFontSize(style.size)

    document.setTextColor(
      style.color[0],
      style.color[1],
      style.color[2],
    )

    const lines = document.splitTextToSize(
      formatKey(text),
      contentWidth - depth * 4,
    ) as string[]

    for (const line of lines) {
      ensureSpace(style.size * 0.5 + 1)

      document.text(
        line,
        leftMargin + depth * 4,
        y,
      )

      y += style.size * 0.48
    }

    y += style.spacingAfter
  }

  function renderValue(
    key: string,
    value: unknown,
    depth = 0,
  ): void {
    if (
      value === null ||
      value === undefined ||
      value === ""
    ) {
      if (key) {
        writeWrappedText(
          `${formatKey(key)}: Not provided`,
          {
            indent: depth * 4,
          },
        )
      }

      return
    }

    if (Array.isArray(value)) {
      if (key) {
        writeHeading(key, depth)
      }

      if (value.length === 0) {
        writeWrappedText(
          "No information provided.",
          {
            indent: (depth + 1) * 4,
            color: [110, 110, 125],
          },
        )

        return
      }

      value.forEach((item, index) => {
        if (isPrimitive(item)) {
          writeWrappedText(
            valueToText(item),
            {
              indent: (depth + 1) * 4,
              prefix: "- ",
            },
          )

          return
        }

        const itemRecord = asRecord(item)

        const itemTitle =
          valueToText(itemRecord.name) ||
          valueToText(itemRecord.title) ||
          valueToText(itemRecord.risk) ||
          valueToText(itemRecord.milestone) ||
          `Item ${index + 1}`

        writeHeading(
          itemTitle,
          Math.min(depth + 1, 2),
        )

        Object.entries(itemRecord).forEach(
          ([childKey, childValue]) => {
            renderValue(
              childKey,
              childValue,
              depth + 2,
            )
          },
        )
      })

      return
    }

    if (typeof value === "object") {
      if (key) {
        writeHeading(key, depth)
      }

      const entries = Object.entries(
        value as Record<string, unknown>,
      )

      if (entries.length === 0) {
        writeWrappedText(
          "No information provided.",
          {
            indent: (depth + 1) * 4,
            color: [110, 110, 125],
          },
        )

        return
      }

      entries.forEach(
        ([childKey, childValue]) => {
          renderValue(
            childKey,
            childValue,
            key ? depth + 1 : depth,
          )
        },
      )

      return
    }

    const label = key
      ? `${formatKey(key)}: `
      : ""

    writeWrappedText(
      `${label}${valueToText(value)}`,
      {
        indent: depth * 4,
        bold: false,
      },
    )
  }

  // -------------------------------------------------
  // PDF COVER
  // -------------------------------------------------

  document.setFillColor(10, 10, 18)

  document.rect(
    0,
    0,
    pageWidth,
    pageHeight,
    "F",
  )

  document.setFillColor(124, 92, 255)

  document.roundedRect(
    18,
    22,
    48,
    9,
    4,
    4,
    "F",
  )

  document.setFont("helvetica", "bold")
  document.setFontSize(8)
  document.setTextColor(255, 255, 255)

  document.text(
    "AI STARTUP ASSISTANT",
    42,
    27.8,
    {
      align: "center",
    },
  )

  document.setFont("helvetica", "bold")
  document.setFontSize(28)
  document.setTextColor(255, 255, 255)

  document.text(
    "Investor-Ready",
    pageWidth / 2,
    52,
    {
      align: "center",
    },
  )

  document.setTextColor(124, 92, 255)

  document.text(
    "Startup Blueprint",
    pageWidth / 2,
    64,
    {
      align: "center",
    },
  )

  document.setFont("helvetica", "normal")
  document.setFontSize(12)
  document.setTextColor(215, 215, 225)

  const ideaLines = document.splitTextToSize(
    startupIdea,
    165,
  ) as string[]

  document.text(
    ideaLines,
    pageWidth / 2,
    82,
    {
      align: "center",
    },
  )

  const metadataY =
    103 + ideaLines.length * 5

  document.setFillColor(23, 23, 34)

  document.roundedRect(
    24,
    metadataY,
    pageWidth - 48,
    48,
    5,
    5,
    "F",
  )

  document.setFontSize(9)
  document.setTextColor(145, 145, 165)

  document.text(
    "INDUSTRY",
    34,
    metadataY + 12,
  )

  document.text(
    "TARGET REGION",
    34,
    metadataY + 27,
  )

  document.text(
    "GENERATED",
    34,
    metadataY + 42,
  )

  document.setFont("helvetica", "bold")
  document.setTextColor(245, 245, 250)

  document.text(
    industry,
    80,
    metadataY + 12,
  )

  document.text(
    region,
    80,
    metadataY + 27,
  )

  document.text(
    generatedDate,
    80,
    metadataY + 42,
  )

  document.setFont("helvetica", "normal")
  document.setFontSize(9)
  document.setTextColor(155, 155, 175)

  document.text(
    "Consolidated analysis generated by five collaborating AI agents",
    pageWidth / 2,
    pageHeight - 25,
    {
      align: "center",
    },
  )

  // -------------------------------------------------
  // AGENT SECTIONS
  // -------------------------------------------------

  for (const section of AGENT_SECTIONS) {
    currentSection = section.title
    currentColor = section.color

    addContentPage()

    document.setFont("helvetica", "bold")
    document.setFontSize(21)

    document.setTextColor(
      section.color[0],
      section.color[1],
      section.color[2],
    )

    document.text(
      section.title,
      leftMargin,
      y,
    )

    y += 7

    writeWrappedText(
      section.subtitle,
      {
        fontSize: 10,
        color: [105, 105, 120],
        spacingAfter: 6,
      },
    )

    const sectionData = blueprint[section.key]

    if (
      sectionData === null ||
      sectionData === undefined
    ) {
      writeWrappedText(
        "This agent did not return any data.",
        {
          color: [150, 70, 70],
        },
      )

      continue
    }

    renderValue(
      "",
      sectionData,
      0,
    )
  }

  // -------------------------------------------------
  // FOOTERS AND PAGE NUMBERS
  // -------------------------------------------------

  const totalPages =
    document.getNumberOfPages()

  for (
    let pageNumber = 1;
    pageNumber <= totalPages;
    pageNumber += 1
  ) {
    document.setPage(pageNumber)

    if (pageNumber === 1) {
      document.setFont("helvetica", "normal")
      document.setFontSize(8)
      document.setTextColor(130, 130, 150)

      document.text(
        `Page ${pageNumber} of ${totalPages}`,
        pageWidth - rightMargin,
        pageHeight - 10,
        {
          align: "right",
        },
      )

      continue
    }

    document.setDrawColor(225, 225, 235)

    document.line(
      leftMargin,
      pageHeight - 15,
      pageWidth - rightMargin,
      pageHeight - 15,
    )

    document.setFont("helvetica", "normal")
    document.setFontSize(8)
    document.setTextColor(110, 110, 125)

    document.text(
      "AI Startup Assistant",
      leftMargin,
      pageHeight - 9,
    )

    document.text(
      `Page ${pageNumber} of ${totalPages}`,
      pageWidth - rightMargin,
      pageHeight - 9,
      {
        align: "right",
      },
    )
  }

  document.setProperties({
    title: `${startupIdea} - Startup Blueprint`,
    subject: "Consolidated five-agent startup blueprint",
    author: "AI Startup Assistant",
    creator: "AI Startup Assistant",
  })

  document.save(
    `${createSafeFilename(startupIdea)}-startup-blueprint.pdf`,
  )
}

function asRecord(
  value: unknown,
): Record<string, unknown> {
  if (
    value &&
    typeof value === "object" &&
    !Array.isArray(value)
  ) {
    return value as Record<string, unknown>
  }

  return {}
}

function isPrimitive(
  value: unknown,
): boolean {
  return (
    value === null ||
    value === undefined ||
    typeof value === "string" ||
    typeof value === "number" ||
    typeof value === "boolean"
  )
}

function valueToText(
  value: unknown,
): string {
  if (
    value === null ||
    value === undefined
  ) {
    return ""
  }

  if (typeof value === "boolean") {
    return value ? "Yes" : "No"
  }

  if (
    typeof value === "string" ||
    typeof value === "number"
  ) {
    return String(value)
  }

  return ""
}

function formatKey(
  key: string,
): string {
  const formatted = key
    .replace(/([a-z0-9])([A-Z])/g, "$1 $2")
    .replace(/_/g, " ")
    .replace(/\s+/g, " ")
    .trim()

  if (!formatted) {
    return ""
  }

  return formatted
    .split(" ")
    .map((word) => {
      if (
        ["AI", "API", "MVP", "TAM", "SAM", "SOM", "ROI"].includes(
          word.toUpperCase(),
        )
      ) {
        return word.toUpperCase()
      }

      return (
        word.charAt(0).toUpperCase() +
        word.slice(1)
      )
    })
    .join(" ")
}

function createSafeFilename(
  idea: string,
): string {
  const safeName = idea
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 60)

  return safeName || "startup"
}