import type { CTAProject, CTATemplateDefinition, MetadataValue, SemanticIconName } from '../../types/template'
import AIGeneratePanel from '../ai/AIGeneratePanel'

type Props = { data: CTAProject; template: CTATemplateDefinition; onChange: (data: CTAProject) => void }

const ContentPanel = ({ data, template, onChange }: Props) => {
  const locale = data.locale
  const content = data.content[locale]
  const localeLabels = data.labels[locale]
  const update = <K extends keyof CTAProject>(key: K, value: CTAProject[K]) => onChange({ ...data, [key]: value })
  const updateContent = (patch: Partial<typeof content>) => update('content', { ...data.content, [locale]: { ...content, ...patch } })
  const updateMetadata = (key: string, value: MetadataValue) => update('metadata', { ...data.metadata, [key]: value })

  return (
    <aside className="panel content-panel">
      <div className="panel-heading"><div><h3>Content</h3><span>{data.project.projectType} · {locale}</span></div><span className="engine-badge">Shared core</span></div>
      <AIGeneratePanel data={data} onApply={onChange} />
      <section>
        <strong>Brand</strong>
        <label>Brand wordmark<input value={data.brand.wordmark ?? ''} placeholder="Uses localized brand name when empty" onChange={(event) => update('brand', { ...data.brand, wordmark: event.target.value || undefined })} /></label>
        <label>Localized brand name<input value={data.brand.displayNames[locale]} onChange={(event) => update('brand', { ...data.brand, displayNames: { ...data.brand.displayNames, [locale]: event.target.value } })} /></label>
        <label>Tagline<input value={data.brand.taglines[locale]} onChange={(event) => update('brand', { ...data.brand, taglines: { ...data.brand.taglines, [locale]: event.target.value } })} /></label>
      </section>
      <section>
        <strong>Main content</strong>
        <label>Headline<input value={content.headline} onChange={(event) => updateContent({ headline: event.target.value })} /></label>
        <label>Message<textarea value={content.message} onChange={(event) => updateContent({ message: event.target.value })} /></label>
        <label>{template.preview.labels[locale].featureLabel} (one per line)<textarea value={content.features.join('\n')} onChange={(event) => updateContent({ features: event.target.value.split('\n') })} /></label>
      </section>
      {data.visual.sections.filter((section) => section.contentKey).map((section) => {
        const key = section.contentKey!
        const copy = data.sectionContent[locale][key]
        if (!copy) return null
        const updateCopy = (patch: Partial<typeof copy>) => update('sectionContent', { ...data.sectionContent, [locale]: { ...data.sectionContent[locale], [key]: { ...copy, ...patch } } })
        return <section className="template-copy-section" key={section.id}><strong>{section.type} · {section.variant}</strong><label>Eyebrow<input value={copy.eyebrow ?? ''} onChange={(event) => updateCopy({ eyebrow: event.target.value })} /></label><label>Title<input value={copy.title ?? ''} onChange={(event) => updateCopy({ title: event.target.value })} /></label>{copy.items?.map((item, index) => <div className="action-fields" key={`${item.title}-${index}`}><label>Item {index + 1}<input value={item.title} onChange={(event) => updateCopy({ items: copy.items?.map((current, itemIndex) => itemIndex === index ? { ...current, title: event.target.value } : current) })} /></label><label>Description<input value={item.text ?? ''} onChange={(event) => updateCopy({ items: copy.items?.map((current, itemIndex) => itemIndex === index ? { ...current, text: event.target.value } : current) })} /></label></div>)}</section>
      })}
      <section>
        <strong>CTA actions</strong>
        {data.actions.map((action, index) => {
          const actionContent = action.content[locale]
          const updateAction = (patch: Partial<typeof actionContent>) => update('actions', data.actions.map((item) => item.id === action.id ? { ...item, content: { ...item.content, [locale]: { ...actionContent, ...patch } } } : item))
          const updateActionVisual = (patch: Partial<typeof action>) => update('actions', data.actions.map((item) => item.id === action.id ? { ...item, ...patch } : item))
          return <div className="action-fields" key={action.id}><label>Action {index + 1}<input value={actionContent.label} onChange={(event) => updateAction({ label: event.target.value })} /></label><label>Subtitle<input value={actionContent.subtitle ?? ''} onChange={(event) => updateAction({ subtitle: event.target.value })} /></label><label>Semantic icon<select value={action.icon?.name ?? 'link'} onChange={(event) => updateActionVisual({ icon: { ...action.icon, name: event.target.value as SemanticIconName } })}><option value="phone">Phone</option><option value="chat">Chat</option><option value="calendar">Calendar</option><option value="monitor">Monitor</option><option value="support">Support</option><option value="mail">Mail</option><option value="link">Link</option></select></label><label>Custom icon reference<input value={action.icon?.src ?? ''} placeholder="Optional asset URL or reference" onChange={(event) => updateActionVisual({ icon: { ...action.icon, src: event.target.value || undefined } })} /></label><label>Visual style<select value={action.style} onChange={(event) => updateActionVisual({ style: event.target.value as typeof action.style })}><option value="primary">Primary</option><option value="secondary">Secondary</option><option value="tertiary">Tertiary</option></select></label></div>
        })}
      </section>
      <section>
        <strong>Contact</strong>
        {template.editor.contactFields.filter((field) => field !== 'qrDestination').map((field) => {
          const rawValue = data.contact[field]
          const value = field === 'location' && typeof rawValue === 'object' ? rawValue[locale] : String(rawValue ?? '')
          const label = localeLabels.contact[field] ?? field[0].toUpperCase() + field.slice(1)
          const updateContact = (nextValue: string) => field === 'location'
            ? update('contact', { ...data.contact, location: { ko: '', en: '', ja: '', ...data.contact.location, [locale]: nextValue } })
            : update('contact', { ...data.contact, [field]: nextValue })
          return <label key={field}>{label}<input value={value} onChange={(event) => updateContact(event.target.value)} /></label>
        })}
        {template.editor.contactFields.includes('qrDestination') && <label>{localeLabels.qrLabel}<input value={data.contact.qrDestination ?? ''} onChange={(event) => update('contact', { ...data.contact, qrDestination: event.target.value })} /></label>}
      </section>
      <section className="metadata-section">
        <strong>Template metadata</strong>
        <small>Stored outside the reusable core fields</small>
        {template.metadataFields.map((field) => {
          const value = data.metadata[field.key]
          const displayValue = Array.isArray(value) ? value.join('\n') : String(value ?? '')
          return field.type === 'list' ? <label key={field.key}>{field.label}<textarea value={displayValue} onChange={(event) => updateMetadata(field.key, event.target.value.split('\n'))} /></label> : <label key={field.key}>{field.label}<input value={displayValue} onChange={(event) => updateMetadata(field.key, event.target.value)} /></label>
        })}
      </section>
    </aside>
  )
}

export default ContentPanel
