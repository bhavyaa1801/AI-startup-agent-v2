const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

export interface GenerateBlueprintRequest {
  idea: string;
  industry: string;
  target_region: string;
}

export async function generateBlueprint(
  data: GenerateBlueprintRequest
) {
  const response = await fetch(`${API_URL}/generate-blueprint`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error("Failed to generate blueprint");
  }

  return response.json();
}