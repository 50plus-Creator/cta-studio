import PageHeader from '../components/PageHeader'
import type { PageId } from '../types/navigation'

type Props = { onNavigate: (page: PageId) => void }

const cards = [
  { title: 'Recent Projects', value: '3', note: 'Mock projects in this workspace', icon: '▦' },
  { title: 'Recent Exports', value: '0', note: 'Exports will appear here', icon: '⇩' },
  { title: 'Available Templates', value: '2', note: 'Real Estate + BRIVION validation', icon: '◇' },
  { title: 'Brand Assets', value: '0', note: 'Add a brand kit later', icon: '◉' },
]

const DashboardPage = ({ onNavigate }: Props) => (
  <div className="page-content">
    <PageHeader
      eyebrow="Overview"
      title="Good to see you."
      description="Create, organize, and prepare reusable calls to action from one workspace."
      action={<button className="primary-button" onClick={() => onNavigate('editor')}>Quick create CTA</button>}
    />
    <section className="metric-grid" aria-label="Workspace summary">
      {cards.map((card) => (
        <article className="metric-card" key={card.title}>
          <span className="card-icon" aria-hidden="true">{card.icon}</span>
          <span>{card.title}</span>
          <strong>{card.value}</strong>
          <small>{card.note}</small>
        </article>
      ))}
    </section>
    <section className="content-card dashboard-recent">
      <div className="section-heading"><div><span className="eyebrow">Continue working</span><h2>Recent projects</h2></div><button className="text-button" onClick={() => onNavigate('projects')}>View all</button></div>
      <div className="project-row">
        <div className="project-thumbnail">RE</div>
        <div><strong>Demo Real Estate</strong><p>Real Estate · Vertical CTA</p></div>
        <span className="status-pill">Draft</span>
        <button className="secondary-button" onClick={() => onNavigate('editor')}>Open editor</button>
      </div>
    </section>
  </div>
)

export default DashboardPage
