from abc import ABC, abstractmethod

from app.models.state import WorkflowState


class BaseAgent(ABC):

    @abstractmethod
    def run(self, state: WorkflowState) -> WorkflowState:
        """
        Takes the current workflow state,
        updates its own section,
        and returns the updated state.
        """
        pass