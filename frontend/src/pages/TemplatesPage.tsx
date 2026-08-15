import PageHeader from '../components/PageHeader'
import { templateDefinitions } from '../data/templates'

const categories = ['Real Estate', 'Education / BRIVION', 'YouTube End Screen', 'Social Media CTA', 'Business / Promotion']

const TemplatesPage = () => (
  <div className="page-content">
    <PageHeader eyebrow="Reusable foundations" title="Templates" description="Start with a purpose-built layout, then apply brand assets and content." />
    <div className="category-list">{categories.map((category, index) => <button className={index === 0 ? 'category-chip active' : 'category-chip'} key={category}>{category}</button>)}</div>
    <section className="template-grid">
      {templateDefinitions.map((template) => <article className="template-card" key={template.id}><div className="template-preview" style={{ background: template.style.accentColor }}><div className="template-mini"><span /><strong /><i /><i /><i /></div></div><div><span className="status-pill">Validation ready</span><h2>{template.name}</h2><p>{template.description}</p><small className="template-version">Core contract · v{template.version}</small></div></article>)}
      <article className="template-card muted"><div className="template-preview placeholder">+</div><div><span className="status-pill">Planned</span><h2>More templates</h2><p>New categories and formats will be added without changing project content.</p></div></article>
    </section>
  </div>
)

export default TemplatesPage
