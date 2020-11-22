import { StandardLonghandProperties } from 'csstype'
import { PointHash } from '../utils/math/Point'

export type BlockConfig = {
  color: StandardLonghandProperties['backgroundColor']
}

export type Blocks = Record<PointHash, BlockConfig>
