import type { Locale } from '../types/template'

export type AIGenerateCTARequest = {
  brandName: string
  goal: string
  audience: string
  tone: string
  language: Locale
  additionalContext?: string
}

export type AIGenerateCTAResponse = {
  headline: string
  message: string
  buttonText: string
  subText: string
}

const AI_CTA_API_URL = 'http://localhost:8100/api/ai/generate-cta'

export const generateCTA = async (request: AIGenerateCTARequest): Promise<AIGenerateCTAResponse> => {
  const response = await fetch(AI_CTA_API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(request),
  })

  if (!response.ok) {
    throw new Error(`CTA generation failed (${response.status})`)
  }

  return response.json() as Promise<AIGenerateCTAResponse>
}
