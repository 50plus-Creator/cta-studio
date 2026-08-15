import { useCallback, useEffect, useRef, useState } from 'react'
import Preview from './Preview'
import ContentPanel from './panels/ContentPanel'
import SettingsPanel from './panels/SettingsPanel'
import { mockCTAProjects } from '../data/projects'
import { getTemplateDefinition } from '../data/templates'
import type { CTAProject } from '../types/template'
import { exportCanvasToPng } from '../utils/exportCanvas'
import { loadProjectsLocal, saveProjectLocal } from '../utils/projectStorage'

const createInitialProjects = () =>
  Object.fromEntries(loadProjectsLocal(mockCTAProjects).map((project) => [project.id, project]))

type SaveStatus = 'dirty' | 'saving' | 'saved'

const EditorLayout = () => {
  const [projects, setProjects] = useState<Record<string, CTAProject>>(createInitialProjects)
  const [dirtyProjects, setDirtyProjects] = useState<Record<string, boolean>>({})
  const [saveStatuses, setSaveStatuses] = useState<Record<string, SaveStatus>>({})
  const [isExporting, setIsExporting] = useState(false)
  const [activeProjectId, setActiveProjectId] = useState(mockCTAProjects[0].id)
  const projectsRef = useRef(projects)
  const autoSaveTimer = useRef<ReturnType<typeof setTimeout> | null>(null)
  const savedStatusTimers = useRef<Record<string, ReturnType<typeof setTimeout>>>({})
  const project = projects[activeProjectId]
  const template = getTemplateDefinition(project.template.id, project.template.version)

  const updateProject = (nextProject: CTAProject) => {
    const savedStatusTimer = savedStatusTimers.current[nextProject.id]
    if (savedStatusTimer) {
      clearTimeout(savedStatusTimer)
      delete savedStatusTimers.current[nextProject.id]
    }
    projectsRef.current = { ...projectsRef.current, [nextProject.id]: nextProject }
    setProjects((current) => ({ ...current, [nextProject.id]: nextProject }))
    setDirtyProjects((current) => ({ ...current, [nextProject.id]: true }))
    setSaveStatuses((current) => ({ ...current, [nextProject.id]: 'dirty' }))
  }

  const persistProject = useCallback((projectId: string) => {
    const savedStatusTimer = savedStatusTimers.current[projectId]
    if (savedStatusTimer) {
      clearTimeout(savedStatusTimer)
      delete savedStatusTimers.current[projectId]
    }

    setSaveStatuses((current) => ({ ...current, [projectId]: 'saving' }))
    const currentProject = projectsRef.current[projectId]
    if (!currentProject) {
      setSaveStatuses((current) => ({ ...current, [projectId]: 'dirty' }))
      return false
    }

    const savedProject = saveProjectLocal(currentProject)
    if (!savedProject) {
      setSaveStatuses((current) => ({ ...current, [projectId]: 'dirty' }))
      return false
    }

    projectsRef.current = { ...projectsRef.current, [savedProject.id]: savedProject }
    setProjects((current) => ({ ...current, [savedProject.id]: savedProject }))
    setDirtyProjects((current) => ({ ...current, [savedProject.id]: false }))

    savedStatusTimers.current[projectId] = setTimeout(() => {
      setSaveStatuses((current) => ({ ...current, [projectId]: 'saved' }))
      delete savedStatusTimers.current[projectId]
    }, 150)
    return true
  }, [])

  const saveProject = () => {
    if (autoSaveTimer.current) clearTimeout(autoSaveTimer.current)
    autoSaveTimer.current = null
    persistProject(activeProjectId)
  }

  const selectProject = (projectId: string) => {
    if (projectId === activeProjectId) return
    if (autoSaveTimer.current) clearTimeout(autoSaveTimer.current)
    autoSaveTimer.current = null
    if (dirtyProjects[activeProjectId] && !persistProject(activeProjectId)) return
    setActiveProjectId(projectId)
  }

  const exportProject = async () => {
    const exportCanvas = document.getElementById('cta-export-canvas')
    const currentProject = projectsRef.current[activeProjectId]
    if (!exportCanvas || !currentProject || currentProject.outputSettings.format !== 'png' || isExporting) return

    setIsExporting(true)
    await exportCanvasToPng(exportCanvas, currentProject)
    setIsExporting(false)
  }

  useEffect(() => {
    if (!dirtyProjects[activeProjectId]) return

    if (autoSaveTimer.current) clearTimeout(autoSaveTimer.current)
    autoSaveTimer.current = setTimeout(() => {
      autoSaveTimer.current = null
      persistProject(activeProjectId)
    }, 800)
    return () => {
      if (autoSaveTimer.current) clearTimeout(autoSaveTimer.current)
    }
  }, [activeProjectId, dirtyProjects, persistProject])

  useEffect(() => () => {
    if (autoSaveTimer.current) clearTimeout(autoSaveTimer.current)
    Object.values(savedStatusTimers.current).forEach(clearTimeout)
  }, [])

  return (
    <div className="editor-body">
      <ContentPanel data={project} template={template} onChange={updateProject} />
      <Preview data={project} template={template} />
      <SettingsPanel
        data={project}
        template={template}
        projects={Object.values(projects)}
        onProjectSelect={selectProject}
        onChange={updateProject}
        onSave={saveProject}
        saveStatus={saveStatuses[activeProjectId] ?? 'saved'}
        onExport={exportProject}
        isExporting={isExporting}
      />
    </div>
  )
}

export default EditorLayout
