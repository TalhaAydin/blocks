import { Blocks } from '../types/blocks'
import { Point } from './math/Point'
import { Vector } from './math/Vector'

export const moveBlocks = (blocks: Blocks, vector: Vector): Blocks => {
  return Object.fromEntries(
    Object.entries(blocks).map(([pointHash, blockConfig]) => [
      Point.fromHash(pointHash).move(vector).toHash(),
      blockConfig,
    ])
  )
}
