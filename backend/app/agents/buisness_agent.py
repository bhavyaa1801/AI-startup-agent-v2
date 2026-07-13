from app.agents.base import BaseAgent
from app.models.state import WorkflowState


class BusinessAgent(BaseAgent):
    """
    Generates a business and market analysis for the startup.
    Dummy implementation.
    """

    def run(self, state: WorkflowState) -> WorkflowState:

        state.business = {
            "market_size": "Large",
            "target_customers": [
                "Students",
                "Startups",
                "Small Businesses"
            ],
            "competitors": [
                "Competitor A",
                "Competitor B",
                "Competitor C"
            ],
            "unique_value_proposition": "AI-powered startup planning assistant",
            "business_model": "B2B SaaS"
        }

        return state