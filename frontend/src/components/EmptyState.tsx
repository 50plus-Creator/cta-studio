type Props = { icon: string; title: string; description: string }

const EmptyState = ({ icon, title, description }: Props) => (
  <div className="empty-state">
    <span className="empty-icon" aria-hidden="true">{icon}</span>
    <strong>{title}</strong>
    <p>{description}</p>
  </div>
)

export default EmptyState
