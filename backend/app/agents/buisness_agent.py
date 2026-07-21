import re
from copy import deepcopy
from typing import Any

from app.agents.base import BaseAgent
from app.models.state import WorkflowState
from app.services.groq import groq


class BusinessAgent(BaseAgent):
    """
    Produces a business and market research report using Groq API
    (llama-3.3-70b-versatile) with fallback to deterministic hypotheses.
    """

    INDUSTRY_PROFILES: dict[str, dict[str, Any]] = {
        "education": {
            "keywords": [
                "education", "student", "school", "college", "teacher",
                "learning", "course", "edtech", "training",
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
                "health", "healthcare", "medical", "doctor", "patient",
                "clinic", "hospital", "wellness", "fitness", "pharmacy",
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
                "retail", "shop", "store", "ecommerce", "e-commerce",
                "shopping", "inventory", "seller", "merchant", "fashion", "clothing",
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
                "finance", "financial", "fintech", "payment", "bank",
                "loan", "investment", "insurance", "accounting",
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
                "food", "restaurant", "cafe", "coffee", "bakery",
                "kitchen", "meal", "grocery", "delivery", "hospitality",
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
                "software", "saas", "technology", "platform", "application",
                "app", "ai", "automation", "digital", "cloud",
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

    def run(self, state: WorkflowState) -> WorkflowState:
        """
        Analyse the startup idea using Groq API and update state.business.
        """
        idea = self._clean_text(state.idea)

        if len(idea) < 10:
            raise ValueError(
                "The startup idea must contain at least 10 characters."
            )

        industry = self._clean_optional(state.industry)
        region = self._clean_optional(state.target_region)

        # Attempt Groq Generation
        try:
            groq_response = self._call_groq_api(idea=idea, industry=industry, region=region)
            state.business = groq_response
        except Exception as e:
            # Fallback to local rule-based evaluation if API call fails
            state.business = self._generate_fallback(idea=idea, industry=industry, region=region, error=str(e))

        return state

    def _call_groq_api(self, idea: str, industry: str | None, region: str | None) -> dict[str, Any]:
        prompt = f"""
        You are a expert Business and Market Research AI Agent.
        Analyse the following startup idea and generate a structured JSON market research report.

        STARTUP IDEA: {idea}
        INDUSTRY: {industry or "Not specified"}
        TARGET REGION: {region or "Global"}

        Return strictly a valid JSON object matching this structure:
        {{
            "agent": {{
                "name": "Business and Market Research Agent",
                "version": "2.0.0-groq",
                "mode": "live_groq_llm",
                "uses_external_api": true,
                "uses_live_market_data": false
            }},
            "input_summary": {{
                "idea": "{idea}",
                "industry_provided": "{industry or 'Not provided'}",
                "inferred_industry_profile": "AI generated",
                "target_region": "{region or 'Global'}"
            }},
            "executive_summary": "A detailed executive summary paragraph evaluating the idea.",
            "market_research": {{
                "research_status": "ai_generated_hypotheses",
                "market_definition": "Target market definition sentence.",
                "market_size": {{
                    "tam": "Estimated TAM or Qualitative Description",
                    "sam": "Estimated SAM or Qualitative Description",
                    "som": "Estimated SOM or Qualitative Description",
                    "status": "Qualitative estimates generated via Llama-3.3-70B model."
                }},
                "demand_hypotheses": ["hypothesis 1", "hypothesis 2", "hypothesis 3"],
                "questions_requiring_research": ["question 1", "question 2", "question 3"]
            }},
            "target_customer_analysis": {{
                "possible_segments": ["segment 1", "segment 2", "segment 3"],
                "recommended_early_adopter": "Description of ideal early adopter.",
                "customer_interview_questions": ["question 1", "question 2", "question 3"]
            }},
            "competitor_analysis": {{
                "named_competitors": ["competitor 1", "competitor 2"],
                "competitor_categories": ["category 1", "category 2"],
                "research_status": "AI suggested competitors.",
                "comparison_criteria": ["Criteria 1", "Criteria 2"]
            }},
            "business_model": {{
                "recommended_model": "Recommended business model",
                "alternative_models": ["model 1", "model 2"],
                "pricing_status": "Pricing strategy recommendation",
                "possible_acquisition_channels": ["channel 1", "channel 2"]
            }},
            "swot_analysis": {{
                "strengths": ["strength 1", "strength 2"],
                "weaknesses": ["weakness 1", "weakness 2"],
                "opportunities": ["opportunity 1", "opportunity 2"],
                "threats": ["threat 1", "threat 2"]
            }},
            "validation": {{
                "input_completeness_score": 85,
                "score_explanation": "Completeness score explanation",
                "experiments": [
                    {{
                        "name": "Experiment 1",
                        "target": "Target objective",
                        "success_signal": "Success criteria"
                    }}
                ]
            }},
            "risks": [
                {{
                    "risk": "Risk description",
                    "severity": "High / Medium / Low",
                    "mitigation": "Mitigation strategy"
                }}
            ],
            "recommendation": {{
                "decision": "validate_before_building",
                "reason": "Reason for decision",
                "next_steps": ["step 1", "step 2", "step 3"]
            }},
            "limitations": [
                "Generated using Llama 3.3 70B via Groq.",
                "Market data requires empirical validation."
            ]
        }}
        """
        return groq.generate(prompt)

    def _generate_fallback(self, idea: str, industry: str | None, region: str | None, error: str) -> dict[str, Any]:
        profile_name, profile = self._select_profile(idea=idea, industry=industry)
        business_model = self._infer_business_model(idea=idea, profile_name=profile_name)
        input_score = self._calculate_input_score(idea=idea, industry=industry, region=region)

        return {
            "agent": {
                "name": "Business and Market Research Agent",
                "version": "1.0.0-fallback",
                "mode": "deterministic_fallback",
                "uses_external_api": False,
                "uses_live_market_data": False,
                "api_error": error,
            },
            "input_summary": {
                "idea": idea,
                "industry_provided": industry,
                "inferred_industry_profile": profile_name,
                "target_region": region or "Not provided",
            },
            "executive_summary": (
                f"The proposed startup idea is: {idea}. "
                f"Evaluated using the fallback {profile_name} profile."
            ),
            "market_research": {
                "research_status": "hypothesis_based",
                "market_definition": f"Potential {profile_name} customers in {region or 'selected region'}.",
                "market_size": {
                    "tam": None, "sam": None, "som": None,
                    "status": "Not calculated in fallback mode.",
                },
                "demand_hypotheses": deepcopy(profile["demand_hypotheses"]),
                "questions_requiring_research": [
                    "How many target customers experience this problem?",
                    "How frequently does the problem occur?",
                ],
            },
            "target_customer_analysis": {
                "possible_segments": deepcopy(profile["customer_segments"]),
                "recommended_early_adopter": "Early adopters with urgent needs.",
                "customer_interview_questions": ["When did you last experience this problem?"],
            },
            "competitor_analysis": {
                "named_competitors": [],
                "competitor_categories": deepcopy(profile["competitor_categories"]),
                "research_status": "Fallback mode.",
                "comparison_criteria": ["Target customer", "Pricing"],
            },
            "business_model": {
                "recommended_model": business_model,
                "alternative_models": deepcopy(profile["revenue_models"]),
                "pricing_status": "To be tested.",
                "possible_acquisition_channels": deepcopy(profile["channels"]),
            },
            "swot_analysis": {
                "strengths": ["Fast concept validation."],
                "weaknesses": ["No external verification."],
                "opportunities": ["Focus on niche customer segment."],
                "threats": deepcopy(profile["risks"]),
            },
            "validation": {
                "input_completeness_score": input_score,
                "score_explanation": "Calculated based on input length.",
                "experiments": [
                    {
                        "name": "Customer interviews",
                        "target": "Interview 15 customers.",
                        "success_signal": "8 confirm the problem.",
                    }
                ],
            },
            "risks": [
                {
                    "risk": risk,
                    "severity": "Requires validation",
                    "mitigation": "Test via interviews.",
                }
                for risk in profile["risks"]
            ],
            "recommendation": {
                "decision": "validate_before_building",
                "reason": "Fallback mode generated.",
                "next_steps": ["Conduct customer interviews."],
            },
            "limitations": [
                "Groq API call failed or missing API Key.",
                "Using local rule-based fallback.",
            ],
        }

    def _select_profile(self, idea: str, industry: str | None) -> tuple[str, dict[str, Any]]:
        searchable_text = f"{idea} {industry or ''}".lower()
        for profile_name, profile in self.INDUSTRY_PROFILES.items():
            if any(self._contains_keyword(text=searchable_text, keyword=kw) for kw in profile["keywords"]):
                return profile_name, profile
        return "general business", self.DEFAULT_PROFILE

    def _contains_keyword(self, text: str, keyword: str) -> bool:
        pattern = r"(?<!\w)" + re.escape(keyword.lower()) + r"(?!\w)"
        return re.search(pattern, text.lower()) is not None

    def _infer_business_model(self, idea: str, profile_name: str) -> str:
        idea_lower = idea.lower()
        if any(self._contains_keyword(text=idea_lower, keyword=kw) for kw in ["marketplace", "connect buyers", "connect sellers"]):
            return "Marketplace commission model"
        if any(self._contains_keyword(text=idea_lower, keyword=kw) for kw in ["saas", "software", "platform", "app", "automation"]):
            return "Subscription or usage-based software model"
        if any(self._contains_keyword(text=idea_lower, keyword=kw) for kw in ["store", "shop", "product", "ecommerce", "e-commerce"]):
            return "Product sales or transaction-margin model"
        if profile_name == "food":
            return "Direct sales with optional delivery or subscription"
        return "Start with paid pilots, then select a repeatable revenue model"

    def _calculate_input_score(self, idea: str, industry: str | None, region: str | None) -> int:
        score = 35
        if len(idea) >= 30: score += 10
        if len(idea) >= 80: score += 10
        if industry: score += 15
        if region: score += 15
        return min(score, 85)

    def _clean_text(self, value: str) -> str:
        return " ".join(value.split())

    def _clean_optional(self, value: str | None) -> str | None:
        if value is None:
            return None
        cleaned = self._clean_text(value)
        return cleaned or None