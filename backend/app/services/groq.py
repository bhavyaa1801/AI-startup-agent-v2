import os
import json
from dotenv import load_dotenv
from groq import Groq

load_dotenv()


class GroqService:

    def __init__(self):
        api_key = os.getenv("GROQ_API_KEY")
        if not api_key:
            raise ValueError("GROQ_API_KEY is not set in environment or .env file.")
        self.client = Groq(api_key=api_key)

    def generate(self, prompt: str) -> dict:
        response = self.client.chat.completions.create(
            model="llama-3.3-70b-versatile",
            messages=[
                {
                    "role": "user",
                    "content": prompt
                }
            ],
            temperature=0.3,
            response_format={"type": "json_object"},
        )

        text = response.choices[0].message.content.strip()

        if text.startswith("```"):
            text = (
                text.replace("```json", "")
                .replace("```", "")
                .strip()
            )

        try:
            return json.loads(text)
        except json.JSONDecodeError:
            raise ValueError(
                f"Groq did not return valid JSON:\n{text}"
            )


groq = GroqService()