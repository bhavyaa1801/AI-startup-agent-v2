from app.agents.base import BaseAgent
from app.models.state import WorkflowState


class ProductAgent(BaseAgent):
    """
    Generates a product blueprint.
    Dummy implementation.
    """

    def run(self, state: WorkflowState) -> WorkflowState:

        state.product = {
            "product_name": "AI Startup Assistant",
            "mvp_features": [
                "Idea Validation",
                "Market Research",
                "Business Blueprint",
                "Financial Planning",
                "Technical Roadmap"
            ],
            "future_features": [
                "Pitch Deck Generator",
                "Investor Matching",
                "Startup Analytics"
            ],
            "platforms": [
                "Web",
                "Mobile (Future)"
            ]
        }

        return state