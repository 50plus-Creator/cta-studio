import type { CTAProject, CTATemplateDefinition } from '../types/template'
import CanvasWorkspace from './canvas/CanvasWorkspace'

type Props = { data: CTAProject; template: CTATemplateDefinition }

const Preview = ({ data, template }: Props) => <CanvasWorkspace project={data} template={template} />

export default Preview
