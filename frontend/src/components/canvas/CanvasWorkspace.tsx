import { useLayoutEffect, useRef, useState } from 'react'
import type { CTAProject, CTATemplateDefinition } from '../../types/template'
import TemplateRenderer from './TemplateRenderer'

type ZoomMode = 'fit' | '25' | '33' | '50'
type Props = { project: CTAProject; template: CTATemplateDefinition }

const CanvasWorkspace = ({ project, template }: Props) => {
  const workspaceRef = useRef<HTMLDivElement>(null)
  const [zoom, setZoom] = useState<ZoomMode>('fit')
  const [fitScale, setFitScale] = useState(.33)

  useLayoutEffect(() => {
    const workspace = workspaceRef.current
    if (!workspace) return
    const measure = () => setFitScale(Math.min((workspace.clientWidth - 48) / 1080, (workspace.clientHeight - 104) / 1920))
    measure()
    const observer = new ResizeObserver(measure)
    observer.observe(workspace)
    return () => observer.disconnect()
  }, [])

  const scale = zoom === 'fit' ? Math.max(.1, fitScale) : Number(zoom) / 100

  return (
    <main className="canvas-workspace" ref={workspaceRef}>
      <div className="canvas-toolbar">
        <div><span>Visual canvas</span><strong>1080 × 1920</strong></div>
        <div className="zoom-control" aria-label="Canvas zoom">
          {(['fit', '25', '33', '50'] as ZoomMode[]).map((option) => <button type="button" className={zoom === option ? 'active' : ''} onClick={() => setZoom(option)} key={option}>{option === 'fit' ? 'Fit' : `${option}%`}</button>)}
        </div>
      </div>
      <div className="canvas-viewport">
        <div className="canvas-scale-frame" style={{ width: 1080 * scale, height: 1920 * scale }}>
          <div className="visual-canvas" style={{ width: 1080, height: 1920, transform: `scale(${scale})`, backgroundColor: project.visual.background, backgroundImage: project.assets.background?.src ? `url(${project.assets.background.src})` : undefined }} lang={project.locale}>
            <TemplateRenderer project={project} template={template} />
          </div>
        </div>
      </div>
    </main>
  )
}

export default CanvasWorkspace
