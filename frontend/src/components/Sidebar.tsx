import type { PageId } from '../types/navigation'
import { navigationItems } from '../data/navigation'

type Props = {
  activePage: PageId
  onNavigate: (page: PageId) => void
}

const Sidebar = ({ activePage, onNavigate }: Props) => {
  return (
    <aside className="sidebar">
      <div className="sidebar-brand">
        <span className="brand-mark">C</span>
        <div>
          <strong>CTA Studio</strong>
          <small>Creative workspace</small>
        </div>
      </div>
      <nav aria-label="Main navigation">
        <ul>
          {navigationItems.map((item) => (
            <li key={item.id}>
              <button
                type="button"
                className={activePage === item.id ? 'active' : ''}
                aria-current={activePage === item.id ? 'page' : undefined}
                onClick={() => onNavigate(item.id)}
              >
                <span className="nav-icon" aria-hidden="true">{item.icon}</span>
                {item.label}
              </button>
            </li>
          ))}
        </ul>
      </nav>
      <div className="sidebar-footer">
        <span>Local prototype</span>
        <small>No cloud connection</small>
      </div>
    </aside>
  )
}

export default Sidebar
