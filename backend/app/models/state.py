# for shared memo

from pydantic import BaseModel, Field
from typing import Any


class WorkflowState(BaseModel):
    idea: str
    industry: str | None = None
    target_region: str | None = None

    business: dict[str, Any] = Field(default_factory=dict)
    product: dict[str, Any] = Field(default_factory=dict)
    technical: dict[str, Any] = Field(default_factory=dict)
    finance: dict[str, Any] = Field(default_factory=dict)
    planner: dict[str, Any] = Field(default_factory=dict)


