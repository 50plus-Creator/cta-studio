import { locales } from '../../data/locales'
import type { CTAProject, CTATemplateDefinition, Locale } from '../../types/template'
import VisualSettings from './VisualSettings'

type Props = {
  data: CTAProject
  template: CTATemplateDefinition
  projects: CTAProject[]
  onProjectSelect: (id: string) => void
  onChange: (data: CTAProject) => void
  onSave: () => void
  saveStatus: 'dirty' | 'saving' | 'saved'
  onExport: () => void
  isExporting: boolean
}

const SettingsPanel = ({ data, template, projects, onProjectSelect, onChange, onSave, saveStatus, onExport, isExporting }: Props) => {
  const updateOutput = (patch: Partial<CTAProject['outputSettings']>) => onChange({ ...data, outputSettings: { ...data.outputSettings, ...patch } })

  return (
    <aside className="panel settings-panel">
      <h3>Design / Export</h3>
      <section className="validation-card">
        <span className="eyebrow">Architecture validation</span>
        <strong>Same model, same engine</strong>
        <p>Switch datasets to verify both domains without changing editor components.</p>
      </section>
      <label>CTA project<select value={data.id} onChange={(event) => onProjectSelect(event.target.value)}>{projects.map((project) => <option value={project.id} key={project.id}>{project.project.name}</option>)}</select></label>
      <label>언어 / Language<select value={data.locale} onChange={(event) => onChange({ ...data, locale: event.target.value as Locale })}>{locales.map((locale) => <option value={locale.value} key={locale.value}>{locale.label}</option>)}</select></label>
      <label>Template<input value={template.name} readOnly /></label>
      <label>Canvas coordinates<input value="1080 × 1920 (9:16)" readOnly /></label>
      <VisualSettings data={data} onChange={onChange} />
      <label>Visual export format<select value={data.outputSettings.format} onChange={(event) => updateOutput({ format: event.target.value as CTAProject['outputSettings']['format'] })}><option value="png">PNG</option><option value="jpg">JPG</option><option value="webp">WebP</option><option value="video">Video</option></select></label>
      <label className="checkbox-label"><input type="checkbox" checked={data.outputSettings.transparent} onChange={(event) => updateOutput({ transparent: event.target.checked })} />Transparent background</label>
      <section className="project-save-card">
        <span className={`project-save-status ${saveStatus}`}>
          {saveStatus === 'dirty' ? '● Unsaved changes' : saveStatus === 'saving' ? '● Saving...' : '✓ Saved locally'}
        </span>
        <button className="save-project-button" type="button" onClick={onSave} disabled={saveStatus === 'saving'}>Save Project</button>
      </section>
      <section className="integration-output"><strong>JSON / API integration</strong><p>Separate from visual exports. Not enabled in Phase 3.</p></section>
      <div className="architecture-flow" aria-label="CTA architecture flow"><span>Project</span><b>↓</b><span>Template + Brand + Assets</span><b>↓</b><span>Preview</span><b>↓</b><span>Export</span></div>
      <div className="export-actions"><button className="export" disabled>Preview Export</button><button className="export" type="button" onClick={onExport} disabled={data.outputSettings.format !== 'png' || isExporting}>{isExporting ? 'Exporting...' : 'Export PNG'}</button></div>
      <small className="disabled-note">PNG export is available. Other formats and preview export are not available yet.</small>
    </aside>
  )
}

export default SettingsPanel
