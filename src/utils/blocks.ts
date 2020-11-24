import { BlockConfig, Blocks } from '../types/blocks'
import { Point, Vector } from '../types/math'
import {
  createPoint,
  getHash,
  getPoint,
  getRadians,
  movePoint,
  rotatePoint,
} from './math'

export const moveBlocks = (blocks: Blocks, vector: Vector): Blocks =>
  mapBlocks(blocks, (p, c) => [movePoint(p, vector), c])

export const rotateBlocks = (blocks: Blocks, angleInDegrees: number): Blocks =>
  mapBlocks(blocks, (p, c) => [rotateBlockPoint(p, angleInDegrees), c])

export const getPoints = (blocks: Blocks): Point[] =>
  Object.keys(blocks).map((h) => getPoint(h))

export const mapBlocks = (
  blocks: Blocks,
  mapper: (point: Point, config: BlockConfig) => [Point, BlockConfig]
) => {
  return Object.fromEntries(
    Object.entries(blocks)
      .map(([h, c]): [Point, BlockConfig] => [getPoint(h), c])
      .map(([p, c]) => mapper(p, c))
      .map(([p, c]) => [getHash(p), c])
  )
}

export const rotateBlockPoint = (
  point: Point,
  angleInDegrees: number
): Point => {
  const p = rotatePoint(point, getRadians(angleInDegrees))
  return createPoint(Math.round(p.x) + 0, Math.round(p.y) + 0) // add 0 to fix -0
}
