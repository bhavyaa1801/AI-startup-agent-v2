def build_finance_prompt(
    startup_idea: str,
    business_analysis: dict,
    product_plan: dict,
    technical_plan: dict,
) -> str:

    return f"""
You are an experienced Senior Startup Financial Consultant.

Your task is to prepare a realistic and comprehensive financial plan for the following startup.

Startup Idea:
{startup_idea}

Business Analysis:
{business_analysis}

Product Plan:
{product_plan}

Technical Plan:
{technical_plan}

Analyze the startup and estimate:

• One-time startup budget
• Monthly operating expenses
• Suitable revenue model(s)
• Funding strategy
• Expected break-even period
• Major financial risks
• Key financial metrics including expected gross margin, first-year customer target, and expected ROI

Base your estimates on the startup idea, industry, product requirements, and technical implementation.

Do not include markdown, explanations, comments, or code fences.

Return ONLY valid JSON in the following format:

{{
    "estimated_budget": {{
        "development": "",
        "marketing": "",
        "operations": "",
        "legal_and_registration": ""
    }},
    "monthly_operating_cost": {{
        "hosting": "",
        "database": "",
        "ai_api": "",
        "maintenance": ""
    }},
    "revenue_model": [],
    "funding_strategy": [],
    "break_even": "",
    "financial_risks": [],
    "financial_metrics": {{
        "expected_gross_margin": "",
        "target_customers_first_year": "",
        "expected_roi": ""
    }}
}}

Return ONLY JSON.
"""