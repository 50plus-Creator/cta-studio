import brivionTemplate from './brivionTemplate'
import realEstateTemplate from './realEstateTemplate'

export const templateDefinitions = [realEstateTemplate, brivionTemplate]
export const getTemplateDefinition = (id: string, version: number) => {
  const definition = templateDefinitions.find((item) => item.id === id && item.version === version)
  if (!definition) throw new Error(`Template definition not found: ${id}@${version}`)
  return definition
}
