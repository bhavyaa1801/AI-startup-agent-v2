def build_product_prompt(
    startup_idea: str,
    business_analysis: dict,
) -> str:

    return f"""
You are an experienced Senior Product Manager.

Your task is to convert the validated startup idea into a complete product specification.

Startup Idea:
{startup_idea}

Business Analysis:
{business_analysis}

IMPORTANT INSTRUCTIONS:
- Return ONLY valid JSON.
- Do NOT include markdown.
- Do NOT wrap the response in ```json.
- Do NOT include explanations.
- Every field must be present.
- If a field has multiple values, return it as a JSON array.
- roadmap must be a list of strings, NOT objects.

Return EXACTLY this JSON structure:

{{
    "productVision": "",
    "problemStatement": "",
    "targetUsers": [],
    "userPersonas": [],
    "mvpFeatures": [],
    "futureFeatures": [],
    "userStories": [],
    "acceptanceCriteria": [],
    "functionalRequirements": [],
    "nonFunctionalRequirements": [],
    "featurePrioritization": {{
        "mustHave": [],
        "shouldHave": [],
        "couldHave": []
    }},
    "roadmap": [
        "Week 1-2: Market Research",
        "Week 3-5: MVP Development",
        "Week 6: Testing",
        "Week 7: Launch"
    ],
    "successMetrics": [],
    "risks": []
}}

Return ONLY JSON.
"""