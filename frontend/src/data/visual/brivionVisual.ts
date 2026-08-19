import type { VisualCanvasConfig } from '../../types/template'
import { section, textStyle } from './helpers'

const mint = '#f5fbf8'
const softMint = '#eaf7f0'
const green = '#18a866'
const deepGreen = '#0c6646'
const navy = '#102d3f'

const brivionVisual: VisualCanvasConfig = {
  width: 1080, height: 1920, background: mint,
  sections: [
    section('brand', 'brand', 0, 130, mint, { padding: [38, 76, 18, 76], textStyles: { eyebrow: textStyle(34, 900, deepGreen, 'headingFont'), caption: textStyle(18, 700, deepGreen) } }),
    section('headline', 'headline', 1, 400, mint, { padding: [35, 76, 42, 76], textStyles: { eyebrow: textStyle(17, 800, green), headline: textStyle(64, 900, navy, 'headingFont', 1.16), supporting: textStyle(27, 600, '#375666', 'bodyFont', 1.55) } }),
    section('hero', 'hero', 2, 510, softMint),
    section('features', 'features', 3, 350, '#ffffff', { padding: [48, 68, 50, 68], gap: 18, itemVisuals: [{ icon: { name: 'ai-learning' } }, { icon: { name: 'analytics' } }, { icon: { name: 'growth' } }], cardBackground: '#f7fcf9', cardBorderColor: '#cce9da', iconBackground: '#def4e8', iconColor: deepGreen, textStyles: { eyebrow: textStyle(17, 800, green), body: textStyle(22, 800, navy, 'headingFont', 1.35) } }),
    section('actions', 'actions', 4, 330, '#ffffff', { padding: [34, 68, 72, 68], gap: 18, actionCards: { primary: { background: green, borderColor: green, iconBackground: '#ffffff', iconColor: deepGreen }, secondary: { background: '#ffffff', borderColor: '#9bcdb4', iconBackground: softMint, iconColor: deepGreen }, tertiary: { background: '#ffffff', borderColor: '#9bcdb4', iconBackground: softMint, iconColor: deepGreen } }, textStyles: { ctaLabel: textStyle(28, 900, '#ffffff', 'headingFont'), ctaSubtitle: textStyle(17, 600, '#eafff3') } }),
    section('footer', 'footer', 5, 130, mint, { padding: [30, 76, 30, 76], textStyles: { body: textStyle(28, 900, navy, 'headingFont'), caption: textStyle(18, 650, deepGreen) } }),
  ],
}

export default brivionVisual
