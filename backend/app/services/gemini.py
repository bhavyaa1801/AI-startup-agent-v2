import json
from typing import Optional

from google import genai
from google.genai import types

from app.core.config import settings


class GeminiService:
    """
    Shared Gemini client for all agents.
    """

    def __init__(self):
        self.client = genai.Client(
            api_key=settings.GEMINI_API_KEY
        )
        self.model = settings.MODEL_NAME

    def generate(self, prompt: str, schema: Optional[type] = None) -> dict:
        """
        Sends a prompt to Gemini and returns parsed JSON.

        Args:
            prompt: The prompt to send to Gemini.
            schema: Optional Pydantic model used as the response schema.

        Returns:
            Parsed JSON as a Python dictionary.
        """

        config = types.GenerateContentConfig(
            response_mime_type="application/json",
            temperature=0.3,
        )

        if schema is not None:
            config.response_schema = schema

        response = self.client.models.generate_content(
            model=self.model,
            contents=prompt,
            config=config,
        )

        text = response.text.strip()

        try:
            return json.loads(text)

        except json.JSONDecodeError:
            raise ValueError(
                f"Gemini did not return valid JSON:\n{text}"
            )