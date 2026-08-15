import PageHeader from '../components/PageHeader'
import { mockCTAProjects } from '../data/projects'

const projects = mockCTAProjects.map((item) => ({ name: item.project.name, type: item.project.projectType, modified: new Date(item.project.lastModified).toLocaleDateString(), status: item.project.status }))

const ProjectsPage = () => (
  <div className="page-content">
    <PageHeader eyebrow="Library" title="Projects" description="Keep every CTA concept organized by campaign and format." action={<button className="primary-button">New project</button>} />
    <section className="content-card">
      <div className="section-heading"><div><span className="eyebrow">Mock data</span><h2>All projects</h2></div><input className="search-input" placeholder="Search projects" aria-label="Search projects" /></div>
      <div className="table-wrap">
        <table>
          <thead><tr><th>Project</th><th>Type</th><th>Last modified</th><th>Status</th><th><span className="sr-only">Actions</span></th></tr></thead>
          <tbody>{projects.map((project) => <tr key={project.name}><td><strong>{project.name}</strong></td><td>{project.type}</td><td>{project.modified}</td><td><span className="status-pill">{project.status}</span></td><td><button className="icon-button" aria-label={`More actions for ${project.name}`}>•••</button></td></tr>)}</tbody>
        </table>
      </div>
    </section>
  </div>
)

export default ProjectsPage
