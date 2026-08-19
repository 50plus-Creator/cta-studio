import type { ReactNode } from 'react'
import type { PageId } from '../types/navigation'
import Sidebar from './Sidebar'
import Topbar from './Topbar'

type Props = {
  activePage: PageId
  onNavigate: (page: PageId) => void
  children: ReactNode
}

const AppShell = ({ activePage, onNavigate, children }: Props) => (
  <div className="app-shell notranslate" translate="no">
    <Sidebar activePage={activePage} onNavigate={onNavigate} />
    <div className="main-area">
      <Topbar activePage={activePage} />
      <div className={activePage === 'editor' ? 'page-stage editor-stage' : 'page-stage'}>
        {children}
      </div>
    </div>
  </div>
)

export default AppShell
