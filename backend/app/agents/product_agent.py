from app.prompts.product_prompt import build_product_prompt
from app.services.gemini import gemini
from app.models.ai_schemas import ProductOutput


class ProductAgent:

    def run(self, state):

        prompt = build_product_prompt(
            state.idea,
            state.business
        )

        product = gemini.generate(
            prompt,
            ProductOutput
        )
        state.product = product

        return state