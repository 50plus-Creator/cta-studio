import type { CTATemplateDefinition } from '../../types/template'
import brivionVisual from '../visual/brivionVisual'

const brivionTemplate: CTATemplateDefinition = {
  id: 'brivion-education-vertical-v1',
  name: 'BRIVION Education Vertical',
  category: 'Education / BRIVION',
  version: 1,
  description: 'A polished vertical campaign layout for the BRIVION AI learning platform.',
  editor: { contactFields: ['website', 'email'] },
  style: { accentColor: '#18a866' },
  preview: {
    heroAlt: { ko: 'BRIVION AI 학습 캐릭터', en: 'BRIVION AI learning character', ja: 'BRIVION AI学習キャラクター' },
    labels: {
      ko: { heroLabel: 'AI LEARNING PLATFORM', featureLabel: '배움이 달라지는 3가지 경험' },
      en: { heroLabel: 'AI LEARNING PLATFORM', featureLabel: 'Three ways learning changes' },
      ja: { heroLabel: 'AI学習プラットフォーム', featureLabel: '学びを変える3つの体験' },
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
