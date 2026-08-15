import type { VisualCanvasConfig } from '../../types/template'
import { section, textStyle } from './helpers'

const ink = '#020f26', navy = '#031733', blue = '#087cff', cyan = '#3bc8ff'
const brivionVisual: VisualCanvasConfig = {
  width: 1080, height: 1920, background: ink,
  sections: [
    section('brand', 'brand', 0, 130, ink, { padding: [26, 70, 10, 70], textStyles: { eyebrow: textStyle(46, 900, blue, 'headingFont'), caption: textStyle(22, 700, '#d7ecff') } }),
    section('headline', 'headline', 1, 286, ink, { padding: [0, 70, 28, 70], textStyles: { eyebrow: textStyle(19, 800, cyan), headline: textStyle(58, 900, '#ffffff', 'headingFont', 1.04), supporting: textStyle(23, 500, '#d8e7fa', 'bodyFont', 1.38) } }),
    section('audience', 'features', 2, 420, navy, { variant: 'audience-cards', contentKey: 'audience', itemVisuals: [{ icon: { name: 'administrator' } }, { icon: { name: 'teacher' } }, { icon: { name: 'student' } }], padding: [24, 55, 30, 55], gap: 20, cardBackground: '#071f40', cardBorderColor: '#0e62b6', iconBackground: '#087858', iconColor: '#ffffff', textStyles: { eyebrow: textStyle(16, 850, cyan), headline: textStyle(32, 850, '#ffffff', 'headingFont'), body: textStyle(18, 600, '#d8e7fa') } }),
    section('capabilities', 'features', 3, 320, ink, { variant: 'icon-grid', contentKey: 'capabilities', itemVisuals: [{ icon: { name: 'ai-learning' } }, { icon: { name: 'analytics' } }, { icon: { name: 'classroom' } }, { icon: { name: 'growth' } }], padding: [18, 48, 20, 48], gap: 14, cardBackground: '#061a36', cardBorderColor: '#155493', iconBackground: '#082a52', iconColor: cyan, textStyles: { eyebrow: textStyle(14, 850, cyan), headline: textStyle(28, 850, '#ffffff', 'headingFont'), body: textStyle(16, 600, '#e5effc') } }),
    section('actions', 'actions', 4, 304, navy, { variant: 'premium-cards', padding: [24, 55, 26, 55], gap: 18, actionCards: { primary: { background: '#087a39', borderColor: '#32df69', iconBackground: '#ffffff', iconColor: '#087a39' }, secondary: { background: '#d88b00', borderColor: '#ffd223', iconBackground: '#ffffff', iconColor: '#c47d00' }, tertiary: { background: '#0752b7', borderColor: '#34a4ff', iconBackground: '#ffffff', iconColor: '#0752b7' } }, textStyles: { ctaLabel: textStyle(28, 900, '#ffffff', 'headingFont'), ctaSubtitle: textStyle(17, 550, '#ffffff') } }),
    section('contact', 'contact', 5, 340, ink, { variant: 'qr-panel', padding: [20, 55, 22, 55], cardBackground: '#061a36', iconColor: '#ffffff', qrSize: 205, textStyles: { body: textStyle(22, 750, '#ffffff'), caption: textStyle(16, 700, '#bcdcff') }, borderColor: '#1268bd', borderWidth: 2, radius: 28 }),
    section('footer', 'footer', 6, 120, ink, { padding: [16, 70, 16, 70], textStyles: { body: textStyle(38, 900, blue, 'headingFont'), caption: textStyle(16, 550, '#d8e7fa') } }),
  ],
}
export default brivionVisual
