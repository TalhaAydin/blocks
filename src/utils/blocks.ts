import { StandardLonghandProperties } from 'csstype'
import { getRadians, rotatePoint } from './angle'
import { getHash } from './coordinate'
import { createPoint, getPoint, movePoint, Point, PointHash } from './point'
import { createVector, Vector } from './vector'

export type BlockConfig = {
  color: StandardLonghandProperties['backgroundColor']
  z?: StandardLonghandProperties['zIndex']
}

export type Blocks = Record<PointHash, BlockConfig>

export const moveBlocks = (blocks: Blocks, vector: Vector): Blocks =>
  mapBlocks(blocks, (p, c) => [movePoint(p, vector), c])

export const rotateBlocks = (blocks: Blocks, angleInDegrees: number): Blocks =>
  mapBlocks(blocks, (p, c) => [rotateBlockPoint(p, angleInDegrees), c])

export const getPoints = (blocks: Blocks): Point[] =>
  Object.keys(blocks).map((h) => getPoint(h))

export const mapBlocks = (
  blocks: Blocks,
  mapper: (point: Point, config: BlockConfig) => [Point, BlockConfig]
) =>
  Object.fromEntries(
    Object.entries(blocks)
      .map(([h, c]): [Point, BlockConfig] => [getPoint(h), c])
      .map(([p, c]) => mapper(p, c))
      .map(([p, c]) => [getHash(p), c])
  )

export const filterBlocks = (
  blocks: Blocks,
  filter: (point: Point, config: BlockConfig) => boolean
): Blocks =>
  Object.fromEntries(
    Object.entries(blocks)
      .map(([h, c]): [Point, BlockConfig] => [getPoint(h), c])
      .filter(([p, c]) => filter(p, c))
      .map(([p, c]) => [getHash(p), c])
  )

export const rotateBlockPoint = (
  point: Point,
  angleInDegrees: number
): Point => {
  const p = rotatePoint(point, getRadians(angleInDegrees))
  return createPoint(Math.round(p.x) + 0, Math.round(p.y) + 0) // add 0 to fix -0
}

export const getBlockPath = (vector: Vector): Vector[] => [
  ...Array(Math.abs(vector.x))
    .fill(0)
    .map(() => createVector(vector.x > 0 ? 1 : -1, 0)),
  ...Array(Math.abs(vector.y))
    .fill(0)
    .map(() => createVector(0, vector.y > 0 ? 1 : -1)),
]

export const groupByRow = (blocks: Blocks): Record<number, Blocks> =>
  Object.entries(blocks).reduce<Record<number, Blocks>>(
    (result, [pointHash, blockConfig]) => {
      const point = getPoint(pointHash)
      return {
        ...result,
        [point.y]: {
          ...(result[point.y] || {}),
          [getHash(point)]: blockConfig,
        },
      }
    },
    {}
  )
