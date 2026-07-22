"use client";

import { FolderTree } from "lucide-react";
import { JsonRenderer } from "./JsonRenderer";

interface JsonObjectProps {
  title?: string;
  value: Record<string, unknown>;
}

function formatTitle(key: string) {
  return key
    .replace(/_/g, " ")
    .replace(/([A-Z])/g, " $1")
    .replace(/\s+/g, " ")
    .trim()
    .replace(/\b\w/g, (c) => c.toUpperCase());
}

export function JsonObject({
  title,
  value,
}: JsonObjectProps) {
  const entries = Object.entries(value).filter(
    ([, v]) => v !== null && v !== undefined
  );

  if (!entries.length) return null;

  return (
    <div className="space-y-6">

      {title && (
        <div className="flex items-center gap-3 border-b border-border pb-3">
          <div className="rounded-lg bg-primary/10 p-2">
            <FolderTree className="h-5 w-5 text-primary" />
          </div>

          <h2 className="text-xl font-semibold tracking-tight">
            {formatTitle(title)}
          </h2>
        </div>
      )}

      <div className="grid gap-5">
        {entries.map(([key, val]) => (
          <div
            key={key}
            className="
              rounded-2xl
              border
              border-border
              bg-background/40
              backdrop-blur-md
              p-5
              shadow-sm
              transition-all
              duration-300
              hover:border-primary/40
              hover:shadow-lg
              hover:shadow-primary/10
            "
          >
            <JsonRenderer
              title={key}
              value={val}
            />
          </div>
        ))}
      </div>

    </div>
  );
}