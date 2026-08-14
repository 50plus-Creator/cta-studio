import React from 'react'

const Sidebar: React.FC = () => {
  return (
    <aside className="sidebar">
      <h2 className="logo">CTA Studio</h2>
      <nav>
        <ul>
          <li>Dashboard</li>
          <li>Projects</li>
          <li className="active">CTA Editor</li>
          <li>Templates</li>
          <li>Brand Assets</li>
          <li>Exports</li>
          <li>Settings</li>
        </ul>
      </nav>
    </aside>
  )
}

export default Sidebar
