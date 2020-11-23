import { StandardLonghandProperties } from 'csstype'
import { PointHash } from '../types/math'

export type BlockConfig = {
  color: StandardLonghandProperties['backgroundColor']
}

export type Blocks = Record<PointHash, BlockConfig>
