export type CTAButton = { label: string; action: string }

export type TemplateData = {
  id: string
  name: string
  brand: { name: string; logo?: string }
  content: { headline: string; message: string; features: string[]; heroImage?: string }
  ctas: CTAButton[]
  contact: { website?: string; phone?: string }
}
