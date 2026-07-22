"use client";

import { List, Boxes } from "lucide-react";
import { JsonRenderer } from "./JsonRenderer";

interface JsonArrayProps {
  title?: string;
  value: unknown[];
}

function formatTitle(title: string) {
  return title
    .replace(/_/g, " ")
    .replace(/([A-Z])/g, " $1")
    .replace(/\s+/g, " ")
    .trim()
    .replace(/\b\w/g, (c) => c.toUpperCase());
}

export function JsonArray({
  title,
  value,
}: JsonArrayProps) {
  if (!value.length) return null;

  const first = value[0];

  // -------------------------------------
  // Array of strings / numbers
  // -------------------------------------
  if (
    typeof first === "string" ||
    typeof first === "number"
  ) {
    return (
      <div className="space-y-3">
        {title && (
          <div className="flex items-center gap-2 text-sm font-semibold text-foreground">
            <List className="h-4 w-4 text-primary" />
            {formatTitle(title)}
          </div>
        )}

        <div className="rounded-xl border border-border bg-background/40 p-4">
          <ul className="space-y-2">
            {value.map((item, index) => (
              <li
                key={index}
                className="flex items-start gap-3"
              >
                <span className="mt-2 h-2 w-2 rounded-full bg-primary shrink-0" />

                <span className="text-sm leading-6 text-muted-foreground">
                  {String(item)}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    );
  }

  // -------------------------------------
  // Array of objects
  // -------------------------------------
  if (typeof first === "object") {
    return (
      <div className="space-y-3">
        {title && (
          <div className="flex items-center gap-2 text-sm font-semibold text-foreground">
            <Boxes className="h-4 w-4 text-primary" />
            {formatTitle(title)}
          </div>
        )}

        <div className="grid gap-4">
          {value.map((item, index) => (
            <div
              key={index}
              className="rounded-2xl border border-border bg-background/40 p-5 shadow-sm"
            >
              <JsonRenderer value={item} />
            </div>
          ))}
        </div>
      </div>
    );
  }

  // -------------------------------------
  // Mixed arrays
  // -------------------------------------
  return (
    <div className="space-y-3">
      {title && (
        <div className="text-sm font-semibold text-foreground">
          {formatTitle(title)}
        </div>
      )}

      <div className="space-y-3">
        {value.map((item, index) => (
          <JsonRenderer
            key={index}
            value={item}
          />
        ))}
      </div>
    </div>
  );
}