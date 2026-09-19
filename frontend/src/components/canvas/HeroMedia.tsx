import { useState } from 'react'
import type { CTAProject, CTATemplateDefinition } from '../../types/template'
import { embedPlaybackUrl, isMotionMedia } from '../../utils/media'
import SemanticIcon from './SemanticIcon'

const Video = ({ project }: { project: CTAProject }) => {
  const [failed, setFailed] = useState(false)
  const media = project.assets.media!
  return <><video src={media.src} autoPlay={media.autoplay !== false} loop={media.loop !== false} muted={media.muted !== false} playsInline controls onError={() => setFailed(true)} />{failed && <div className="media-playback-error" role="alert">Video unavailable. Check the local server, file, and browser codec support.</div>}</>
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
  return <div className="canvas-motion-media">
    {media?.type === 'video' && media.src ? <Video key={media.src} project={project} /> : embedSrc ? <iframe src={embedSrc} title={media?.alt ?? `${project.brand.displayNames[locale]} video`} allow="autoplay; encrypted-media; fullscreen" allowFullScreen referrerPolicy="strict-origin-when-cross-origin" /> : <div className="canvas-hero-placeholder">{media?.type === 'video' ? 'Choose an MP4 or WebM video' : 'Enter a valid YouTube or Vimeo embed URL'}</div>}
    {action && <div className="canvas-media-overlay" data-action-type={action.actionType} data-target={action.target}>
      <i><SemanticIcon icon={action.icon} /></i><div><strong>{action.content[locale].label}</strong>{action.content[locale].subtitle && <span>{action.content[locale].subtitle}</span>}</div>
    </div>}
  </div>
}

export default HeroMedia
