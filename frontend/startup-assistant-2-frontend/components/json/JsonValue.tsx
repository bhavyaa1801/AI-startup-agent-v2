"use client";

import { BadgeCheck, BadgeX, Hash, Type } from "lucide-react";

export interface JsonValueProps {
  title?: string;
  value: unknown;
}

function formatTitle(title: string) {
  return title
    .replace(/_/g, " ")
    .replace(/([A-Z])/g, " $1")
    .replace(/\s+/g, " ")
    .trim()
    .replace(/\b\w/g, (c) => c.toUpperCase());
}

export function JsonValue({
  title,
  value,
}: JsonValueProps) {
  // ---------- STRING ----------
  if (typeof value === "string") {
    return (
      <div className="space-y-2">
        {title && (
          <div className="flex items-center gap-2 text-sm font-semibold text-foreground">
            <Type className="h-4 w-4 text-primary" />
            {formatTitle(title)}
          </div>
        )}

        <div className="rounded-xl border border-border bg-background/40 p-4">
          <p className="whitespace-pre-wrap leading-7 text-muted-foreground">
            {value}
          </p>
        </div>
      </div>
    );
  }

  // ---------- NUMBER ----------
  if (typeof value === "number") {
    return (
      <div className="rounded-xl border border-border bg-background/40 p-5">
        {title && (
          <p className="mb-2 text-sm font-medium text-muted-foreground">
            {formatTitle(title)}
          </p>
        )}

        <div className="flex items-center gap-2">
          <Hash className="h-5 w-5 text-primary" />
          <span className="text-3xl font-bold">
            {value}
          </span>
        </div>
      </div>
    );
  }

  // ---------- BOOLEAN ----------
  if (typeof value === "boolean") {
    return (
      <div className="rounded-xl border border-border bg-background/40 p-4">
        {title && (
          <p className="mb-3 text-sm font-medium text-muted-foreground">
            {formatTitle(title)}
          </p>
        )}

        {value ? (
          <span className="inline-flex items-center gap-2 rounded-full bg-emerald-500/15 px-3 py-1 text-sm font-medium text-emerald-400">
            <BadgeCheck className="h-4 w-4" />
            Yes
          </span>
        ) : (
          <span className="inline-flex items-center gap-2 rounded-full bg-red-500/15 px-3 py-1 text-sm font-medium text-red-400">
            <BadgeX className="h-4 w-4" />
            No
          </span>
        )}
      </div>
    );
  }

  return null;
}