from app.agents.base import BaseAgent
from app.models.state import WorkflowState
from app.services.groq import groq


class PlannerAgent(BaseAgent):

    def run(self, state: WorkflowState) -> WorkflowState:
        
        data = self._collect_inputs(state)

        #planner_output = self._generate_plan(data)

        planner_output = self._generate_plan_ai(data)

        state.planner = planner_output

        return state

    # -----------------------------------------------------

    def _collect_inputs(self, state: WorkflowState) -> dict:

        return {
            "idea": state.idea,
            "industry": state.industry,
            "target_region": state.target_region,
            "business": state.business,
            "product": state.product,
            "technical": state.technical,
            "finance": state.finance,
        }

    # -----------------------------------------------------

    def _build_prompt(self, data: dict) -> str:

        return f"""
You are an expert Startup Strategy Consultant.

Startup Idea:
{data['idea']}

Industry:
{data['industry']}

Target Region:
{data['target_region']}

Business Analysis:
{data['business']}

Product Analysis:
{data['product']}

Technical Analysis:
{data['technical']}

Financial Analysis:
{data['finance']}

Using all of the information above, generate a comprehensive startup execution blueprint.

Return ONLY valid JSON.

The JSON must contain the following keys exactly:

- executive_summary
- business_summary
- product_summary
- technical_summary
- financial_summary
- execution_roadmap
- milestones
- priority_tasks
- go_to_market_plan
- risk_analysis
- success_metrics
- scaling_strategy
- final_recommendations

Do not include markdown.
Do not include explanations.
Return only JSON.
"""

    # -----------------------------------------------------

    def _generate_plan(self, data: dict) -> dict:

        business = data["business"]
        product = data["product"]
        technical = data["technical"]
        finance = data["finance"]

        mvp_features = (
            product.get("mvpFeatures", []) if isinstance(product, dict) else []
        )

        tech_stack = (
            technical.get("tech_stack", {}) if isinstance(technical, dict) else {}
        )

        return {
            "executive_summary": {
                "startup_idea": data["idea"],
                "industry": data["industry"] or "Not Provided",
                "target_region": data["target_region"] or "Not Provided",
                "objective": "Launch a validated MVP and acquire early customers within 12 weeks.",
            },
            "business_summary": {
                "analysis_available": bool(business),
                "recommended_model": (
                    business.get("business_model", {}).get(
                        "recommended_model", "To Be Validated"
                    )
                    if isinstance(business, dict)
                    else "To Be Validated"
                ),
                "validation_focus": [
                    "Customer interviews",
                    "Pricing validation",
                    "Landing page test",
                    "Manual MVP validation",
                ],
            },
            "product_summary": {
                "mvp_features": mvp_features,
                "product_vision": (
                    product.get("productVision", "Not Provided")
                    if isinstance(product, dict)
                    else "Not Provided"
                ),
                "target_users": (
                    product.get("targetUsers", []) if isinstance(product, dict) else []
                ),
            },
            "technical_summary": {
                "frontend": tech_stack.get("frontend", []),
                "backend": tech_stack.get("backend", []),
                "database": tech_stack.get("database", []),
                "ai_tools": tech_stack.get("ai", []),
            },
            "financial_summary": {
                "analysis_available": bool(finance),
                "note": "Financial estimates should be reviewed before scaling.",
            },
            "execution_roadmap": [
                {
                    "phase": "Phase 1",
                    "duration": "Week 1-2",
                    "title": "Business Validation",
                    "tasks": [
                        "Conduct customer interviews",
                        "Validate the problem statement",
                        "Identify top competitors",
                        "Refine value proposition",
                    ],
                },
                {
                    "phase": "Phase 2",
                    "duration": "Week 3-4",
                    "title": "Product Planning",
                    "tasks": [
                        "Finalize MVP feature list",
                        "Create user stories",
                        "Define acceptance criteria",
                        "Freeze MVP scope",
                    ],
                },
                {
                    "phase": "Phase 3",
                    "duration": "Week 5-8",
                    "title": "Technical Development",
                    "tasks": [
                        "Setup frontend framework",
                        "Setup backend services",
                        "Design database schema",
                        "Develop APIs",
                        "Integrate AI functionality",
                        "Perform internal testing",
                    ],
                },
                {
                    "phase": "Phase 4",
                    "duration": "Week 9-10",
                    "title": "Beta Preparation",
                    "tasks": [
                        "Deploy staging environment",
                        "Run beta testing",
                        "Fix critical bugs",
                        "Prepare onboarding materials",
                    ],
                },
                {
                    "phase": "Phase 5",
                    "duration": "Week 11-12",
                    "title": "Public Launch",
                    "tasks": [
                        "Launch public version",
                        "Start marketing campaigns",
                        "Collect customer feedback",
                        "Monitor KPIs",
                    ],
                },
            ],
            "milestones": [
                {"week": 2, "milestone": "Business Validation Complete"},
                {"week": 4, "milestone": "Product Requirements Finalized"},
                {"week": 8, "milestone": "Working MVP Ready"},
                {"week": 10, "milestone": "Beta Testing Complete"},
                {"week": 12, "milestone": "Public Launch"},
            ],
            "priority_tasks": {
                "high_priority": [
                    "Validate market demand",
                    "Build MVP",
                    "Acquire first users",
                    "Collect feedback",
                ],
                "medium_priority": [
                    "Improve UI/UX",
                    "Optimize performance",
                    "Expand marketing reach",
                ],
                "low_priority": [
                    "Advanced AI features",
                    "International expansion",
                    "Enterprise integrations",
                ],
            },
            "go_to_market_plan": {
                "initial_channel": "Founder-led outreach",
                "secondary_channels": [
                    "Social media",
                    "Content marketing",
                    "Partnerships",
                    "Referral programs",
                ],
                "beta_users_target": 100,
                "first_paying_customers_target": 10,
            },
            "risk_analysis": [
                {
                    "risk": "Low market demand",
                    "impact": "High",
                    "mitigation": "Conduct customer interviews before development.",
                },
                {
                    "risk": "Scope creep",
                    "impact": "Medium",
                    "mitigation": "Freeze MVP scope during Phase 2.",
                },
                {
                    "risk": "Budget overrun",
                    "impact": "High",
                    "mitigation": "Track expenses weekly and prioritize essential features.",
                },
                {
                    "risk": "Technical delays",
                    "impact": "High",
                    "mitigation": "Use weekly sprint reviews and milestone tracking.",
                },
            ],
            "success_metrics": [
                "Working MVP by Week 8",
                "100+ beta users",
                "10+ paying customers",
                "Positive customer feedback",
                "Successful public launch",
            ],
            "scaling_strategy": [
                "Improve customer retention",
                "Automate onboarding",
                "Expand to additional customer segments",
                "Introduce premium features",
                "Build strategic partnerships",
            ],
            "final_recommendations": [
                "Validate the market before major development spending.",
                "Launch a focused MVP instead of a feature-heavy product.",
                "Collect measurable customer feedback during beta testing.",
                "Monitor acquisition cost and retention from the first launch.",
                "Use data-driven iterations before scaling aggressively.",
            ],
        }

    # -----------------------------------------------------

    def _generate_plan_ai(self, data: dict) -> dict:
        """
        Generates the startup execution blueprint using the Groq service.
        """
        prompt = self._build_prompt(data)
         
        return groq.generate(prompt)