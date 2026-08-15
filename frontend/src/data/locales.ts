import type { Locale } from '../types/template'

export const DEFAULT_LOCALE: Locale = 'ko'

export const locales: Array<{ value: Locale; label: string }> = [
  { value: 'ko', label: '한국어' },
  { value: 'en', label: 'English' },
  { value: 'ja', label: '日本語' },
]
