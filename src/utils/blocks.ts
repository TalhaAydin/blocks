import { Blocks } from '../types/blocks'
import { Point, Vector } from '../types/math'
import { getHash, getPoint, movePoint } from './math'

export const moveBlocks = (blocks: Blocks, vector: Vector): Blocks => {
  return Object.fromEntries(
    Object.entries(blocks).map(([pointHash, blockConfig]) => [
      getHash(movePoint(getPoint(pointHash), vector)),
      blockConfig,
    ])
  )
}

export const getPoints = (blocks: Blocks): Point[] =>
  Object.keys(blocks).map((h) => getPoint(h))
