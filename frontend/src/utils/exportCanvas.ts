import { toPng } from 'html-to-image'
import type { CTAProject } from '../types/template'

const safeFileName = (value: string) => {
  const normalized = value
    .normalize('NFKC')
    .trim()
    .toLowerCase()
    .replace(/[<>:"/\\|?*]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
  const printable = Array.from(normalized).filter((character) => character.charCodeAt(0) > 31).join('')

  return printable || 'cta-project'
}

const nextAnimationFrame = () => new Promise<void>((resolve) => requestAnimationFrame(() => resolve()))

export const exportCanvasToPng = async (element: HTMLElement, project: CTAProject): Promise<boolean> => {
  try {
    await nextAnimationFrame()
    await nextAnimationFrame()
    const width = project.outputSettings.width
    const height = project.outputSettings.height
    const dataUrl = await toPng(element, {
      width,
      height,
      canvasWidth: width,
      canvasHeight: height,
      pixelRatio: 1,
      cacheBust: true,
      backgroundColor: project.outputSettings.transparent ? undefined : project.visual.background,
    })
    const date = new Date().toISOString().slice(0, 10)
    const download = document.createElement('a')
    download.download = `${safeFileName(project.project.name)}-cta-${date}.png`
    download.href = dataUrl
    download.click()
    return true
  } catch (error) {
    console.error(`Failed to export project canvas: ${project.id}`, error)
    return false
  }
}
