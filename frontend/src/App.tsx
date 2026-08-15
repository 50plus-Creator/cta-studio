import { useState } from 'react'
import './App.css'
import AppShell from './components/AppShell'
import DashboardPage from './pages/DashboardPage'
import ProjectsPage from './pages/ProjectsPage'
import EditorPage from './pages/EditorPage'
import TemplatesPage from './pages/TemplatesPage'
import BrandAssetsPage from './pages/BrandAssetsPage'
import ExportsPage from './pages/ExportsPage'
import SettingsPage from './pages/SettingsPage'
import type { PageId } from './types/navigation'

function App() {
  const [activePage, setActivePage] = useState<PageId>('editor')

  const pages: Record<PageId, React.ReactNode> = {
    dashboard: <DashboardPage onNavigate={setActivePage} />,
    projects: <ProjectsPage />,
    editor: <EditorPage />,
    templates: <TemplatesPage />,
    'brand-assets': <BrandAssetsPage />,
    exports: <ExportsPage />,
    settings: <SettingsPage />,
  }

  return (
    <AppShell activePage={activePage} onNavigate={setActivePage}>
      {pages[activePage]}
    </AppShell>
  )
}

export default App
