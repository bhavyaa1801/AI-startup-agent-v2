from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.api.business_routes import router as business_router
from app.api.routes import router


app = FastAPI(
    title="AI Startup Assistant",
    version="1.0.0",
)

# -----------------------------
# CORS Configuration
# -----------------------------
origins = [
    "http://localhost:3000",  # Next.js frontend
    "http://127.0.0.1:3000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# -----------------------------
# API Routes
# -----------------------------
app.include_router(router)
app.include_router(business_router)


@app.get("/")
def root():
    return {
        "message": "Backend Running"
    }