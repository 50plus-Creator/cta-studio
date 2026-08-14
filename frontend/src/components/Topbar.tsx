import React from 'react'

const Topbar: React.FC = () => {
  return (
    <header className="topbar">
      <div className="title">CTA Studio</div>
      <div className="project-select">Project: <select><option>Demo Real-estate</option></select></div>
      <div className="save-status">Saved</div>
    </header>
  )
}

export default Topbar
