def build_product_prompt(
    startup_idea: str,
    business_analysis: dict,
) -> str:

    return f"""
You are an experienced Senior Product Manager.

Your task is to convert the validated startup idea into a product specification.

Startup Idea:

{startup_idea}

Business Analysis:

{business_analysis}

Generate ONLY valid JSON.

Return the following format exactly.

{{
    "productVision": "",
    "mvpFeatures": [],
    "futureFeatures": [],
    "userStories": [],
    "featurePrioritization": {{
        "mustHave": [],
        "shouldHave": [],
        "couldHave": []
    }},
    "roadmap": [],
    "functionalRequirements": [],
    "nonFunctionalRequirements": []
}}

Return ONLY JSON.
"""