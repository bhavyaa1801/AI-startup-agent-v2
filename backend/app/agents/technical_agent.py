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

        # Businesses that don't require custom software
        if any(keyword in idea for keyword in self.NON_TECH_KEYWORDS):

            state.technical = {
                "technical_required": False,
                "reason": "This business can operate efficiently using existing software solutions without building a custom application.",
                "tech_stack": {
                    "frontend": [],
                    "backend": [],
                    "database": [],
                    "ai": [],
                    "deployment": []
                },
                "architecture": [],
                "database_tables": [],
                "apis": [],
                "security": [],
                "scalability": [],
                "deployment": {
                    "frontend": "",
                    "backend": "",
                    "database": ""
                }
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

Recommend a modern, scalable, production-ready architecture.
Recommend technologies that are practical, modern, scalable, and appropriate for the startup's budget and complexity. Avoid unnecessary technologies.
Return ONLY valid JSON in the following format:

{{
  "technical_required": true,
  "reason": "",
  "tech_stack": {{
    "frontend": [],
    "backend": [],
    "database": [],
    "ai": [],
    "deployment": []
  }},
  "architecture": [],
  "database_tables": [],
  "apis": [
    {{
      "method": "",
      "endpoint": "",
      "purpose": ""
    }}
  ],
  "security": [],
  "scalability": [],
  "deployment": {{
    "frontend": "",
    "backend": "",
    "database": ""
  }}
}}
"""

        state.technical = self.gemini.generate(prompt)

        return state