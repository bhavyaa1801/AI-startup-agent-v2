from pydantic import BaseModel


class FeaturePrioritization(BaseModel):
    mustHave: list[str]
    shouldHave: list[str]
    couldHave: list[str]


class ProductOutput(BaseModel):

    productVision: str

    problemStatement: str

    targetUsers: list[str]

    userPersonas: list[str]

    mvpFeatures: list[str]

    futureFeatures: list[str]

    userStories: list[str]

    acceptanceCriteria: list[str]

    functionalRequirements: list[str]

    nonFunctionalRequirements: list[str]

    featurePrioritization: FeaturePrioritization

    roadmap: list[str]

    successMetrics: list[str]

    risks: list[str]