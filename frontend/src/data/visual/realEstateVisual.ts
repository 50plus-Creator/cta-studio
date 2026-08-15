import type { VisualCanvasConfig } from '../../types/template'
import { section, textStyle } from './helpers'

const gold = '#e9bc62', ivory = '#fff8ea', navy = '#06192b'
const realEstateVisual: VisualCanvasConfig = {
  width: 1080, height: 1920, background: navy,
  sections: [
    section('brand', 'brand', 0, 130, navy, { padding: [38, 72, 15, 72], textStyles: { eyebrow: textStyle(24, 800, gold), caption: textStyle(18, 500, '#d8dfeb') } }),
    section('headline', 'headline', 1, 340, navy, { padding: [12, 72, 38, 72], textStyles: { eyebrow: textStyle(20, 700, gold), headline: textStyle(72, 850, ivory, 'headingFont', 1.06), supporting: textStyle(28, 500, '#dce5ef', 'bodyFont', 1.4) } }),
    section('hero', 'hero', 2, 600, navy, { padding: [0, 45, 22, 45], radius: 32 }),
    section('actions', 'actions', 3, 370, navy, { variant: 'premium-cards', padding: [30, 55, 34, 55], gap: 22, actionCards: { primary: { background: '#123f4b', borderColor: '#36c5b0', iconBackground: '#36c5b0', iconColor: navy }, secondary: { background: '#3d301b', borderColor: gold, iconBackground: gold, iconColor: navy }, tertiary: { background: '#142f4c', borderColor: '#6caeea', iconBackground: '#6caeea', iconColor: navy } }, textStyles: { ctaLabel: textStyle(28, 850, ivory, 'headingFont'), ctaSubtitle: textStyle(17, 500, '#dce5ef') } }),
    section('contact', 'contact', 4, 330, navy, { variant: 'qr-panel', padding: [24, 62, 24, 62], cardBackground: '#0b2238', qrSize: 166, textStyles: { body: textStyle(25, 750, ivory), caption: textStyle(17, 700, gold) }, borderColor: gold, borderWidth: 2, radius: 30 }),
    section('footer', 'footer', 5, 150, navy, { padding: [30, 72, 30, 72], textStyles: { body: textStyle(32, 850, gold, 'headingFont'), caption: textStyle(17, 500, '#cbd5e1') } }),
  ],
}
export default realEstateVisual
