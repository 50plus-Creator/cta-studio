import { useEffect, useRef, useState } from 'react'
import type { ReactNode, SyntheticEvent } from 'react'
import type { CTAProject, CTATemplateDefinition } from '../../types/template'
import { embedPlaybackUrl, isMotionMedia } from '../../utils/media'
import SemanticIcon from './SemanticIcon'

const Video = ({ project, overlay }: { project: CTAProject; overlay: ReactNode }) => {
  const media = project.assets.media!
  const ref = useRef<HTMLVideoElement>(null)
  const [playback, setPlayback] = useState({ currentTime: 0, duration: 0 })
  const [failure, setFailure] = useState('')
  const [blocked, setBlocked] = useState('')
  useEffect(() => {
    const video = ref.current!
    video.src = media.src
    video.load()
    return () => { video.pause(); video.removeAttribute('src'); video.load() }
  }, [media.src])
  useEffect(() => {
    const video = ref.current!
    let active = true
    if (media.autoplay !== false) {
      void video.play().then(() => { if (active) setBlocked('') }).catch((error: unknown) => {
        if (active) setBlocked(`Playback did not start automatically. Use Play. ${error instanceof Error ? error.name : ''}`)
      })
    }
    return () => { active = false }
  }, [media.autoplay])
  const sync = (event: SyntheticEvent<HTMLVideoElement>) => {
    const video = event.currentTarget
    setPlayback({ currentTime: video.currentTime, duration: video.duration })
    const detail = { event: event.type, code: video.error?.code ?? 0, message: video.error?.message ?? '', currentSrc: video.currentSrc, currentTime: video.currentTime, duration: video.duration, readyState: video.readyState, networkState: video.networkState }
    if (import.meta.env.DEV && event.type !== 'timeupdate') console.debug('[CTA video]', detail)
    if (event.type === 'error') setFailure(JSON.stringify(detail))
    if (event.type === 'loadedmetadata' || event.type === 'canplay') setFailure('')
    if (event.type === 'play') setBlocked('')
  }
  const mode = media.ctaDisplay ?? 'last-seconds'
  const seconds = Number.isFinite(media.ctaLastSeconds) ? Math.max(1, Math.min(60, media.ctaLastSeconds!)) : 3
  const visible = mode === 'always' || (mode === 'last-seconds' && Number.isFinite(playback.duration) && playback.duration > 0 && playback.currentTime >= Math.max(0, playback.duration - seconds))
  return <>
    <video ref={ref} src={media.src} autoPlay={media.autoplay !== false} loop={media.loop !== false} muted={media.muted !== false} playsInline controls
      onTimeUpdate={sync} onDurationChange={sync} onLoadedMetadata={sync} onCanPlay={sync} onPlay={sync} onPlaying={sync} onPause={sync} onSeeking={sync} onSeeked={sync} onEnded={sync} onEmptied={sync} onError={sync} onStalled={sync} onWaiting={sync} />
    {visible && !failure && overlay}
    {failure && <div className="media-playback-error" role="alert">Video playback failed.<details><summary>Playback diagnostics</summary><code style={{ overflowWrap: 'anywhere' }}>{failure}</code></details></div>}
    {!failure && blocked && <div className="media-playback-error" role="status">{blocked}</div>}
  </>
}

const HeroMedia = ({ project, template }: { project: CTAProject; template: CTATemplateDefinition }) => {
  const media = project.assets.media
  const locale = project.locale
  if (!isMotionMedia(media)) {
    const src = media?.type === 'image' && media.src ? media.src : project.assets.hero?.src
    return src ? <img className="canvas-hero-image" src={src} alt={media?.alt ?? template.preview.heroAlt[locale]} /> : <div className="canvas-hero-placeholder"><span>{template.preview.labels[locale].heroLabel}</span><strong>{project.brand.displayNames[locale]}</strong></div>
  }
  const embedSrc = media?.type === 'embed' ? embedPlaybackUrl(media) : null
  const action = project.actions.find((item) => item.style === 'primary') ?? project.actions[0]
  const overlay = action && <div className="canvas-media-overlay" data-action-type={action.actionType} data-target={action.target}>
    <i><SemanticIcon icon={action.icon} /></i><div><strong>{action.content[locale].label}</strong>{action.content[locale].subtitle && <span>{action.content[locale].subtitle}</span>}</div>
  </div>
  return <div className="canvas-motion-media">
    {media?.type === 'video' && media.src ? <Video key={`${project.id}:${media.id ?? ''}:${media.src}`} project={project} overlay={overlay} /> : embedSrc ? <><iframe key={`${project.id}:${embedSrc}`} src={embedSrc} title={media?.alt ?? `${project.brand.displayNames[locale]} video`} allow="autoplay; encrypted-media; fullscreen" allowFullScreen referrerPolicy="strict-origin-when-cross-origin" />{media?.ctaDisplay !== 'hidden' && overlay}</> : <div className="canvas-hero-placeholder">{media?.type === 'video' ? 'Choose an MP4 or WebM video' : 'Enter a valid YouTube or Vimeo embed URL'}</div>}
  </div>
}

export default HeroMedia
