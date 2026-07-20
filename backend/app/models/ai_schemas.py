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

class TechStack(BaseModel):
    frontend: list[str]
    backend: list[str]
    database: list[str]
    ai: list[str]
    deployment: list[str]


class ApiEndpoint(BaseModel):
    method: str
    endpoint: str
    purpose: str


class Deployment(BaseModel):
    frontend: str
    backend: str
    database: str


class TechnicalOutput(BaseModel):
    technical_required: bool
    reason: str

    tech_stack: TechStack

    architecture: list[str]

    database_tables: list[str]

    apis: list[ApiEndpoint]

    security: list[str]

    scalability: list[str]

    deployment: Deployment