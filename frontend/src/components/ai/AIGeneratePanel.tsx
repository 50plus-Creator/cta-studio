import { useState } from 'react'
import type { CTAProject, Locale } from '../../types/template'
import { generateCTA, type AIGenerateCTAResponse } from '../../services/aiCtaApi'

type Props = { data: CTAProject; onApply: (data: CTAProject) => void }

const AIGeneratePanel = ({ data, onApply }: Props) => {
  const [brandProduct, setBrandProduct] = useState(data.brand.name)
  const [goal, setGoal] = useState('')
  const [audience, setAudience] = useState('')
  const [tone, setTone] = useState('')
  const [language, setLanguage] = useState<Locale>(data.locale)
  const [context, setContext] = useState('')
  const [suggestion, setSuggestion] = useState<AIGenerateCTAResponse | null>(null)
  const [isGenerating, setIsGenerating] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const generate = async () => {
    setIsGenerating(true)
    setError(null)

    try {
      const result = await generateCTA({
        brandName: brandProduct,
        goal,
        audience,
        tone,
        language,
        additionalContext: context || undefined,
      })
      setSuggestion(result)
    } catch {
      setError('CTA를 생성할 수 없습니다. 백엔드 연결을 확인한 후 다시 시도해 주세요.')
    } finally {
      setIsGenerating(false)
    }
  }

  const applySuggestion = () => {
    if (!suggestion) return

    const nextActions = data.actions.map((action, index) => index === 0
      ? {
        ...action,
        content: {
          ...action.content,
          [language]: {
            ...action.content[language],
            label: suggestion.buttonText,
            subtitle: suggestion.subText,
          },
        },
      }
      : action)

    onApply({
      ...data,
      content: {
        ...data.content,
        [language]: {
          ...data.content[language],
          headline: suggestion.headline,
          message: suggestion.message,
        },
      },
      actions: nextActions,
    })
    setSuggestion(null)
  }

  return <section className="ai-generate-panel">
    <div className="ai-generate-heading">
      <div>
        <strong>AI Generate CTA</strong>
        <small>FastAPI mock generation</small>
      </div>
    </div>
    <label>Brand / Product<input value={brandProduct} onChange={(event) => setBrandProduct(event.target.value)} /></label>
    <label>CTA Goal<input value={goal} onChange={(event) => setGoal(event.target.value)} placeholder="e.g. Start a free trial" /></label>
    <label>Target Audience<input value={audience} onChange={(event) => setAudience(event.target.value)} placeholder="e.g. New learners" /></label>
    <label>Tone<input value={tone} onChange={(event) => setTone(event.target.value)} placeholder="e.g. Warm and encouraging" /></label>
    <label>Language<select value={language} onChange={(event) => setLanguage(event.target.value as Locale)}><option value="ko">ko</option><option value="en">en</option><option value="ja">ja</option></select></label>
    <label>Additional Context<textarea value={context} onChange={(event) => setContext(event.target.value)} placeholder="Add campaign or product details" /></label>
    <button className="ai-generate-button" type="button" onClick={generate} disabled={isGenerating}>{isGenerating ? 'Generating...' : 'Generate CTA'}</button>
    {error && <p className="ai-generate-error" role="alert">{error}</p>}
    {suggestion && <div className="ai-generate-result">
      <strong>Suggestion preview</strong>
      <dl>
        <div><dt>Headline</dt><dd>{suggestion.headline}</dd></div>
        <div><dt>Message</dt><dd>{suggestion.message}</dd></div>
        <div><dt>CTA button text</dt><dd>{suggestion.buttonText}</dd></div>
        <div><dt>Subtitle</dt><dd>{suggestion.subText}</dd></div>
      </dl>
      <div className="ai-generate-actions">
        <button className="ai-generate-apply" type="button" onClick={applySuggestion}>Apply</button>
        <button className="text-button" type="button" onClick={generate} disabled={isGenerating}>Regenerate</button>
        <button className="text-button" type="button" onClick={() => setSuggestion(null)}>Cancel</button>
      </div>
    </div>}
  </section>
}

export default AIGeneratePanel