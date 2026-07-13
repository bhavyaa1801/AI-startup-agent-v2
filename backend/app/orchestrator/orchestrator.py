from app.agents.buisness_agent import BusinessAgent
from app.agents.product_agent import ProductAgent
from app.agents.technical_agent import TechnicalAgent
from app.agents.finance_agent import FinanceAgent
from app.agents.planner_agent import PlannerAgent

from app.models.state import WorkflowState
from app.services.gemini import GeminiService


class StartupOrchestrator:
    """
    Executes all startup planning agents in sequence.
    """

    def __init__(self):
        gemini = GeminiService()
        self.agents = [
            BusinessAgent(),
            ProductAgent(),
            TechnicalAgent(),
            FinanceAgent(),
            PlannerAgent(),
        ]

    def run(self, state: WorkflowState) -> WorkflowState:

        for agent in self.agents:

            print(f"Running {agent.__class__.__name__}")

            state = agent.run(state)

            print(f"{agent.__class__.__name__} completed")

        return state