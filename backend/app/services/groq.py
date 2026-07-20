from groq import Groq
import os
import json
from dotenv import load_dotenv

load_dotenv()

class GroqService:
    def __init__(self):
        self.client = Groq(api_key=os.getenv("GROQ_API_KEY"))

    def generate(self, prompt: str):

        response = self.client.chat.completions.create(
            model="llama-3.3-70b-versatile",
            messages=[
                {
                    "role": "user",
                    "content": prompt
                }
            ],
            temperature=0.3
        )

        content = response.choices[0].message.content

        return json.loads(content)


groq = GroqService()