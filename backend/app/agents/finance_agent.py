from app.agents.base import BaseAgent
from app.models.state import WorkflowState
from app.models.ai_schemas import FinanceOutput
from app.prompts.finance_prompt import build_finance_prompt
from app.services.groq import groq


class FinanceAgent(BaseAgent):
    """
    Generates the financial plan for the startup.
    """

    def run(self, state: WorkflowState) -> WorkflowState:

        prompt = build_finance_prompt(
            startup_idea=state.idea,
            business_analysis=state.business,
            product_plan=state.product,
            technical_plan=state.technical,
        )

        response = groq.generate(prompt)

        finance = FinanceOutput(**response)

        state.finance = finance.model_dump()

        return state