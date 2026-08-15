export type ProjectStatus = 'draft' | 'concept' | 'archived'
export type Locale = 'ko' | 'en' | 'ja'
export type ProjectType = 'real-estate' | 'education' | 'youtube' | 'social-media' | 'business-promotion' | 'generic'
export type ActionType = 'link' | 'phone' | 'email' | 'message' | 'share' | 'custom'
export type ActionStyle = 'primary' | 'secondary' | 'tertiary'
export type VisualExportFormat = 'png' | 'jpg' | 'webp' | 'video'
export type IntegrationOutputType = 'json' | 'api'
export type ContactField = 'website' | 'phone' | 'email' | 'location' | 'qrDestination'
export type MetadataValue = string | number | boolean | string[]
export type TextStyleRole = 'eyebrow' | 'headline' | 'supporting' | 'body' | 'caption' | 'ctaLabel' | 'ctaSubtitle'
export type VisualSectionType = 'brand' | 'headline' | 'hero' | 'features' | 'actions' | 'contact' | 'footer'
export type SectionVariant = 'default' | 'audience-cards' | 'icon-grid' | 'premium-cards' | 'qr-panel'
export type SemanticIconName = 'phone' | 'chat' | 'calendar' | 'monitor' | 'support' | 'mail' | 'link' | 'administrator' | 'teacher' | 'student' | 'ai-learning' | 'analytics' | 'classroom' | 'growth'
export type IconReference = { name?: SemanticIconName; assetId?: string; src?: string }
export type SectionItemVisual = { icon?: IconReference; image?: AssetReference }
export type TextStyle = { fontRole: 'headingFont' | 'bodyFont'; fontSize: number; fontWeight: number; lineHeight: number; color: string; letterSpacing?: number; textAlign?: 'left' | 'center' | 'right' }
export type SectionLayout = { minHeight: number; padding: { top: number; right: number; bottom: number; left: number }; gap: number; align?: 'start' | 'center' | 'end'; justify?: 'start' | 'center' | 'end' | 'space-between' }
export type ActionCardVisual = { background: string; borderColor: string; iconBackground: string; iconColor: string }
export type SectionStyle = {
  background: string
  borderColor?: string
  borderWidth?: number
  radius?: number
  cardBackground?: string
  cardBorderColor?: string
  iconBackground?: string
  iconColor?: string
  qrSize?: number
  actionCards?: Record<ActionStyle, ActionCardVisual>
  textStyles: Partial<Record<TextStyleRole, TextStyle>>
}
export type VisualSection = { id: string; type: VisualSectionType; variant?: SectionVariant; order: number; visible: boolean; contentKey?: string; itemVisuals?: SectionItemVisual[]; layout: SectionLayout; style: SectionStyle }
export type VisualCanvasConfig = { width: 1080; height: 1920; background: string; sections: VisualSection[] }
export type LocalizedSectionContent = { eyebrow?: string; title?: string; supporting?: string; items?: Array<{ title: string; text?: string }> }

export type FontReference = {
  family: string
  source: 'system' | 'web' | 'asset'
  fallbacks: string[]
  assetId?: string
  url?: string
}

export type Typography = { headingFont: FontReference; bodyFont: FontReference }
export type BrandColors = { primary?: string; secondary?: string; accent?: string; text?: string; background?: string }
export type AssetReference = { assetId?: string; src?: string; alt?: string }
export type ContactItem = { id: string; type: string; label?: string; value: string }
export type LocalizedText = Record<Locale, string>
export type LocalizedContent = { headline: string; message: string; features: string[] }
export type LocalizedActionContent = { label: string; subtitle?: string }
export type ProjectLocaleLabels = {
  contact: Partial<Record<ContactField, string>>
  qrLabel: string
  footerText: string
}

export type CTAAction = {
  id: string
  actionType: ActionType
  target?: string
  style: ActionStyle
  icon?: IconReference
  content: Record<Locale, LocalizedActionContent>
}

export type CTAProject = {
  id: string
  locale: Locale
  project: { name: string; projectType: ProjectType; status: ProjectStatus; lastModified: string }
  brand: { name: string; wordmark?: string; displayNames: LocalizedText; taglines: LocalizedText; logoAssetId?: string; colors: BrandColors; typography: Typography }
  template: { id: string; version: number }
  content: Record<Locale, LocalizedContent>
  actions: CTAAction[]
  contact: {
    website?: string
    phone?: string
    email?: string
    location?: LocalizedText
    qrDestination?: string
    qrImage?: AssetReference
    contactItems?: ContactItem[]
  }
  assets: { logo?: AssetReference; hero?: AssetReference; background?: AssetReference; decorative?: AssetReference; gallery?: AssetReference[] }
  outputSettings: { width: number; height: number; format: VisualExportFormat; transparent: boolean }
  integrationOutput: { enabled: boolean; type?: IntegrationOutputType }
  labels: Record<Locale, ProjectLocaleLabels>
  sectionContent: Record<Locale, Record<string, LocalizedSectionContent>>
  visual: VisualCanvasConfig
  // Flexible template/project data. A template config may define validation rules in a later phase.
  metadata: Record<string, MetadataValue>
}

export type TemplateMetadataField = { key: string; label: string; type: 'text' | 'list' }

export type CTATemplateDefinition = {
  id: string
  name: string
  category: string
  version: number
  description: string
  editor: { contactFields: ContactField[] }
  style: { accentColor: string; typography?: Partial<Typography> }
  preview: {
    heroAlt: LocalizedText
    labels: Record<Locale, { heroLabel: string; featureLabel: string }>
  }
  metadataFields: TemplateMetadataField[]
  visualDefaults: VisualCanvasConfig
  // Template-owned metadata validation can be added here without expanding CTAProject core fields.
  metadataValidation?: Record<string, unknown>
}

// Compatibility name for Phase 2 consumers while the core model evolves.
export type TemplateData = CTAProject
