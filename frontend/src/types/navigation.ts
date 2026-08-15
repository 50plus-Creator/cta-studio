export type PageId =
  | 'dashboard'
  | 'projects'
  | 'editor'
  | 'templates'
  | 'brand-assets'
  | 'exports'
  | 'settings'

export type NavigationItem = {
  id: PageId
  label: string
  icon: string
}
