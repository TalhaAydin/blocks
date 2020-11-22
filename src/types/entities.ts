import { VectorSerialized } from '../utils/math/Vector'
import { Blocks } from './blocks'

export type EntityPosition = VectorSerialized
export type EntityRotation = 0 | 90 | 180 | 270
export type EntityShape = Blocks

export type EntityID = string
export interface EntityData {
  shape: EntityShape
  position: EntityPosition
  rotation: EntityRotation
}
