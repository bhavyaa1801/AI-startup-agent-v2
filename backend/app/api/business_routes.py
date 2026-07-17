from typing import Any

from fastapi import APIRouter
from pydantic import BaseModel, Field

from app.agents.buisness_agent import BusinessAgent
from app.models.state import WorkflowState


router = APIRouter(
    prefix="/business",
    tags=["Business Research Agent"],
)


class BusinessResearchRequest(BaseModel):
    idea: str = Field(
        ...,
        min_length=10,
        description="A clear description of the startup idea.",
    )

    industry: str | None = Field(
        default=None,
        description="Optional industry or business category.",
    )

    target_region: str | None = Field(
        default=None,
        description="Optional launch country, state or city.",
    )


class BusinessResearchResponse(BaseModel):
    business: dict[str, Any]


@router.post(
    "/research",
    response_model=BusinessResearchResponse,
)
def generate_business_research(
    request: BusinessResearchRequest,
) -> BusinessResearchResponse:
    state = WorkflowState(
        idea=request.idea,
        industry=request.industry,
        target_region=request.target_region,
    )

    result = BusinessAgent().run(state)

    return BusinessResearchResponse(
        business=result.business,
    )