import { Blocks } from './blocks'
import { Vector } from './math'

export type EntityPosition = Vector
export type EntityRotation = 0 | 90 | 180 | 270
export type EntityShape = Blocks

export type EntityID = string
export interface EntityData {
  shape: EntityShape
  position: EntityPosition
  rotation: EntityRotation
}
