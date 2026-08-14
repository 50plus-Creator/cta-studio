import React from 'react'

const ContentPanel: React.FC = () => {
  return (
    <aside className="panel content-panel">
      <h3>Content</h3>
      <label>Headline</label>
      <input defaultValue="Modern 2BR Apartment" />
      <label>Message</label>
      <textarea defaultValue="Close to subway, great view" />
      <label>Features</label>
      <textarea defaultValue={'2 bedrooms\n1 bath\n1200 sqft\nBalcony with view'} />
    </aside>
  )
}

export default ContentPanel
