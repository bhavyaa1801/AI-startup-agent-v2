from fastapi import APIRouter

from app.models.schemas import StartupRequest, StartupResponse
from app.models.state import WorkflowState
from app.orchestrator.orchestrator import StartupOrchestrator

router = APIRouter()


@router.post("/generate-blueprint", response_model=StartupResponse)
def generate_blueprint(request: StartupRequest):

    state = WorkflowState(
        idea=request.idea,
        industry=request.industry,
        target_region=request.target_region,
    )

    orchestrator = StartupOrchestrator()
    result = orchestrator.run(state)

    return StartupResponse(
        business=result.business,
        product=result.product,
        technical=result.technical,
        finance=result.finance,
        planner=result.planner,
    )