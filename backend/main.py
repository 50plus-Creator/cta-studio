from typing import Literal

from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, ConfigDict

from backend.services.ai_cta_service import (
    CTAServiceConfigurationError,
    CTAServiceError,
    GeneratedCTA,
    generate_cta_copy,
)


class GenerateCTARequest(BaseModel):
    model_config = ConfigDict(extra="forbid")

    brandName: str
    goal: str
    audience: str
    tone: str
    language: Literal["ko", "en", "ja"]
    additionalContext: str | None = None


app = FastAPI(title="CTA Studio API")
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5180"],
    allow_credentials=True,
    allow_methods=["POST"],
    allow_headers=["Content-Type"],
)


@app.post("/api/ai/generate-cta", response_model=GeneratedCTA)
def generate_cta(request: GenerateCTARequest) -> GeneratedCTA:
    try:
        return generate_cta_copy(
            brand_name=request.brandName,
            goal=request.goal,
            audience=request.audience,
            tone=request.tone,
            language=request.language,
            additional_context=request.additionalContext,
        )
    except CTAServiceConfigurationError as exc:
        raise HTTPException(status_code=503, detail=str(exc)) from exc
    except CTAServiceError as exc:
        raise HTTPException(status_code=502, detail=str(exc)) from exc
