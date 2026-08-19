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

const mergeLocalizedRecords = <T>(defaults: Record<string, T>, saved: Record<string, T> | undefined) =>
  Object.fromEntries(Object.entries(defaults).map(([locale, defaultValue]) => [
    locale,
    typeof defaultValue === 'object' && defaultValue !== null
      ? { ...defaultValue, ...(saved?.[locale] ?? {}) }
      : saved?.[locale] ?? defaultValue,
  ])) as Record<string, T>

export const mergeProjectWithDefaults = (defaults: CTAProject, saved: CTAProject): CTAProject => {
  const merged: CTAProject = {
    ...defaults,
    ...saved,
    project: { ...defaults.project, ...saved.project },
    brand: {
      ...defaults.brand,
      ...saved.brand,
      displayNames: { ...defaults.brand.displayNames, ...saved.brand.displayNames },
      taglines: { ...defaults.brand.taglines, ...saved.brand.taglines },
      colors: { ...defaults.brand.colors, ...saved.brand.colors },
      typography: { ...defaults.brand.typography, ...saved.brand.typography },
    },
    content: mergeLocalizedRecords(defaults.content, saved.content) as CTAProject['content'],
    contact: { ...defaults.contact, ...saved.contact },
    assets: { ...defaults.assets, ...saved.assets },
    outputSettings: { ...defaults.outputSettings, ...saved.outputSettings },
    integrationOutput: { ...defaults.integrationOutput, ...saved.integrationOutput },
    labels: mergeLocalizedRecords(defaults.labels, saved.labels) as CTAProject['labels'],
    sectionContent: mergeLocalizedRecords(defaults.sectionContent, saved.sectionContent) as CTAProject['sectionContent'],
    metadata: { ...defaults.metadata, ...saved.metadata },
  }

  const defaultRevision = Number(defaults.metadata.dataRevision ?? 0)
  const savedRevision = Number(saved.metadata?.dataRevision ?? 0)
  if (savedRevision >= defaultRevision) return merged

  return {
    ...merged,
    template: defaults.template,
    content: defaults.content,
    actions: defaults.actions,
    assets: defaults.assets,
    labels: defaults.labels,
    sectionContent: defaults.sectionContent,
    visual: defaults.visual,
    metadata: { ...saved.metadata, ...defaults.metadata },
  }
}

export const loadProjectsLocal = (defaultProjects: CTAProject[]): CTAProject[] =>
  defaultProjects.map((project) => {
    const savedProject = loadProjectLocal(project.id)
    if (!savedProject) return project

    const mergedProject = mergeProjectWithDefaults(project, savedProject)
    const defaultRevision = Number(project.metadata.dataRevision ?? 0)
    const savedRevision = Number(savedProject.metadata?.dataRevision ?? 0)
    if (savedRevision < defaultRevision) return saveProjectLocal(mergedProject) ?? mergedProject

    return mergedProject
  })
