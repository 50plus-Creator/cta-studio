import { navigationItems } from '../data/navigation'
import type { PageId } from '../types/navigation'

type Props = { activePage: PageId }

const Topbar = ({ activePage }: Props) => {
  const pageTitle = navigationItems.find((item) => item.id === activePage)?.label

  return (
    <header className="topbar">
      <div>
        <span className="topbar-kicker">Workspace</span>
        <strong className="topbar-title">{pageTitle}</strong>
      </div>
      {activePage === 'editor' && (
        <div className="topbar-project">
          <span className="core-model-badge">One core model · Two validation datasets</span>
          <span className="save-status"><span aria-hidden="true">●</span> Local mock data</span>
        </div>
      )}
    </header>
  )
}

export default Topbar
