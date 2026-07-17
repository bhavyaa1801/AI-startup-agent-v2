import re
from copy import deepcopy
from typing import Any

from app.agents.base import BaseAgent
from app.models.state import WorkflowState


class BusinessAgent(BaseAgent):
    """
    Produces a deterministic business and market research report.

    This version does not call Gemini, Tavily, Google Search,
    databases, or any other external API.

    The generated findings are hypotheses that should be validated
    through customer interviews and real market research.
    """

    INDUSTRY_PROFILES: dict[str, dict[str, Any]] = {
        "education": {
            "keywords": [
                "education",
                "student",
                "school",
                "college",
                "teacher",
                "learning",
                "course",
                "edtech",
                "training",
            ],
            "customer_segments": [
                "Students and independent learners",
                "Parents purchasing educational services",
                "Schools, colleges, and training institutions",
                "Teachers and professional trainers",
            ],
            "competitor_categories": [
                "Online learning platforms",
                "Offline coaching and training institutes",
                "School and institution management products",
                "Free educational content platforms",
            ],
            "demand_hypotheses": [
                "Customers may value flexible and personalised learning.",
                "Institutions may value measurable learner outcomes.",
                "Affordable access may influence adoption.",
            ],
            "channels": [
                "Educational institution partnerships",
                "Student communities",
                "Content marketing",
                "Teacher referral programmes",
            ],
            "revenue_models": [
                "Monthly or annual subscription",
                "Per-course payment",
                "Institutional licensing",
                "Freemium with premium features",
            ],
            "risks": [
                "Long institutional sales cycles",
                "Difficulty proving learning outcomes",
                "High learner acquisition cost",
                "Strong free-content alternatives",
            ],
        },
        "healthcare": {
            "keywords": [
                "health",
                "healthcare",
                "medical",
                "doctor",
                "patient",
                "clinic",
                "hospital",
                "wellness",
                "fitness",
                "pharmacy",
            ],
            "customer_segments": [
                "Patients and caregivers",
                "Doctors and independent practitioners",
                "Clinics and hospitals",
                "Employers offering wellness benefits",
            ],
            "competitor_categories": [
                "Hospital and clinic software providers",
                "Appointment and teleconsultation platforms",
                "Offline healthcare providers",
                "Health and wellness applications",
            ],
            "demand_hypotheses": [
                "Users may value convenience and reduced waiting time.",
                "Providers may value operational efficiency.",
                "Trust and data privacy may strongly affect adoption.",
            ],
            "channels": [
                "Clinic and hospital partnerships",
                "Medical professional referrals",
                "Employer wellness programmes",
                "Educational health content",
            ],
            "revenue_models": [
                "Provider subscription",
                "Per-consultation commission",
                "Enterprise licensing",
                "Patient membership",
            ],
            "risks": [
                "Healthcare regulation",
                "Sensitive personal data",
                "Requirement for professional trust",
                "Clinical accuracy and liability",
            ],
        },
        "retail": {
            "keywords": [
                "retail",
                "shop",
                "store",
                "ecommerce",
                "e-commerce",
                "shopping",
                "inventory",
                "seller",
                "merchant",
                "fashion",
                "clothing",
            ],
            "customer_segments": [
                "Individual online shoppers",
                "Small retailers and local merchants",
                "Online sellers",
                "Retail chains and distributors",
            ],
            "competitor_categories": [
                "Large ecommerce marketplaces",
                "Direct-to-consumer brands",
                "Local offline retailers",
                "Retail management software providers",
            ],
            "demand_hypotheses": [
                "Customers may value convenience and price transparency.",
                "Retailers may value inventory and sales visibility.",
                "Delivery reliability may influence repeat purchases.",
            ],
            "channels": [
                "Social commerce",
                "Marketplace listings",
                "Merchant partnerships",
                "Referral and loyalty programmes",
            ],
            "revenue_models": [
                "Product margin",
                "Seller commission",
                "Merchant subscription",
                "Delivery or service fee",
            ],
            "risks": [
                "Thin product margins",
                "Inventory management complexity",
                "High return and delivery costs",
                "Dependence on paid customer acquisition",
            ],
        },
        "finance": {
            "keywords": [
                "finance",
                "financial",
                "fintech",
                "payment",
                "bank",
                "loan",
                "investment",
                "insurance",
                "accounting",
            ],
            "customer_segments": [
                "Individual consumers",
                "Small and medium businesses",
                "Accountants and finance professionals",
                "Banks and financial institutions",
            ],
            "competitor_categories": [
                "Banks and regulated financial institutions",
                "Digital payment providers",
                "Accounting and finance software",
                "Manual financial processes",
            ],
            "demand_hypotheses": [
                "Customers may value simplicity and transaction speed.",
                "Businesses may value financial visibility.",
                "Trust and regulatory compliance may determine adoption.",
            ],
            "channels": [
                "Business partnerships",
                "Accountant and advisor referrals",
                "Financial education content",
                "Industry associations",
            ],
            "revenue_models": [
                "Transaction fee",
                "Monthly subscription",
                "Enterprise licensing",
                "Referral or distribution commission",
            ],
            "risks": [
                "Financial regulation",
                "Fraud and cybersecurity",
                "Dependence on banking partners",
                "High customer trust requirements",
            ],
        },
        "food": {
            "keywords": [
                "food",
                "restaurant",
                "cafe",
                "coffee",
                "bakery",
                "kitchen",
                "meal",
                "grocery",
                "delivery",
                "hospitality",
            ],
            "customer_segments": [
                "Local consumers",
                "Office workers and students",
                "Families",
                "Restaurants and food-service businesses",
            ],
            "competitor_categories": [
                "Local restaurants and food outlets",
                "Food delivery marketplaces",
                "Home kitchens and independent sellers",
                "Grocery and convenience alternatives",
            ],
            "demand_hypotheses": [
                "Convenience may influence purchase frequency.",
                "Food quality and consistency may drive retention.",
                "Location and delivery time may limit the service area.",
            ],
            "channels": [
                "Local social media",
                "Food delivery marketplaces",
                "Office and college partnerships",
                "Customer referrals",
            ],
            "revenue_models": [
                "Direct product sales",
                "Delivery fee",
                "Meal subscription",
                "Business catering contracts",
            ],
            "risks": [
                "Food safety and licensing",
                "Perishable inventory",
                "Low operating margins",
                "Inconsistent demand",
            ],
        },
        "technology": {
            "keywords": [
                "software",
                "saas",
                "technology",
                "platform",
                "application",
                "app",
                "ai",
                "automation",
                "digital",
                "cloud",
            ],
            "customer_segments": [
                "Individual digital users",
                "Startups and small businesses",
                "Professional teams",
                "Larger organisations",
            ],
            "competitor_categories": [
                "Specialised SaaS products",
                "Large multipurpose software platforms",
                "Internal company tools",
                "Manual spreadsheet and messaging workflows",
            ],
            "demand_hypotheses": [
                "Customers may pay for measurable time savings.",
                "Easy onboarding may improve initial adoption.",
                "Integration with existing tools may affect retention.",
            ],
            "channels": [
                "Product-led growth",
                "Search and educational content",
                "Professional communities",
                "Integration and channel partnerships",
            ],
            "revenue_models": [
                "Monthly subscription",
                "Usage-based pricing",
                "Per-user pricing",
                "Enterprise licensing",
            ],
            "risks": [
                "Strong software competition",
                "High customer acquisition cost",
                "Low switching costs",
                "Security and reliability expectations",
            ],
        },
    }

    DEFAULT_PROFILE: dict[str, Any] = {
        "customer_segments": [
            "Early adopters experiencing the stated problem",
            "Individuals currently using manual alternatives",
            "Small businesses with an urgent operational need",
            "Organisations that could purchase the solution",
        ],
        "competitor_categories": [
            "Direct providers solving the same problem",
            "Indirect providers solving part of the problem",
            "Manual processes and spreadsheets",
            "Customers choosing to do nothing",
        ],
        "demand_hypotheses": [
            "Customers may adopt if the problem is frequent and costly.",
            "Clear measurable value may improve willingness to pay.",
            "Low-friction onboarding may improve initial adoption.",
        ],
        "channels": [
            "Founder-led customer outreach",
            "Industry communities",
            "Educational content",
            "Partnerships and referrals",
        ],
        "revenue_models": [
            "Monthly subscription",
            "One-time purchase",
            "Service fee",
            "Business licensing",
        ],
        "risks": [
            "The customer problem may not be urgent.",
            "Customers may not be willing to pay.",
            "The target segment may be too broad.",
            "Customer acquisition may be expensive.",
        ],
    }

    def run(
        self,
        state: WorkflowState,
    ) -> WorkflowState:
        """
        Analyse the startup idea and update only state.business.
        """

        idea = self._clean_text(state.idea)

        if len(idea) < 10:
            raise ValueError(
                "The startup idea must contain at least 10 characters."
            )

        industry = self._clean_optional(
            state.industry
        )

        region = self._clean_optional(
            state.target_region
        )

        profile_name, profile = self._select_profile(
            idea=idea,
            industry=industry,
        )

        business_model = self._infer_business_model(
            idea=idea,
            profile_name=profile_name,
        )

        input_score = self._calculate_input_score(
            idea=idea,
            industry=industry,
            region=region,
        )

        state.business = {
            "agent": {
                "name": "Business and Market Research Agent",
                "version": "1.0.0-local",
                "mode": "deterministic_no_api",
                "uses_external_api": False,
                "uses_live_market_data": False,
            },
            "input_summary": {
                "idea": idea,
                "industry_provided": industry,
                "inferred_industry_profile": profile_name,
                "target_region": region or "Not provided",
            },
            "executive_summary": (
                f"The proposed startup idea is: {idea}. "
                f"It has been evaluated using the {profile_name} "
                "local business-research profile. The findings are "
                "hypotheses and require customer and market validation "
                "before important business decisions are made."
            ),
            "market_research": {
                "research_status": "hypothesis_based",
                "market_definition": (
                    f"Potential {profile_name} customers in "
                    f"{region or 'the selected launch region'} who "
                    "experience the problem described by the idea."
                ),
                "market_size": {
                    "tam": None,
                    "sam": None,
                    "som": None,
                    "status": (
                        "Not calculated because no verified external "
                        "market-data source is connected."
                    ),
                },
                "demand_hypotheses": deepcopy(
                    profile["demand_hypotheses"]
                ),
                "questions_requiring_research": [
                    (
                        "How many target customers experience "
                        "this problem?"
                    ),
                    (
                        "How frequently does the problem occur?"
                    ),
                    (
                        "What do customers currently spend "
                        "on alternatives?"
                    ),
                    (
                        "What percentage of customers would "
                        "consider switching?"
                    ),
                    (
                        "Which regional regulations affect "
                        "this business?"
                    ),
                ],
            },
            "target_customer_analysis": {
                "possible_segments": deepcopy(
                    profile["customer_segments"]
                ),
                "recommended_early_adopter": (
                    "Customers who experience the problem frequently, "
                    "currently use an inconvenient alternative, and "
                    "can make a purchase decision without a long "
                    "approval process."
                ),
                "customer_interview_questions": [
                    (
                        "When did you last experience "
                        "this problem?"
                    ),
                    (
                        "How do you solve this problem today?"
                    ),
                    (
                        "How much time or money does the "
                        "current solution cost?"
                    ),
                    (
                        "What is the biggest weakness of "
                        "the current solution?"
                    ),
                    (
                        "Would you pay for a better solution? "
                        "Why or why not?"
                    ),
                ],
            },
            "competitor_analysis": {
                "named_competitors": [],
                "competitor_categories": deepcopy(
                    profile["competitor_categories"]
                ),
                "research_status": (
                    "Named competitors require live web research "
                    "or documented manual competitor research."
                ),
                "comparison_criteria": [
                    "Target customer",
                    "Problem solved",
                    "Core features",
                    "Pricing",
                    "Distribution channel",
                    "Strengths",
                    "Weaknesses",
                    "Customer reviews",
                ],
            },
            "business_model": {
                "recommended_model": business_model,
                "alternative_models": deepcopy(
                    profile["revenue_models"]
                ),
                "pricing_status": (
                    "Pricing must be tested through interviews, "
                    "pre-orders, paid pilots, or landing-page tests."
                ),
                "possible_acquisition_channels": deepcopy(
                    profile["channels"]
                ),
            },
            "swot_analysis": {
                "strengths": [
                    (
                        "The concept can be tested before "
                        "full development."
                    ),
                    (
                        "Founder-led interviews can produce "
                        "early evidence."
                    ),
                    (
                        "A focused MVP can reduce initial "
                        "execution risk."
                    ),
                ],
                "weaknesses": [
                    (
                        "No verified customer evidence is "
                        "currently available."
                    ),
                    (
                        "No reliable market-size data is connected."
                    ),
                    (
                        "No named competitor research has "
                        "been completed."
                    ),
                ],
                "opportunities": [
                    (
                        "Focus on one narrowly defined "
                        "early-adopter segment."
                    ),
                    (
                        "Validate willingness to pay before "
                        "building the full product."
                    ),
                    (
                        "Differentiate through a specific "
                        "measurable outcome."
                    ),
                ],
                "threats": deepcopy(
                    profile["risks"]
                ),
            },
            "validation": {
                "input_completeness_score": input_score,
                "score_explanation": (
                    "This score measures only how complete the "
                    "submitted idea, industry, and target region are. "
                    "It is not a market-viability, financial, or "
                    "investment score."
                ),
                "experiments": [
                    {
                        "name": "Customer interviews",
                        "target": (
                            "Interview at least 15 potential customers."
                        ),
                        "success_signal": (
                            "At least 8 customers independently "
                            "describe the same problem without "
                            "being led."
                        ),
                    },
                    {
                        "name": "Landing-page test",
                        "target": (
                            "Present one customer segment with "
                            "one clear value proposition."
                        ),
                        "success_signal": (
                            "Qualified visitors submit their contact "
                            "details or request early access."
                        ),
                    },
                    {
                        "name": "Pricing test",
                        "target": (
                            "Present three realistic price options "
                            "to qualified prospects."
                        ),
                        "success_signal": (
                            "Prospects accept a paid pilot, deposit, "
                            "or written purchase commitment."
                        ),
                    },
                    {
                        "name": "Manual MVP",
                        "target": (
                            "Deliver the core result manually before "
                            "building complete software."
                        ),
                        "success_signal": (
                            "Customers repeatedly use the service "
                            "and report measurable value."
                        ),
                    },
                ],
            },
            "risks": [
                {
                    "risk": risk,
                    "severity": "Requires validation",
                    "mitigation": (
                        "Test this risk using customer interviews, "
                        "small experiments, and documented evidence."
                    ),
                }
                for risk in profile["risks"]
            ],
            "recommendation": {
                "decision": "validate_before_building",
                "reason": (
                    "The available input is sufficient to define "
                    "validation experiments, but it is not sufficient "
                    "to prove market demand."
                ),
                "next_steps": [
                    "Select one primary customer segment.",
                    "Conduct at least 15 customer interviews.",
                    (
                        "Document existing alternatives and "
                        "customer complaints."
                    ),
                    "Test willingness to pay.",
                    "Build a small manual or no-code MVP.",
                    (
                        "Add verified market and competitor "
                        "sources later."
                    ),
                ],
            },
            "limitations": [
                "No live web search was performed.",
                "No API or external database was used.",
                "No market figures were verified.",
                "No named competitors were invented.",
                (
                    "The output is a planning aid and not "
                    "investment advice."
                ),
            ],
        }

        return state

    def _select_profile(
        self,
        idea: str,
        industry: str | None,
    ) -> tuple[str, dict[str, Any]]:
        """
        Select the most suitable local industry profile.
        """

        searchable_text = (
            f"{idea} {industry or ''}"
        ).lower()

        for profile_name, profile in (
            self.INDUSTRY_PROFILES.items()
        ):
            if any(
                self._contains_keyword(
                    text=searchable_text,
                    keyword=keyword,
                )
                for keyword in profile["keywords"]
            ):
                return profile_name, profile

        return "general business", self.DEFAULT_PROFILE

    def _contains_keyword(
        self,
        text: str,
        keyword: str,
    ) -> bool:
        """
        Match a complete word or phrase.

        This prevents:
        - 'health' from incorrectly matching 'healthy'
        - 'ai' from incorrectly matching 'retail'
        - 'app' from incorrectly matching unrelated longer words
        """

        pattern = (
            r"(?<!\w)"
            + re.escape(keyword.lower())
            + r"(?!\w)"
        )

        return (
            re.search(
                pattern,
                text.lower(),
            )
            is not None
        )

    def _infer_business_model(
        self,
        idea: str,
        profile_name: str,
    ) -> str:
        """
        Infer a possible business model from the submitted idea.
        """

        idea_lower = idea.lower()

        if any(
            self._contains_keyword(
                text=idea_lower,
                keyword=keyword,
            )
            for keyword in [
                "marketplace",
                "connect buyers",
                "connect sellers",
            ]
        ):
            return "Marketplace commission model"

        if any(
            self._contains_keyword(
                text=idea_lower,
                keyword=keyword,
            )
            for keyword in [
                "saas",
                "software",
                "platform",
                "app",
                "automation",
            ]
        ):
            return "Subscription or usage-based software model"

        if any(
            self._contains_keyword(
                text=idea_lower,
                keyword=keyword,
            )
            for keyword in [
                "store",
                "shop",
                "product",
                "ecommerce",
                "e-commerce",
            ]
        ):
            return "Product sales or transaction-margin model"

        if profile_name == "food":
            return (
                "Direct sales with optional delivery "
                "or subscription"
            )

        return (
            "Start with paid pilots, then select "
            "a repeatable revenue model"
        )

    def _calculate_input_score(
        self,
        idea: str,
        industry: str | None,
        region: str | None,
    ) -> int:
        """
        Calculate input completeness, not market viability.
        """

        score = 35

        if len(idea) >= 30:
            score += 10

        if len(idea) >= 80:
            score += 10

        if industry:
            score += 15

        if region:
            score += 15

        return min(score, 85)

    def _clean_text(
        self,
        value: str,
    ) -> str:
        """
        Remove unnecessary spaces from required text.
        """

        return " ".join(value.split())

    def _clean_optional(
        self,
        value: str | None,
    ) -> str | None:
        """
        Clean optional text and convert empty text to None.
        """

        if value is None:
            return None

        cleaned = self._clean_text(value)

        return cleaned or None