from app.agents.base import BaseAgent
from app.models.state import WorkflowState


class FinanceAgent(BaseAgent):
    """
    Generates a financial blueprint for a startup including budget,
    costs, revenue model, funding strategy, and financial risks.
    """

    def run(self, state: WorkflowState) -> WorkflowState:

        state.finance = {
            "estimated_budget": {
                "development": "₹4,00,000",
                "marketing": "₹1,50,000",
                "operations": "₹50,000",
                "legal_and_registration": "₹30,000",
            },

            "monthly_operating_cost": {
                "hosting": "₹8,000",
                "database": "₹2,000",
                "ai_api": "₹10,000",
                "maintenance": "₹5,000"
            },

            "revenue_model": [
                "Freemium",
                "Premium Subscription",
                "Enterprise Licensing",
            ],

            "funding_strategy": [
                "Bootstrapping",
                "Angel Investors",
                "Government Startup Grants",
                "Venture Capital (Future Stage)",
            ],

            "break_even": "12-18 months",

            "financial_risks": [
                "High AI API costs",
                "Low customer conversion",
                "Competitive SaaS market",
                "Changing customer requirements",
            ],

            "financial_metrics": {
                "expected_gross_margin": "65-75%",
                "target_customers_first_year": "500+",
                "expected_roi": "18-24 months",
            },
        }

        return state