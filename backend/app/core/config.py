import os
from dotenv import load_dotenv

load_dotenv()


class Settings:
    GROQ_API_KEY: str | None = os.getenv("GROQ_API_KEY")
    MODEL_NAME: str = "llama-3.3-70b-versatile"


settings = Settings()