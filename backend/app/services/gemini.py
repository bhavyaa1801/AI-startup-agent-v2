import json
from typing import Optional, Type

from google import genai
from google.genai import types

from app.core.config import settings


class GeminiService:
    """
    Shared Gemini service used by all AI agents.
    """

    def __init__(self):
        self.client = genai.Client(
            api_key=settings.GEMINI_API_KEY
        )
        self.model = settings.MODEL_NAME

    def generate(self, prompt: str, schema: Optional[type] = None) -> dict:
        """
        Sends a prompt to Gemini and returns parsed JSON.
        """

        config = types.GenerateContentConfig(
            response_mime_type="application/json",
            temperature=0.3,
        )

        if schema:
            config.response_schema = schema

        try:
            response = self.client.models.generate_content(
                model=self.model,
                contents=prompt,
                config=config,
            )

            return json.loads(response.text)

        except json.JSONDecodeError:
            raise ValueError(
                f"Gemini returned invalid JSON:\n{response.text}"
            )

        except Exception as e:
            raise RuntimeError(
                f"Gemini API Error: {e}"
            )

gemini = GeminiService()