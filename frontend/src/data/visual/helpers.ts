import type { TextStyle, TextStyleRole, VisualCanvasConfig, VisualSection, VisualSectionType, SectionStyle } from '../../types/template'

export const textStyle = (fontSize: number, fontWeight: number, color: string, fontRole: TextStyle['fontRole'] = 'bodyFont', lineHeight = 1.3): TextStyle => ({ fontSize, fontWeight, color, fontRole, lineHeight })

type SectionOptions = Omit<Partial<SectionStyle>, 'background' | 'textStyles'> & Pick<VisualSection, 'variant' | 'contentKey' | 'itemVisuals'> & { gap?: number; padding?: [number, number, number, number]; textStyles?: Partial<Record<TextStyleRole, TextStyle>> }

export const section = (id: string, type: VisualSectionType, order: number, minHeight: number, background: string, options: SectionOptions = {}): VisualSection => ({
  id, type, order, visible: true, variant: options.variant, contentKey: options.contentKey, itemVisuals: options.itemVisuals,
  layout: { minHeight, gap: options.gap ?? 20, padding: { top: options.padding?.[0] ?? 40, right: options.padding?.[1] ?? 70, bottom: options.padding?.[2] ?? 40, left: options.padding?.[3] ?? 70 } },
  style: { background, textStyles: options.textStyles ?? {}, radius: options.radius, borderColor: options.borderColor, borderWidth: options.borderWidth, cardBackground: options.cardBackground, cardBorderColor: options.cardBorderColor, iconBackground: options.iconBackground, iconColor: options.iconColor, qrSize: options.qrSize, actionCards: options.actionCards },
})

export const visualSnapshot = (config: VisualCanvasConfig): VisualCanvasConfig => JSON.parse(JSON.stringify(config)) as VisualCanvasConfig
