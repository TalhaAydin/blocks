import { StandardLonghandProperties } from 'csstype'

export type EntityPosition = [number, number]
export type EntityRotation = 0 | 90 | 180 | 270
export type EntityBlockConfig = {
  color: StandardLonghandProperties['backgroundColor']
}
export type EntityShape = Record<EntityID, EntityBlockConfig>

export type EntityID = string
export interface EntityData {
  shape: EntityShape
  position: EntityPosition
  rotation: EntityRotation
}
