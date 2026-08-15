import type { CTAProject } from '../../types/template'
import { DEFAULT_LOCALE } from '../locales'
import brivionVisual from '../visual/brivionVisual'
import { visualSnapshot } from '../visual/helpers'

const brivionProject: CTAProject = {
  id: 'demo-brivion',
  locale: DEFAULT_LOCALE,
  project: { name: 'BRIVION Campaign', projectType: 'education', status: 'concept', lastModified: '2026-08-15T01:40:00+09:00' },
  brand: {
    name: 'brivion',
    wordmark: 'BRIVION',
    displayNames: { ko: 'BRIVION', en: 'BRIVION', ja: 'BRIVION' },
    taglines: { ko: 'AI 교육 플랫폼', en: 'AI Education Platform', ja: 'AI教育プラットフォーム' },
    colors: { primary: '#147d74', secondary: '#e5f4f1', accent: '#147d74', text: '#172033', background: '#ffffff' },
    typography: {
      headingFont: { family: 'Inter', source: 'system', fallbacks: ['Noto Sans KR', 'Noto Sans JP', 'system-ui', 'sans-serif'] },
      bodyFont: { family: 'Inter', source: 'system', fallbacks: ['Noto Sans KR', 'Noto Sans JP', 'system-ui', 'sans-serif'] },
    },
  },
  template: { id: 'brivion-education-vertical-v1', version: 1 },
  content: {
    ko: { headline: '미래 교육을 지금 시작하세요', message: 'AI 맞춤 학습부터 수업 운영과 성장 기록까지, 하나의 플랫폼에서 연결합니다.', features: ['AI 맞춤 학습', '학습 분석', '수업 관리', '성장 기록'] },
    en: { headline: 'Start the future of learning today', message: 'Connect personalized AI learning, class management, analytics, and growth records in one platform.', features: ['Personalized AI Learning', 'Learning Analytics', 'Class Management', 'Growth Records'] },
    ja: { headline: '未来の学びを今始めよう', message: 'AI個別学習、授業管理、学習分析、成長記録をひとつのプラットフォームでつなぎます。', features: ['AI個別学習', '学習分析', '授業管理', '成長記録'] },
  },
  actions: [
    { id: 'demo', actionType: 'link', target: 'https://brivion.example/demo', style: 'primary', icon: { name: 'monitor' }, content: { ko: { label: '데모 신청', subtitle: '플랫폼 직접 체험' }, en: { label: 'Apply for Demo', subtitle: 'Experience the platform' }, ja: { label: 'デモ申込', subtitle: 'プラットフォームを体験' } } },
    { id: 'consult', actionType: 'message', style: 'secondary', icon: { name: 'chat' }, content: { ko: { label: '카카오톡 상담', subtitle: '교육 도입 상담' }, en: { label: 'KakaoTalk Consult', subtitle: 'Chat with our team' }, ja: { label: 'カカオトーク相談', subtitle: '導入について相談' } } },
    { id: 'inquiry', actionType: 'email', target: 'mailto:education@brivion.example', style: 'tertiary', icon: { name: 'support' }, content: { ko: { label: '교육 문의', subtitle: '기관·학교 문의' }, en: { label: 'Education Inquiry', subtitle: 'For schools and institutions' }, ja: { label: '教育のお問い合わせ', subtitle: '学校・法人向け' } } },
  ],
  contact: { website: 'brivion.example', email: 'education@brivion.example', phone: '02-1234-5678', qrDestination: 'https://brivion.example/demo' },
  assets: {},
  outputSettings: { width: 1080, height: 1920, format: 'png', transparent: false },
  integrationOutput: { enabled: false },
  labels: {
    ko: { contact: { website: '홈페이지', email: '이메일', phone: '전화번호' }, qrLabel: '데모 바로가기', footerText: '미래 교육을 연결하는 AI 학습 경험' },
    en: { contact: { website: 'Website', email: 'Email', phone: 'Phone' }, qrLabel: 'Open demo', footerText: 'Connected AI learning for the future' },
    ja: { contact: { website: 'ウェブサイト', email: 'メール', phone: '電話番号' }, qrLabel: 'デモを見る', footerText: '未来の教育をつなぐAI学習体験' },
  },
  sectionContent: {
    ko: {
      audience: { eyebrow: '누구나 함께 성장하는 AI 교육', title: '관리자 · 교사 · 학생을 하나로', items: [{ title: '관리자', text: '교육 현황과 운영을 한눈에' }, { title: '교사', text: '수업 준비부터 평가까지' }, { title: '학생', text: '직접 만들며 배우는 AI' }] },
      capabilities: { eyebrow: '핵심 기능', title: '배움의 모든 순간을 연결합니다', items: [{ title: 'AI 맞춤 학습', text: '학습자별 최적 경로 추천' }, { title: '학습 분석', text: '성과와 참여도를 한눈에' }, { title: '수업 관리', text: '준비부터 평가까지 간편하게' }, { title: '성장 기록', text: '배움의 변화를 지속적으로' }] },
    },
    en: {
      audience: { eyebrow: 'AI learning for every role', title: 'Connect leaders, teachers, and learners', items: [{ title: 'Leaders', text: 'See learning operations clearly' }, { title: 'Teachers', text: 'Plan, teach, and assess' }, { title: 'Students', text: 'Learn AI by creating' }] },
      capabilities: { eyebrow: 'Core features', title: 'Connect every moment of learning', items: [{ title: 'Personalized AI Learning', text: 'Recommend the right learning path' }, { title: 'Learning Analytics', text: 'See progress and engagement' }, { title: 'Class Management', text: 'Plan, teach, and assess with ease' }, { title: 'Growth Records', text: 'Keep every learning milestone' }] },
    },
    ja: {
      audience: { eyebrow: 'すべての役割のためのAI学習', title: '管理者・教員・学生をひとつに', items: [{ title: '管理者', text: '教育運営をひと目で確認' }, { title: '教員', text: '授業準備から評価まで' }, { title: '学生', text: '作りながらAIを学ぶ' }] },
      capabilities: { eyebrow: '主な機能', title: '学びのすべての瞬間をつなぐ', items: [{ title: 'AI個別学習', text: '一人ひとりに最適な学習経路' }, { title: '学習分析', text: '成果と参加状況を可視化' }, { title: '授業管理', text: '準備から評価まで簡単に' }, { title: '成長記録', text: '学びの変化を継続的に記録' }] },
    },
  },
  visual: visualSnapshot(brivionVisual),
  metadata: { educationAudience: 'Educators and institutions', demoType: 'Guided platform demo', productModules: ['AI foundations', 'Prompt practice', 'Project studio'] },
}

export default brivionProject
