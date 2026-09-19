export const uploadVideo = async (file: File, signal: AbortSignal): Promise<{ filename: string; url: string; size?: number }> => {
  const body = new FormData()
  body.append('file', file)
  const response = await fetch('http://127.0.0.1:8100/api/media/upload', { method: 'POST', body, signal })
  if (!response.ok) {
    const error = await response.json().catch(() => null)
    throw new Error(typeof error?.detail === 'string' ? error.detail : `Upload failed (${response.status})`)
  }
  const result = await response.json()
  if (typeof result.size === 'number' && result.size !== file.size) throw new Error(`Upload size mismatch: expected ${file.size}, received ${result.size} bytes.`)
  return result
}
