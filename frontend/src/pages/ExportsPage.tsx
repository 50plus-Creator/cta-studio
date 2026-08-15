import EmptyState from '../components/EmptyState'
import PageHeader from '../components/PageHeader'

const formats = ['PNG', 'JPG', 'WebP', 'Video CTA', 'Transparent assets']

const ExportsPage = () => (
  <div className="page-content">
    <PageHeader eyebrow="Output history" title="Exports" description="Review generated assets and their source projects in one place." />
    <section className="format-strip">{formats.map((format) => <div key={format}><span className="card-icon">⇩</span><strong>{format}</strong><small>Planned output</small></div>)}</section>
    <section className="content-card"><div className="section-heading"><div><span className="eyebrow">History</span><h2>Recent exports</h2></div></div><EmptyState icon="⇩" title="No exports yet" description="Export history will appear here once generation is implemented." /></section>
  </div>
)

export default ExportsPage
