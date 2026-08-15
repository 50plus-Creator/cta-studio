import { useState } from 'react'
import Preview from './Preview'
import ContentPanel from './panels/ContentPanel'
import SettingsPanel from './panels/SettingsPanel'
import { mockCTAProjects } from '../data/projects'
import { getTemplateDefinition } from '../data/templates'
import type { CTAProject } from '../types/template'

const initialProjects = Object.fromEntries(mockCTAProjects.map((project) => [project.id, project]))

const EditorLayout = () => {
  const [projects, setProjects] = useState<Record<string, CTAProject>>(initialProjects)
  const [activeProjectId, setActiveProjectId] = useState(mockCTAProjects[0].id)
  const project = projects[activeProjectId]
  const template = getTemplateDefinition(project.template.id, project.template.version)

  const updateProject = (nextProject: CTAProject) => {
    setProjects((current) => ({ ...current, [nextProject.id]: nextProject }))
  }

  return (
    <div className="editor-body">
      <ContentPanel data={project} template={template} onChange={updateProject} />
      <Preview data={project} template={template} />
      <SettingsPanel
        data={project}
        template={template}
        projects={mockCTAProjects}
        onProjectSelect={setActiveProjectId}
        onChange={updateProject}
      />
    </div>
  )
}

export default EditorLayout
