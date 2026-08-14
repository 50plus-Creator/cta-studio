import React from 'react'
import type { TemplateData } from '../../types/template'

type Props = { data: TemplateData; onChange: (d: TemplateData) => void }

const ContentPanel: React.FC<Props> = ({ data, onChange }) => {
  const update = (patch: Partial<TemplateData['content']>) => {
    onChange({ ...data, content: { ...data.content, ...patch } })
  }

  const updateBrand = (patch: Partial<TemplateData['brand']>) => {
    onChange({ ...data, brand: { ...data.brand, ...patch } })
  }

  const updateContact = (patch: Partial<TemplateData['contact']>) => {
    onChange({ ...data, contact: { ...data.contact, ...patch } })
  }

  const updateCTA = (index: number, label: string) => {
    const ctas = data.ctas.map((c, i) => (i === index ? { ...c, label } : c))
    onChange({ ...data, ctas })
  }

  return (
    <aside className="panel content-panel">
      <h3>Content</h3>

      <section>
        <strong>Brand</strong>
        <label>Brand name</label>
        <input value={data.brand.name} onChange={(e) => updateBrand({ name: e.target.value })} />
      </section>

      <section style={{ marginTop: 12 }}>
        <strong>Main Content</strong>
        <label>Headline</label>
        <input value={data.content.headline} onChange={(e) => update({ headline: e.target.value })} />
        <label>Message</label>
        <textarea value={data.content.message} onChange={(e) => update({ message: e.target.value })} />
        <label>Features (one per line)</label>
        <textarea value={data.content.features.join('\n')} onChange={(e) => update({ features: e.target.value.split('\n') })} />
      </section>

      <section style={{ marginTop: 12 }}>
        <strong>CTAs</strong>
        {data.ctas.map((c, i) => (
          <div key={i} style={{ marginBottom: 8 }}>
            <label>Button {i + 1} label</label>
            <input value={c.label} onChange={(e) => updateCTA(i, e.target.value)} />
          </div>
        ))}
      </section>

      <section style={{ marginTop: 12 }}>
        <strong>Contact / QR</strong>
        <label>Website / QR URL</label>
        <input value={data.contact.website || ''} onChange={(e) => updateContact({ website: e.target.value })} />
        <label>Phone</label>
        <input value={data.contact.phone || ''} onChange={(e) => updateContact({ phone: e.target.value })} />
      </section>
    </aside>
  )
}

export default ContentPanel
