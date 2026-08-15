import heroImage from '../../assets/real-estate-hero-v2.png'
import type { CTAProject } from '../../types/template'
import { DEFAULT_LOCALE } from '../locales'
import realEstateVisual from '../visual/realEstateVisual'
import { visualSnapshot } from '../visual/helpers'

const realEstateProject: CTAProject = {
  id: 'demo-real-estate',
  locale: DEFAULT_LOCALE,
  project: { name: 'Demo Real Estate', projectType: 'real-estate', status: 'draft', lastModified: '2026-08-15T01:32:00+09:00' },
  brand: {
    name: 'acme-realty',
    displayNames: { ko: '아크미 부동산', en: 'Acme Realty', ja: 'アクミ不動産' },
    taglines: { ko: '삶이 머무는 특별한 공간', en: 'Find a place that feels like home', ja: '心からくつろげる住まい' },
    colors: { primary: '#7055d9', secondary: '#eeeafe', accent: '#7055d9', text: '#172033', background: '#ffffff' },
    typography: {
      headingFont: { family: 'Inter', source: 'system', fallbacks: ['Noto Sans KR', 'Noto Sans JP', 'system-ui', 'sans-serif'] },
      bodyFont: { family: 'Inter', source: 'system', fallbacks: ['Noto Sans KR', 'Noto Sans JP', 'system-ui', 'sans-serif'] },
    },
  },
  template: { id: 'real-estate-vertical-v1', version: 1 },
  content: {
    ko: { headline: '도심과 자연을 잇는 새로운 주거 공간', message: '편리한 교통과 탁 트인 전망, 세심하게 설계된 생활 편의를 만나보세요.', features: ['침실 2개', '욕실 1개', '전용 1,200 sqft', '전망 좋은 발코니'] },
    en: { headline: 'Modern 2BR Apartment', message: 'Close to subway, with a great view and thoughtful amenities.', features: ['2 bedrooms', '1 bath', '1,200 sqft', 'Balcony with view'] },
    ja: { headline: '都心と自然をつなぐ新しい住まい', message: '便利な交通、開放的な眺望、快適な設備を備えた住まいです。', features: ['ベッドルーム2室', 'バスルーム1室', '専有面積1,200 sqft', '眺望の良いバルコニー'] },
  },
  actions: [
    { id: 'phone', actionType: 'phone', target: 'tel:01012345678', style: 'primary', icon: { name: 'phone' }, content: { ko: { label: '전화상담', subtitle: '전문 상담원 연결' }, en: { label: 'Call Us', subtitle: 'Speak with an advisor' }, ja: { label: '電話相談', subtitle: '担当者に相談' } } },
    { id: 'kakao', actionType: 'message', target: 'https://open.kakao.com/', style: 'secondary', icon: { name: 'chat' }, content: { ko: { label: '카카오톡 상담', subtitle: '빠른 채팅 상담' }, en: { label: 'KakaoTalk', subtitle: 'Quick chat consultation' }, ja: { label: 'カカオトーク相談', subtitle: 'チャットで相談' } } },
    { id: 'visit', actionType: 'link', target: 'https://www.acme-realty.example/visit', style: 'tertiary', icon: { name: 'calendar' }, content: { ko: { label: '방문예약', subtitle: '모델하우스 예약' }, en: { label: 'Book a Visit', subtitle: 'Reserve a viewing' }, ja: { label: '来場予約', subtitle: '見学を予約' } } },
  ],
  contact: { website: 'www.acme-realty.example', phone: '010-1234-5678', location: { ko: '서울', en: 'Seoul', ja: 'ソウル' }, qrDestination: 'https://www.acme-realty.example' },
  assets: { hero: { src: heroImage } },
  outputSettings: { width: 1080, height: 1920, format: 'png', transparent: false },
  integrationOutput: { enabled: false },
  labels: {
    ko: { contact: { phone: '전화', website: '웹사이트', location: '위치' }, qrLabel: '상세 정보', footerText: '새로운 일상을 만나보세요' },
    en: { contact: { phone: 'Phone', website: 'Website', location: 'Location' }, qrLabel: 'View details', footerText: 'Discover your new home' },
    ja: { contact: { phone: '電話', website: 'ウェブサイト', location: '所在地' }, qrLabel: '詳細を見る', footerText: '新しい暮らしを始めよう' },
  },
  sectionContent: { ko: {}, en: {}, ja: {} },
  visual: visualSnapshot(realEstateVisual),
  metadata: { propertyName: 'Acme River View', unitType: '2BR / 1BA', modelHouseLocation: 'Seoul' },
}

export default realEstateProject
