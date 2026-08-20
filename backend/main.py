from typing import Literal

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, ConfigDict


class GenerateCTARequest(BaseModel):
    model_config = ConfigDict(extra="forbid")

    brandName: str
    goal: str
    audience: str
    tone: str
    language: Literal["ko", "en", "ja"]
    additionalContext: str | None = None


class GenerateCTAResponse(BaseModel):
    model_config = ConfigDict(extra="forbid")

    headline: str
    message: str
    buttonText: str
    subText: str


MOCK_RESPONSES: dict[str, GenerateCTAResponse] = {
    "ko": GenerateCTAResponse(
        headline="AI와 함께 시작하는 새로운 학습",
        message="질문하고 탐구하며 스스로 답을 찾아가는 학습 경험을 만나보세요.",
        buttonText="지금 시작하기",
        subText="BRIVION과 함께",
    ),
    "en": GenerateCTAResponse(
        headline="A New Way to Learn with AI",
        message="Explore, ask questions, and discover answers through an engaging learning experience.",
        buttonText="Get Started",
        subText="Learn with BRIVION",
    ),
    "ja": GenerateCTAResponse(
        headline="AIと始める新しい学び",
        message="質問し、探究し、自分で答えを見つける学習体験を始めましょう。",
        buttonText="今すぐ始める",
        subText="BRIVIONと一緒に",
    ),
}

app = FastAPI(title="CTA Studio API")
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5180"],
    allow_credentials=True,
    allow_methods=["POST"],
    allow_headers=["Content-Type"],
)


@app.post("/api/ai/generate-cta", response_model=GenerateCTAResponse)
def generate_cta(request: GenerateCTARequest) -> GenerateCTAResponse:
    return MOCK_RESPONSES[request.language]
