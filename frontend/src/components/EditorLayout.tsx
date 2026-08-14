import React from 'react'
import Sidebar from './Sidebar'
import Topbar from './Topbar'
import Preview from './Preview'
import ContentPanel from './panels/ContentPanel'
import SettingsPanel from './panels/SettingsPanel'

const EditorLayout: React.FC = () => {
  return (
    <div className="editor-root">
      <Sidebar />
      <div className="main-area">
        <Topbar />
        <div className="editor-body">
          <ContentPanel />
          <Preview />
          <SettingsPanel />
        </div>
      </div>
    </div>
  )
}

export default EditorLayout
