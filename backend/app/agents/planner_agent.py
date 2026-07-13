from app.agents.base import BaseAgent
from app.models.state import WorkflowState


class PlannerAgent(BaseAgent):
    """
    Generates an execution roadmap.
    Dummy implementation.
    """

    def run(self, state: WorkflowState) -> WorkflowState:

        state.planner = {
            "timeline": "12 Weeks",
            "milestones": [
                "Market Research",
                "MVP Development",
                "Beta Testing",
                "Public Launch"
            ],
            "priority_tasks": [
                "Validate Idea",
                "Build MVP",
                "Acquire First Users",
                "Collect Feedback"
            ],
            "success_metrics": [
                "1000 Users",
                "50 Paid Customers",
                "Positive User Feedback"
            ]
        }

        return state