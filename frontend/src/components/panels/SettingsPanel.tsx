import React from 'react'

const SettingsPanel: React.FC = () => {
  return (
    <aside className="panel settings-panel">
      <h3>Design / Export</h3>
      <label>Template</label>
      <select>
        <option>Real-estate Vertical</option>
      </select>
      <label>Export Format</label>
      <select>
        <option>PNG</option>
        <option>MP4</option>
      </select>
      <button className="export">Export</button>
    </aside>
  )
}

export default SettingsPanel
