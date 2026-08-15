import type { CTAProject } from '../types/template'

const PROJECT_STORAGE_PREFIX = 'cta-studio:project:'

const projectStorageKey = (projectId: string) => `${PROJECT_STORAGE_PREFIX}${projectId}`

const getLocalStorage = () => {
  if (typeof window === 'undefined') return null

  try {
    return window.localStorage
  } catch {
    return null
  }
}

export const saveProjectLocal = (project: CTAProject): CTAProject | null => {
  const savedProject: CTAProject = {
    ...project,
    project: {
      ...project.project,
      lastModified: new Date().toISOString(),
    },
  }

  try {
    const storage = getLocalStorage()
    if (!storage) throw new Error('LocalStorage is unavailable.')
    storage.setItem(projectStorageKey(savedProject.id), JSON.stringify(savedProject))
  } catch (error) {
    console.error(`Failed to save project locally: ${project.id}`, error)
    return null
  }

  return savedProject
}

export const loadProjectLocal = (projectId: string): CTAProject | null => {
  try {
    const storedProject = getLocalStorage()?.getItem(projectStorageKey(projectId))
    if (!storedProject) return null

    const parsedProject = JSON.parse(storedProject) as CTAProject
    return parsedProject?.id === projectId ? parsedProject : null
  } catch {
    return null
  }
}

export const loadProjectsLocal = (defaultProjects: CTAProject[]): CTAProject[] =>
  defaultProjects.map((project) => loadProjectLocal(project.id) ?? project)
