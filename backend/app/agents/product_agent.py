from app.prompts.product_prompt import build_product_prompt
from app.models.ai_schemas import ProductOutput

from app.services.groq import groq
class ProductAgent:

    def run(self, state):

        prompt = build_product_prompt(
            state.idea,
            state.business
        )

        response = groq.generate(prompt)

        product = ProductOutput(**response)
        state.product = product.model_dump()

        return state