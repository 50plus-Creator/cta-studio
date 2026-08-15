import type { CSSProperties } from 'react'
import type { CTAProject, CTATemplateDefinition } from '../../types/template'
import { toFontFamily } from '../../utils/fonts'
import SectionRenderer from './SectionRenderer'

type Props = { project: CTAProject; template: CTATemplateDefinition }

const TemplateRenderer = ({ project, template }: Props) => {
  const heading = template.style.typography?.headingFont ?? project.brand.typography.headingFont
  const body = template.style.typography?.bodyFont ?? project.brand.typography.bodyFont
  return (
    <div className="template-renderer" style={{ '--canvas-heading-font': toFontFamily(heading), '--canvas-body-font': toFontFamily(body) } as CSSProperties}>
      {project.assets.background?.src && <img className="canvas-background-asset" src={project.assets.background.src} alt="" />}
      {[...project.visual.sections].sort((a, b) => a.order - b.order).map((section) => section.visible && <SectionRenderer key={section.id} project={project} template={template} section={section} />)}
      {project.assets.decorative?.src && <img className="canvas-decorative-asset" src={project.assets.decorative.src} alt="" />}
    </div>
  )
}

export default TemplateRenderer
