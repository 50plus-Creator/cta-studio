import type { MediaAsset } from '../types/template'

// Only known embed providers: never render arbitrary user-supplied HTML/URLs.
export const normalizeEmbedUrl = (value: string): string | null => {
  try {
    const url = new URL(value.trim())
    if (url.protocol !== 'https:' || url.username || url.password || url.port) return null
    const host = url.hostname.toLowerCase()
    if (['youtube.com', 'www.youtube.com', 'm.youtube.com', 'youtube-nocookie.com', 'www.youtube-nocookie.com', 'youtu.be'].includes(host)) {
      const id = host === 'youtu.be' ? url.pathname.slice(1) : url.pathname === '/watch' ? url.searchParams.get('v') : /^\/(?:embed|shorts)\/([^/]+)\/?$/.exec(url.pathname)?.[1]
      return id && /^[\w-]{11}$/.test(id) ? `https://www.youtube.com/embed/${id}` : null
    }
    if (host === 'player.vimeo.com' && /^\/video\/\d+\/?$/.test(url.pathname)) return `https://player.vimeo.com${url.pathname}`
    return null
  } catch { return null }
}

export const embedPlaybackUrl = (media: MediaAsset): string | null => {
  const normalized = normalizeEmbedUrl(media.src)
  if (!normalized) return null
  const url = new URL(normalized)
  url.searchParams.set('autoplay', media.autoplay === false ? '0' : '1')
  url.searchParams.set(url.hostname === 'player.vimeo.com' ? 'muted' : 'mute', media.muted === false ? '0' : '1')
  url.searchParams.set('loop', media.loop === false ? '0' : '1')
  url.searchParams.set('playsinline', '1')
  if (url.hostname === 'www.youtube.com' && media.loop !== false) url.searchParams.set('playlist', url.pathname.split('/').pop()!)
  return url.toString()
}

export const isMotionMedia = (media?: MediaAsset) => media?.type === 'video' || media?.type === 'embed'
