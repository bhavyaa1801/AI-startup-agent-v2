from app.agents.base import BaseAgent
from app.models.state import WorkflowState


class TechnicalAgent(BaseAgent):
    """
    Generates the technical implementation plan for the startup.
    """

    NON_TECH_KEYWORDS = [
        "restaurant",
        "coffee",
        "cafe",
        "bakery",
        "clothing",
        "fashion",
        "salon",
        "gym",
        "spa",
        "grocery",
    ]

    def __init__(self, gemini):
        self.gemini = gemini

    def run(self, state: WorkflowState) -> WorkflowState:

        idea = state.idea.lower()

        if any(keyword in idea for keyword in self.NON_TECH_KEYWORDS):

            state.technical = {
                "technical_required": False,
                "reason": "This business does not require custom software initially.",
                "recommendation": [
                    "Use Shopify or WooCommerce.",
                    "Use an existing POS system.",
                    "Use Google Workspace.",
                    "Focus on business growth."
                ],
                "tech_stack": [],
                "architecture": [],
                "database": [],
                "apis": [],
                "deployment": [],
                "security": [],
                "scalability": []
            }

            return state

        prompt = f"""
You are a Senior Software Architect.

Analyze the following startup and recommend the best technical implementation.

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

Return ONLY valid JSON in the following format:

{{
    "technical_required": true,
    "tech_stack": ["..."],
    "architecture": ["..."],
    "database": ["..."],
    "apis": ["..."],
    "deployment": ["..."],
    "security": ["..."],
    "scalability": ["..."]
}}
"""

        state.technical = self.gemini.generate(prompt)

        return state