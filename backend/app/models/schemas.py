# api schema define ke liye - what fe send or recive

from pydantic import BaseModel
from typing import Any


class StartupRequest(BaseModel):
    idea: str
    industry: str | None = None
    target_region: str | None = None


class StartupResponse(BaseModel):
    business: dict[str, Any]
    product: dict[str, Any]
    technical: dict[str, Any]
    finance: dict[str, Any]
    planner: dict[str, Any]