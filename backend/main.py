from typing import Literal
from pathlib import Path
from uuid import uuid4

from fastapi import FastAPI, HTTPException, Request, UploadFile
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
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
    allow_origins=["http://localhost:5180", "http://127.0.0.1:5180"],
    allow_credentials=True,
    allow_methods=["GET", "HEAD", "POST"],
    allow_headers=["Content-Type", "Range"],
    expose_headers=["Content-Length", "Content-Range", "Accept-Ranges"],
)

MEDIA_DIRECTORY = Path(__file__).resolve().parents[1] / "assets" / "incoming"
MEDIA_DIRECTORY.mkdir(parents=True, exist_ok=True)
app.mount("/media", StaticFiles(directory=MEDIA_DIRECTORY), name="media")
MAX_UPLOAD_BYTES = 512 * 1024 * 1024


@app.get("/api/health")
def health():
    return {"status": "ok"}


@app.post("/api/media/upload")
def upload_media(request: Request, file: UploadFile):
    suffix = Path(file.filename or "").suffix.lower()
    if suffix not in {".mp4", ".webm"}:
        file.file.close()
        raise HTTPException(status_code=415, detail="Only MP4 and WebM videos are supported.")
    filename = f"{uuid4().hex}{suffix}"
    destination = MEDIA_DIRECTORY / filename
    size = 0
    try:
        with destination.open("xb") as output:
            while chunk := file.file.read(1024 * 1024):
                size += len(chunk)
                if size > MAX_UPLOAD_BYTES:
                    raise HTTPException(status_code=413, detail="Video must be 512 MB or smaller.")
                output.write(chunk)
        if size == 0:
            raise HTTPException(status_code=400, detail="Video file is empty.")
    except BaseException:
        destination.unlink(missing_ok=True)
        raise
    finally:
        file.file.close()
    return {"filename": filename, "url": str(request.url_for("media", path=filename)), "size": size}


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
