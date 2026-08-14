import React, { useState } from 'react'
import Sidebar from './Sidebar'
import Topbar from './Topbar'
import Preview from './Preview'
import ContentPanel from './panels/ContentPanel'
import SettingsPanel from './panels/SettingsPanel'
import defaultTemplate from '../data/templates/realEstateTemplate'
import type { TemplateData } from '../types/template'

const EditorLayout: React.FC = () => {
  const [template, setTemplate] = useState<TemplateData>(defaultTemplate as TemplateData)

  return (
    <div className="editor-root">
      <Sidebar />
      <div className="main-area">
        <Topbar />
        <div className="editor-body">
          <ContentPanel data={template} onChange={setTemplate} />
          <Preview data={template} />
          <SettingsPanel data={template} />
        </div>
      </div>
    </div>
  )
}

export default EditorLayout
