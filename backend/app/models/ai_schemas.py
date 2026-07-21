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
    
class EstimatedBudget(BaseModel):
    development: str
    marketing: str
    operations: str
    legal_and_registration: str


class MonthlyOperatingCost(BaseModel):
    hosting: str
    database: str
    ai_api: str
    maintenance: str


class FinancialMetrics(BaseModel):
    expected_gross_margin: str
    target_customers_first_year: str
    expected_roi: str


class FinanceOutput(BaseModel):
    estimated_budget: EstimatedBudget
    monthly_operating_cost: MonthlyOperatingCost
    revenue_model: list[str]
    funding_strategy: list[str]
    break_even: str
    financial_risks: list[str]
    financial_metrics: FinancialMetrics