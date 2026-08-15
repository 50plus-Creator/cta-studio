import type { FontReference } from '../types/template'

const quoteFamily = (family: string) => family.includes(' ') && !family.startsWith('"') ? `"${family}"` : family

export const toFontFamily = (font: FontReference) =>
  [font.family, ...font.fallbacks].map(quoteFamily).join(', ')

// Future export renderers should await this before capturing a frame.
export const waitForFonts = async () => {
  if ('fonts' in document) await document.fonts.ready
}
