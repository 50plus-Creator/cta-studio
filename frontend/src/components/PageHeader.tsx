import type { ReactNode } from 'react'

type Props = { eyebrow: string; title: string; description: string; action?: ReactNode }

const PageHeader = ({ eyebrow, title, description, action }: Props) => (
  <header className="page-header">
    <div>
      <span className="eyebrow">{eyebrow}</span>
      <h1>{title}</h1>
      <p>{description}</p>
    </div>
    {action && <div className="page-action">{action}</div>}
  </header>
)

export default PageHeader
