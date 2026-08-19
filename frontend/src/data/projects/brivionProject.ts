import logoImage from '../../../../assets/brivion/logo/brivion-logo-full.png'
import briviImage from '../../../../assets/brivion/mascot/brivi-main.png'
import type { CTAProject } from '../../types/template'
import { DEFAULT_LOCALE } from '../locales'
import brivionVisual from '../visual/brivionVisual'
import { visualSnapshot } from '../visual/helpers'

const brivionProject: CTAProject = {
  id: 'demo-brivion', locale: DEFAULT_LOCALE,
  project: { name: 'BRIVION Campaign', projectType: 'education', status: 'concept', lastModified: '2026-08-20T00:00:00+09:00' },
  brand: {
    name: 'brivion', wordmark: 'BRIVION', displayNames: { ko: 'BRIVION', en: 'BRIVION', ja: 'BRIVION' }, taglines: { ko: 'AI 교육 플랫폼', en: 'AI Education Platform', ja: 'AI教育プラットフォーム' },
    colors: { primary: '#18a866', secondary: '#eaf7f0', accent: '#18a866', text: '#102d3f', background: '#f5fbf8' },
    typography: { headingFont: { family: 'Inter', source: 'system', fallbacks: ['Pretendard', 'Noto Sans KR', 'system-ui', 'sans-serif'] }, bodyFont: { family: 'Inter', source: 'system', fallbacks: ['Pretendard', 'Noto Sans KR', 'system-ui', 'sans-serif'] } },
  },
  template: { id: 'brivion-education-vertical-v1', version: 1 },
  content: {
    ko: { headline: '아이의 생각을 확장하는 AI 학습 플랫폼', message: '질문하고, 생각하고, 표현하며\n배움에 몰입하는 새로운 교육 경험', features: ['질문 중심의 참여형 학습', 'AI 맞춤 상호작용', '교사·학부모 성장 지원'] },
    en: { headline: 'AI Learning That Expands How Children Think', message: 'Ask, think, express,\nand engage in a new learning experience', features: ['Question-led active learning', 'Personalized AI interaction', 'Teacher and parent support'] },
    ja: { headline: '子どもの思考を広げるAI学習プラットフォーム', message: '問い、考え、表現しながら\n学びに没頭する新しい教育体験', features: ['問いを中心とした参加型学習', 'AIによる個別対話', '教師・保護者の成長支援'] },
  },
  actions: [
    { id: 'trial', actionType: 'link', target: 'https://brivion.example/trial', style: 'primary', icon: { name: 'monitor' }, content: { ko: { label: '무료 체험 시작하기' }, en: { label: 'Start Free Trial' }, ja: { label: '無料体験を始める' } } },
    { id: 'inquiry', actionType: 'email', target: 'mailto:education@brivion.example', style: 'secondary', icon: { name: 'chat' }, content: { ko: { label: '도입 문의하기' }, en: { label: 'Contact Us' }, ja: { label: '導入相談' } } },
  ],
  contact: { website: 'brivion.example', email: 'education@brivion.example' },
  assets: { logo: { src: logoImage, alt: 'BRIVION' }, hero: { src: briviImage, alt: 'BRIVION 캐릭터 Brivi' } },
  outputSettings: { width: 1080, height: 1920, format: 'png', transparent: false }, integrationOutput: { enabled: false },
  labels: {
    ko: { contact: { website: '웹사이트', email: '이메일' }, qrLabel: '바로가기', footerText: 'AI와 함께 생각하고 배우는 새로운 교육 경험' },
    en: { contact: { website: 'Website', email: 'Email' }, qrLabel: 'Learn more', footerText: 'A new way to think and learn with AI' },
    ja: { contact: { website: 'ウェブサイト', email: 'メール' }, qrLabel: '詳しく見る', footerText: 'AIとともに考え、学ぶ新しい教育体験' },
  },
  sectionContent: { ko: {}, en: {}, ja: {} }, visual: visualSnapshot(brivionVisual),
  metadata: { dataRevision: 5, educationAudience: 'Children, educators, and parents', demoType: 'Free trial', productModules: ['Question-led learning', 'AI interaction', 'Growth support'] },
}

export default brivionProject
