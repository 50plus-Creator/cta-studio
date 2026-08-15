import { useState } from 'react'
import type { CTAProject, TextStyleRole, VisualSection } from '../../types/template'

type Props = { data: CTAProject; onChange: (data: CTAProject) => void }
const roles: TextStyleRole[] = ['eyebrow', 'headline', 'supporting', 'body', 'caption', 'ctaLabel', 'ctaSubtitle']

const VisualSettings = ({ data, onChange }: Props) => {
  const [sectionId, setSectionId] = useState(data.visual.sections[0].id)
  const [role, setRole] = useState<TextStyleRole>('headline')
  const selected = data.visual.sections.find((section) => section.id === sectionId) ?? data.visual.sections[0]
  const activeRole = selected.style.textStyles[role] ? role : (Object.keys(selected.style.textStyles)[0] as TextStyleRole | undefined)
  const textStyle = activeRole ? selected.style.textStyles[activeRole] : undefined
  const updateSection = (updater: (section: VisualSection) => VisualSection) => onChange({ ...data, visual: { ...data.visual, sections: data.visual.sections.map((section) => section.id === selected.id ? updater(section) : section) } })
  const updateLayout = (patch: Partial<VisualSection['layout']>) => updateSection((section) => ({ ...section, layout: { ...section.layout, ...patch } }))
  const updateStyle = (patch: Partial<VisualSection['style']>) => updateSection((section) => ({ ...section, style: { ...section.style, ...patch } }))
  const updateTextStyle = (patch: Partial<NonNullable<typeof textStyle>>) => activeRole && textStyle && updateStyle({ textStyles: { ...selected.style.textStyles, [activeRole]: { ...textStyle, ...patch } } })

  return <section className="visual-settings">
    <strong>Visual editor</strong>
    <label>Canvas background<div className="color-field"><input type="color" value={data.visual.background} onChange={(event) => onChange({ ...data, visual: { ...data.visual, background: event.target.value } })} /><input value={data.visual.background} onChange={(event) => onChange({ ...data, visual: { ...data.visual, background: event.target.value } })} /></div></label>
    <label>Section<select value={selected.id} onChange={(event) => setSectionId(event.target.value)}>{[...data.visual.sections].sort((a, b) => a.order - b.order).map((section) => <option value={section.id} key={section.id}>{section.type} · {section.variant ?? 'default'}</option>)}</select></label>
    <label className="checkbox-label"><input type="checkbox" checked={selected.visible} onChange={(event) => updateSection((section) => ({ ...section, visible: event.target.checked }))} />Section visible</label>
    <label>Section background<div className="color-field"><input type="color" value={selected.style.background} onChange={(event) => updateStyle({ background: event.target.value })} /><input value={selected.style.background} onChange={(event) => updateStyle({ background: event.target.value })} /></div></label>
    <div className="control-grid"><label>Section height<input type="number" value={selected.layout.minHeight} onChange={(event) => updateLayout({ minHeight: Number(event.target.value) })} /></label><label>Gap<input type="number" value={selected.layout.gap} onChange={(event) => updateLayout({ gap: Number(event.target.value) })} /></label><label>Top padding<input type="number" value={selected.layout.padding.top} onChange={(event) => updateLayout({ padding: { ...selected.layout.padding, top: Number(event.target.value) } })} /></label><label>Bottom padding<input type="number" value={selected.layout.padding.bottom} onChange={(event) => updateLayout({ padding: { ...selected.layout.padding, bottom: Number(event.target.value) } })} /></label><label>Radius<input type="number" value={selected.style.radius ?? 0} onChange={(event) => updateStyle({ radius: Number(event.target.value) })} /></label></div>
    <label>Text style role<select value={activeRole ?? ''} onChange={(event) => setRole(event.target.value as TextStyleRole)}>{roles.filter((item) => selected.style.textStyles[item]).map((item) => <option value={item} key={item}>{item}</option>)}</select></label>
    {textStyle && <><div className="control-grid"><label>Font size<input type="number" value={textStyle.fontSize} onChange={(event) => updateTextStyle({ fontSize: Number(event.target.value) })} /></label><label>Weight<input type="number" step="100" value={textStyle.fontWeight} onChange={(event) => updateTextStyle({ fontWeight: Number(event.target.value) })} /></label></div><label>Text color<div className="color-field"><input type="color" value={textStyle.color} onChange={(event) => updateTextStyle({ color: event.target.value })} /><input value={textStyle.color} onChange={(event) => updateTextStyle({ color: event.target.value })} /></div></label></>}
    <label>Heading font<input value={data.brand.typography.headingFont.family} onChange={(event) => onChange({ ...data, brand: { ...data.brand, typography: { ...data.brand.typography, headingFont: { ...data.brand.typography.headingFont, family: event.target.value } } } })} /></label>
    <label>Body font<input value={data.brand.typography.bodyFont.family} onChange={(event) => onChange({ ...data, brand: { ...data.brand, typography: { ...data.brand.typography, bodyFont: { ...data.brand.typography.bodyFont, family: event.target.value } } } })} /></label>
    {selected.itemVisuals?.map((item, index) => <label key={`${selected.id}-visual-${index}`}>Item {index + 1} image reference<input value={item.image?.src ?? ''} placeholder="Optional audience/feature image" onChange={(event) => updateSection((section) => ({ ...section, itemVisuals: section.itemVisuals?.map((current, itemIndex) => itemIndex === index ? { ...current, image: { ...current.image, src: event.target.value || undefined } } : current) }))} /></label>)}
    <label>Logo image reference<input value={data.assets.logo?.src ?? ''} placeholder="Asset URL or reference" onChange={(event) => onChange({ ...data, assets: { ...data.assets, logo: { ...data.assets.logo, src: event.target.value } } })} /></label>
    <label>Background texture reference<input value={data.assets.background?.src ?? ''} placeholder="Background/texture asset only" onChange={(event) => onChange({ ...data, assets: { ...data.assets, background: { ...data.assets.background, src: event.target.value || undefined } } })} /></label>
    <label>Decorative graphic reference<input value={data.assets.decorative?.src ?? ''} placeholder="Optional visual decoration" onChange={(event) => onChange({ ...data, assets: { ...data.assets, decorative: { ...data.assets.decorative, src: event.target.value || undefined } } })} /></label>
    <label>QR image reference<input value={data.contact.qrImage?.src ?? ''} placeholder="Optional QR image; destination remains separate" onChange={(event) => onChange({ ...data, contact: { ...data.contact, qrImage: { ...data.contact.qrImage, src: event.target.value || undefined } } })} /></label>
    <label>Hero image reference<input value={data.assets.hero?.src ?? ''} placeholder="Asset URL or reference" onChange={(event) => onChange({ ...data, assets: { ...data.assets, hero: { ...data.assets.hero, src: event.target.value } } })} /></label>
  </section>
}

export default VisualSettings
