import type { CSSProperties, ReactNode } from 'react'
import type { CTAProject, CTATemplateDefinition, LocalizedSectionContent, TextStyleRole, VisualSection } from '../../types/template'
import SemanticIcon from './SemanticIcon'

type Props = { project: CTAProject; template: CTATemplateDefinition; section: VisualSection }
const contactIcons = { website: 'link', email: 'mail', phone: 'phone' } as const
const roleStyle = (section: VisualSection, role: TextStyleRole): CSSProperties => {
  const value = section.style.textStyles[role]
  if (!value) return {}
  return { fontFamily: value.fontRole === 'headingFont' ? 'var(--canvas-heading-font)' : 'var(--canvas-body-font)', fontSize: value.fontSize, fontWeight: value.fontWeight, lineHeight: value.lineHeight, color: value.color, letterSpacing: value.letterSpacing, textAlign: value.textAlign }
}

const SectionRenderer = ({ project, template, section }: Props) => {
  const locale = project.locale, content = project.content[locale], labels = project.labels[locale]
  const sectionCopy = section.contentKey ? project.sectionContent[locale][section.contentKey] : undefined
  const rawStyle: CSSProperties = { height: section.layout.minHeight, minHeight: section.layout.minHeight, flex: '0 0 auto', padding: `${section.layout.padding.top}px ${section.layout.padding.right}px ${section.layout.padding.bottom}px ${section.layout.padding.left}px`, gap: section.layout.gap, background: section.style.background, borderColor: section.style.borderColor, borderWidth: section.style.borderWidth, borderStyle: section.style.borderWidth ? 'solid' : 'none', borderRadius: section.style.radius }
  let body: ReactNode

  switch (section.type) {
    case 'brand': body = <><div className="canvas-brand-lockup">{project.assets.logo?.src && <img className="canvas-brand-logo" src={project.assets.logo.src} alt="" />}<div className="canvas-brand-mark" style={roleStyle(section, 'eyebrow')}>{project.brand.wordmark ?? project.brand.displayNames[locale]}</div></div><div className="canvas-brand-tagline" style={roleStyle(section, 'caption')}>{project.brand.taglines[locale]}</div></>; break
    case 'headline': body = <><span className="canvas-eyebrow" style={roleStyle(section, 'eyebrow')}>{template.preview.labels[locale].heroLabel}</span><h1 style={roleStyle(section, 'headline')}>{content.headline}</h1><p style={roleStyle(section, 'supporting')}>{content.message}</p></>; break
    case 'hero': body = project.assets.hero?.src ? <img className="canvas-hero-image" src={project.assets.hero.src} alt={template.preview.heroAlt[locale]} /> : <div className="canvas-hero-placeholder"><span>{template.preview.labels[locale].heroLabel}</span><strong>{project.brand.displayNames[locale]}</strong></div>; break
    case 'features': {
      const items: NonNullable<LocalizedSectionContent['items']> = sectionCopy?.items ?? content.features.map((item) => ({ title: item }))
      body = <><span className="canvas-eyebrow" style={roleStyle(section, 'eyebrow')}>{sectionCopy?.eyebrow ?? template.preview.labels[locale].featureLabel}</span>{sectionCopy?.title && <h2 style={roleStyle(section, 'headline')}>{sectionCopy.title}</h2>}<div className="visual-card-grid">{items.map((item, index) => { const itemVisual = section.itemVisuals?.[index]; return <div className="visual-info-card" style={{ background: section.style.cardBackground, borderColor: section.style.cardBorderColor }} key={`${item.title}-${index}`}>{itemVisual?.image?.src ? <img className="visual-item-image" src={itemVisual.image.src} alt="" /> : <i className="visual-item-icon" style={{ background: section.style.iconBackground, color: section.style.iconColor }}><SemanticIcon icon={itemVisual?.icon} /></i>}<div className="visual-info-copy"><strong style={roleStyle(section, 'body')}>{item.title}</strong>{item.text && <p style={roleStyle(section, 'body')}>{item.text}</p>}</div></div> })}</div></>; break
    }
    case 'actions': body = <div className="visual-action-grid">{project.actions.map((action) => { const copy = action.content[locale], visual = section.style.actionCards?.[action.style]; return <div className={`visual-action-card ${action.style}`} style={{ background: visual?.background, borderColor: visual?.borderColor }} key={action.id} data-action-type={action.actionType} data-target={action.target}><i style={{ background: visual?.iconBackground, color: visual?.iconColor }}><SemanticIcon icon={action.icon} /></i><strong style={roleStyle(section, 'ctaLabel')}>{copy.label}</strong>{copy.subtitle && <span style={roleStyle(section, 'ctaSubtitle')}>{copy.subtitle}</span>}</div> })}</div>; break
    case 'contact': {
      const fields = template.editor.contactFields.filter((field) => field !== 'qrDestination').flatMap((field) => { const raw = project.contact[field], value = field === 'location' && typeof raw === 'object' ? raw[locale] : typeof raw === 'string' ? raw : undefined; return value ? [{ field, label: labels.contact[field], value }] : [] })
      body = <div className="visual-contact-panel" style={{ background: section.style.cardBackground }}><div className="visual-contact-details">{fields.map((item) => <div className="visual-contact-item" key={item.field}>{item.field in contactIcons && <i style={{ color: section.style.iconColor }}><SemanticIcon icon={{ name: contactIcons[item.field as keyof typeof contactIcons] }} /></i>}<div><span style={roleStyle(section, 'caption')}>{item.label}</span><strong style={roleStyle(section, 'body')}>{item.value}</strong></div></div>)}</div>{project.contact.qrDestination && <div className="visual-qr">{project.contact.qrImage?.src ? <img className="qr-image" style={{ width: section.style.qrSize, height: section.style.qrSize }} src={project.contact.qrImage.src} alt={labels.qrLabel} /> : <div className="qr-pattern" style={{ width: section.style.qrSize, height: section.style.qrSize }} aria-label="QR placeholder" />}<strong style={roleStyle(section, 'caption')}>{labels.qrLabel}</strong></div>}</div>; break
    }
    case 'footer': body = <><div className="canvas-footer-brand">{project.assets.logo?.src && <img className="canvas-footer-logo" src={project.assets.logo.src} alt="" />}<strong style={roleStyle(section, 'body')}>{project.brand.wordmark ?? project.brand.displayNames[locale]}</strong></div><div className="canvas-footer-copy"><span style={roleStyle(section, 'caption')}>{project.brand.taglines[locale]}</span><span style={roleStyle(section, 'caption')}>{labels.footerText}</span></div></>; break
  }
  return <section className={`visual-section section-${section.type} variant-${section.variant ?? 'default'}`} style={rawStyle} data-section-id={section.id}>{body}</section>
}

export default SectionRenderer
