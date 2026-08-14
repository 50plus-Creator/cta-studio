import React from 'react'
import type { TemplateData } from '../../types/template'

type Props = { data: TemplateData }

const SettingsPanel: React.FC<Props> = ({ data }) => {
  return (
    <aside className="panel settings-panel">
      <h3>Design / Export</h3>
      <label>Template</label>
      <select value={data.id} onChange={() => {}}>
        <option value={data.id}>{data.name}</option>
      </select>

      <label style={{ marginTop: 8 }}>Canvas size</label>
      <select>
        <option>1080 x 1920 (Vertical)</option>
        <option>1200 x 630 (Social)</option>
      </select>

      <label style={{ marginTop: 8 }}>Export Format</label>
      <select>
        <option>PNG</option>
        <option>JPG</option>
        <option>WEBP</option>
      </select>

      <label style={{ marginTop: 8 }}>Background</label>
      <select>
        <option>Image</option>
        <option>Color</option>
      </select>

      <div style={{ marginTop: 12 }}>
        <button className="export">Preview Export</button>
        <button className="export" style={{ marginLeft: 8 }}>Export</button>
      </div>
    </aside>
  )
}

export default SettingsPanel
