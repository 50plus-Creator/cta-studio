import PageHeader from '../components/PageHeader'

const sections = [
  { title: 'General', description: 'Workspace name and basic preferences', control: <input defaultValue="CTA Studio Workspace" aria-label="Workspace name" /> },
  { title: 'Default canvas size', description: 'Initial dimensions for new projects', control: <select defaultValue="1080x1920" aria-label="Default canvas size"><option value="1080x1920">1080 × 1920 (Vertical)</option><option value="1200x630">1200 × 630 (Social)</option></select> },
  { title: 'Default export format', description: 'Preferred output for future exports', control: <select defaultValue="png" aria-label="Default export format"><option value="png">PNG</option><option value="jpg">JPG</option><option value="webp">WebP</option></select> },
  { title: 'Storage', description: 'Local and cloud storage options will be configured later', control: <span className="status-pill">Local prototype</span> },
  { title: 'Integration', description: 'API and external system connections will live here', control: <span className="status-pill">Not connected</span> },
]

const SettingsPage = () => (
  <div className="page-content settings-page">
    <PageHeader eyebrow="Workspace preferences" title="Settings" description="Set sensible defaults for new CTA projects and future exports." />
    <section className="content-card settings-list">{sections.map((section) => <div className="settings-row" key={section.title}><div><h2>{section.title}</h2><p>{section.description}</p></div><div className="settings-control">{section.control}</div></div>)}</section>
  </div>
)

export default SettingsPage
