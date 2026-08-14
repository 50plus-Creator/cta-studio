import heroImg from '../../assets/hero.png'

const realEstateTemplate = {
  id: 'real-estate-vertical',
  name: 'Real-estate Vertical',
  brand: {
    name: 'Acme Realty',
    logo: '',
  },
  content: {
    headline: 'Modern 2BR Apartment',
    message: 'Close to subway, great view and amenities.',
    features: ['2 bedrooms', '1 bath', '1200 sqft', 'Balcony with view'],
    heroImage: heroImg,
  },
  ctas: [
    { label: 'Schedule Visit', action: 'schedule' },
    { label: 'View Details', action: 'details' },
    { label: 'Share', action: 'share' },
  ],
  contact: {
    website: 'www.acme-realty.example',
    phone: '010-1234-5678',
  },
}

export default realEstateTemplate
