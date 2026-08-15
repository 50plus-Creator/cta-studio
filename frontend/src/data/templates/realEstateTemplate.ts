import type { CTATemplateDefinition } from '../../types/template'
import realEstateVisual from '../visual/realEstateVisual'

const realEstateTemplate: CTATemplateDefinition = {
  id: 'real-estate-vertical-v1', name: 'Real Estate Premium Vertical', category: 'Real Estate', version: 1,
  description: 'A vertical property campaign with strong imagery, actions, and contact details.',
  editor: { contactFields: ['phone', 'website', 'location', 'qrDestination'] },
  style: { accentColor: '#7055d9' },
  preview: {
    heroAlt: { ko: '대표 부동산 이미지', en: 'Featured property', ja: '注目の物件' },
    labels: {
      ko: { heroLabel: '추천 매물', featureLabel: '주요 특징' },
      en: { heroLabel: 'Featured property', featureLabel: 'Property highlights' },
      ja: { heroLabel: 'おすすめ物件', featureLabel: '物件の特徴' },
    },
  },
  metadataFields: [
    { key: 'propertyName', label: 'Property name', type: 'text' },
    { key: 'unitType', label: 'Unit type', type: 'text' },
    { key: 'modelHouseLocation', label: 'Model house location', type: 'text' },
  ],
  visualDefaults: realEstateVisual,
}

export default realEstateTemplate
