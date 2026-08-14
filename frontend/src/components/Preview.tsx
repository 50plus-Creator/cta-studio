import React from 'react'
import heroImg from '../assets/hero.png'

const Preview: React.FC = () => {
  // mock data
  const brand = { name: 'Acme Realty', logo: '' }
  const property = { image: heroImg, headline: 'Modern 2BR Apartment', message: 'Close to subway, great view' }
  const features = ['2 bedrooms', '1 bath', '1200 sqft', 'Balcony with view']

  return (
    <main className="preview">
      <div className="preview-inner">
        <div className="brand">{brand.name}</div>
        <div className="property-image"><img src={property.image} alt="property" /></div>
        <h1 className="headline">{property.headline}</h1>
        <p className="message">{property.message}</p>
        <ul className="features">
          {features.map((f, i) => <li key={i}>{f}</li>)}
        </ul>
        <div className="ctas">
          <button className="primary">Schedule Visit</button>
          <button className="secondary">View Details</button>
          <button className="tertiary">Share</button>
        </div>
        <div className="contact-qr">
          <div className="qr">[QR]</div>
          <div className="contact">
            <div>www.acme-realty.example</div>
            <div>Phone: 010-1234-5678</div>
          </div>
        </div>
        <footer className="brand-footer">© Acme Realty</footer>
      </div>
    </main>
  )
}

export default Preview
