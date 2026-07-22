"use client";

import { JsonArray } from "./JsonArray";
import { JsonObject } from "./JsonObject";
import { JsonValue } from "./JsonValue";

export interface JsonRendererProps {
  value: unknown;
  title?: string;
}

export function JsonRenderer({
  value,
  title,
}: JsonRendererProps) {
  // null / undefined
  if (value === null || value === undefined) {
    return null;
  }

  // Array
  if (Array.isArray(value)) {
    return <JsonArray value={value} title={title} />;
  }

  // Object
  if (typeof value === "object") {
    return (
      <JsonObject
        value={value as Record<string, unknown>}
        title={title}
      />
    );
  }

  // Primitive
  return (
    <JsonValue
      value={value}
      title={title}
    />
  );
}