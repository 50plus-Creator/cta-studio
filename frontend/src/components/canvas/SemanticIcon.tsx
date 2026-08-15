import type { IconReference, SemanticIconName } from '../../types/template'

type Props = { icon?: IconReference; className?: string }

const paths: Record<SemanticIconName, React.ReactNode> = {
  phone: <path d="M7 3h4l2 5-3 2a16 16 0 0 0 8 8l2-3 5 2v4c0 2-2 3-4 3C11 23 1 13 1 5c0-2 2-2 6-2Z" />,
  chat: <><path d="M3 4h22v15H12l-6 4v-4H3Z" /><path d="M8 10h12M8 14h8" /></>,
  calendar: <><rect x="3" y="5" width="22" height="20" rx="3" /><path d="M8 2v6M20 2v6M3 11h22M9 17h4v4H9Z" /></>,
  monitor: <><rect x="2" y="3" width="24" height="17" rx="3" /><path d="m12 8 6 4-6 4ZM9 25h10M14 20v5" /></>,
  support: <><path d="M4 15v-3a10 10 0 0 1 20 0v3" /><rect x="2" y="13" width="5" height="9" rx="2" /><rect x="21" y="13" width="5" height="9" rx="2" /><path d="M21 22c-1 3-4 4-7 4" /></>,
  mail: <><rect x="2" y="5" width="24" height="18" rx="3" /><path d="m3 8 11 8L25 8" /></>,
  link: <><path d="m11 17-2 2a5 5 0 0 1-7-7l5-5a5 5 0 0 1 7 0" /><path d="m17 11 2-2a5 5 0 0 1 7 7l-5 5a5 5 0 0 1-7 0M9 14h10" /></>,
  administrator: <><circle cx="14" cy="8" r="5" /><path d="M5 25c1-7 4-10 9-10s8 3 9 10M21 4l4 2v5c0 3-2 5-4 6-2-1-4-3-4-6V6Z" /></>,
  teacher: <><circle cx="9" cy="8" r="4" /><path d="M2 25c1-7 3-10 7-10s6 3 7 10M16 5h10v14h-7M20 9h3M20 13h3" /></>,
  student: <><path d="m2 9 12-6 12 6-12 6Z" /><path d="M7 12v7c4 4 10 4 14 0v-7M25 10v8" /></>,
  'ai-learning': <><path d="M9 5a5 5 0 0 0-5 5c0 2 1 3 2 4-2 3 0 7 4 7 1 3 7 3 8 0 4 0 6-4 4-7 1-1 2-2 2-4a5 5 0 0 0-5-5" /><path d="M14 3v22M9 9h5M14 17h5" /></>,
  analytics: <><path d="M3 24V4M3 24h23" /><path d="m7 19 5-6 4 3 7-9" /><circle cx="23" cy="7" r="2" /></>,
  classroom: <><rect x="3" y="3" width="22" height="15" rx="2" /><path d="M8 25v-7M20 25v-7M8 9h12M8 13h8" /></>,
  growth: <><path d="M4 24c0-10 7-17 18-20" /><path d="M13 7c-5-2-8 1-8 6 5 1 8-1 8-6ZM17 13c6-2 9 1 9 6-5 1-8-1-9-6Z" /></>,
}

const SemanticIcon = ({ icon, className }: Props) => {
  if (icon?.src) return <img className={className} src={icon.src} alt="" />
  return <svg className={className} viewBox="0 0 28 28" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">{paths[icon?.name ?? 'link']}</svg>
}

export default SemanticIcon
