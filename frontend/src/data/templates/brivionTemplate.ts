import type { CTATemplateDefinition } from '../../types/template'
import brivionVisual from '../visual/brivionVisual'

const brivionTemplate: CTATemplateDefinition = {
  id: 'brivion-education-vertical-v1', name: 'BRIVION Education Vertical', category: 'Education / BRIVION', version: 1,
  description: 'An education CTA configuration used to validate the reusable engine architecture.',
  editor: { contactFields: ['website', 'email', 'phone', 'qrDestination'] },
  style: { accentColor: '#147d74' },
  preview: {
    heroAlt: { ko: 'AI 교육 프로그램', en: 'AI education program', ja: 'AI教育プログラム' },
    labels: {
      ko: { heroLabel: 'AI 교육 플랫폼', featureLabel: '교육 특징' },
      en: { heroLabel: 'AI education platform', featureLabel: 'Program highlights' },
      ja: { heroLabel: 'AI教育プラットフォーム', featureLabel: 'プログラムの特徴' },
    },
  },
  metadataFields: [
    { key: 'educationAudience', label: 'Education audience', type: 'text' },
    { key: 'demoType', label: 'Demo type', type: 'text' },
    { key: 'productModules', label: 'Product modules', type: 'list' },
  ],
  visualDefaults: brivionVisual,
}

export default brivionTemplate
