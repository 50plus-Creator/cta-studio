import React from 'react'
import type { TemplateData } from '../types/template'

type Props = { data: TemplateData }

const Preview: React.FC<Props> = ({ data }) => {
  const { brand, content, ctas, contact } = data

  return (
    <main className="preview">
      <div className="preview-inner">
        <div className="brand">{brand.name}</div>
        <div className="property-image">
          {content.heroImage ? (
            // eslint-disable-next-line jsx-a11y/img-redundant-alt
            <img src={content.heroImage} alt="hero image" />
          ) : (
            <div style={{ height: 200, background: '#e5e7eb', borderRadius: 6 }} />
          )}
        </div>
        <h1 className="headline">{content.headline}</h1>
        <p className="message">{content.message}</p>
        <ul className="features">
          {content.features.map((f, i) => (
            <li key={i}>{f}</li>
          ))}
        </ul>
        <div className="ctas">
          {ctas.map((c, i) => (
            <button key={i} className={i === 0 ? 'primary' : i === 1 ? 'secondary' : 'tertiary'}>
              {c.label}
            </button>
          ))}
        </div>
        <div className="contact-qr">
          <div className="qr">[QR]</div>
          <div className="contact">
            <div>{contact.website}</div>
            <div>Phone: {contact.phone}</div>
          </div>
        </div>
        <footer className="brand-footer">© {brand.name}</footer>
      </div>
    </main>
  )
}

export default Preview
