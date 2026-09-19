import { useEffect, useRef, useState } from 'react'
import type { CTAProject, MediaAsset, MediaType } from '../../types/template'
import { uploadVideo } from '../../services/mediaApi'
import { normalizeEmbedUrl } from '../../utils/media'

type Props = { data: CTAProject; onChange: (project: CTAProject) => void }

const MediaPanel = ({ data, onChange }: Props) => {
  const media = data.assets.media
  const type = media?.type ?? 'image'
  const [status, setStatus] = useState('')
  const [error, setError] = useState('')
  const [embedInput, setEmbedInput] = useState(type === 'embed' ? media?.src ?? '' : '')
  const latest = useRef({ data, onChange })
  const request = useRef<AbortController | null>(null)
  useEffect(() => { latest.current = { data, onChange } }, [data, onChange])
  useEffect(() => () => request.current?.abort(), [])

  const updateMedia = (next: MediaAsset) => {
    const current = latest.current
    current.onChange({ ...current.data, assets: { ...current.data.assets, media: next } })
  }
  const chooseType = (next: MediaType) => {
    request.current?.abort()
    request.current = null
    setStatus('')
    setError('')
    updateMedia({ type: next, src: next === 'embed' ? normalizeEmbedUrl(embedInput) ?? '' : '', autoplay: true, muted: true, loop: true, ctaDisplay: next === 'embed' ? 'always' : 'last-seconds', ctaLastSeconds: 3 })
  }
  const upload = async (file?: File) => {
    if (!file) return
    request.current?.abort()
    const controller = new AbortController()
    request.current = controller
    setError('')
    setStatus('Uploading...')
    try {
      const result = await uploadVideo(file, controller.signal)
      if (controller.signal.aborted) return
      const current = latest.current.data.assets.media
      updateMedia({ ...current, type: 'video', id: result.filename, src: result.url, alt: file.name })
      setStatus('Uploaded')
    } catch (cause) {
      if (controller.signal.aborted) return
      setStatus('')
      setError(cause instanceof Error ? cause.message : 'Upload failed. Check the local server.')
    }
  }

  return <section className="media-panel">
    <strong>Media</strong>
    <label>Media Type<select value={type} onChange={(event) => chooseType(event.target.value as MediaType)}>
      <option value="image">Image</option><option value="video">Local Video</option><option value="embed">Embed Video</option>
    </select></label>
    {type === 'video' && <>
      <label>Choose Video<input type="file" accept=".mp4,.webm,video/mp4,video/webm" onChange={(event) => { void upload(event.target.files?.[0]); event.target.value = '' }} /></label>
      <small>MP4 / WebM · up to 512 MB</small>
      {media?.src && <small className="media-source">{media.alt ?? media.src}</small>}
    </>}
    {type === 'embed' && <label>Embed URL<input type="url" value={embedInput} placeholder="https://www.youtube.com/watch?v=..." onChange={(event) => {
      const value = event.target.value
      setEmbedInput(value)
      const normalized = normalizeEmbedUrl(value)
      setError(value && !normalized ? 'Use a valid HTTPS YouTube URL or Vimeo player URL.' : '')
      updateMedia({ ...media, type: 'embed', src: normalized ?? '' })
    }} /></label>}
    {type !== 'image' && <>{(['autoplay', 'loop', 'muted'] as const).map((flag) => <label className="checkbox-label" key={flag}><input type="checkbox" checked={media?.[flag] !== false} onChange={(event) => updateMedia({ ...media!, [flag]: event.target.checked })} />{flag}</label>)}<small>Autoplay may require muted audio. Use player controls if playback is blocked.</small></>}
    {type !== 'image' && <>
      <label>CTA Display<select value={type === 'embed' && media?.ctaDisplay !== 'hidden' ? 'always' : media?.ctaDisplay ?? 'last-seconds'} onChange={(event) => updateMedia({ ...media!, ctaDisplay: event.target.value as MediaAsset['ctaDisplay'] })}>
        {type === 'video' && <option value="last-seconds">Last {media?.ctaLastSeconds ?? 3} seconds</option>}
        <option value="always">Always</option><option value="hidden">Hidden</option>
      </select></label>
      {type === 'video' && (media?.ctaDisplay ?? 'last-seconds') === 'last-seconds' && <label>CTA seconds<input type="number" min="1" max="60" step="1" value={media?.ctaLastSeconds ?? 3} onChange={(event) => {
        const value = event.target.valueAsNumber
        if (Number.isFinite(value)) updateMedia({ ...media!, ctaLastSeconds: Math.max(1, Math.min(60, value)) })
      }} /></label>}
      {type === 'embed' && <small>Embed timing is unavailable. Last-seconds settings use Always for embeds.</small>}
    </>}
    {status && <p role="status">{status}</p>}
    {error && <p role="alert">Error: {error}</p>}
  </section>
}

export default MediaPanel
