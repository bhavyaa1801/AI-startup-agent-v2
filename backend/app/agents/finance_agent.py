from app.agents.base import BaseAgent
from app.models.state import WorkflowState


class FinanceAgent(BaseAgent):
    """
    Generates the financial plan for the startup.
    """

    def __init__(self, gemini):
        self.gemini = gemini

    def run(self, state: WorkflowState) -> WorkflowState:

        prompt = f"""
You are a Senior Startup Finance Consultant.

Analyze the following startup and prepare a complete financial plan.

Startup Idea:
{state.idea}

Industry:
{state.industry}

Target Region:
{state.target_region}

Business Analysis:
{state.business}

Product Plan:
{state.product}

Technical Plan:
{state.technical}

Return ONLY valid JSON in the following format:

{{
    "estimated_budget": {{
        "development": "",
        "marketing": "",
        "operations": "",
        "legal": ""
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
        "expected_roi": "",
        "gross_margin": "",
        "first_year_customers": ""
    }}
}}
"""

        state.finance = self.gemini.generate(prompt)

        return state