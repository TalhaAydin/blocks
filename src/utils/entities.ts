import { isEqual } from 'lodash'
import { EntityRotationDirection } from '../redux/actions/entities'
import { EntityData } from '../redux/reducers/entities'
import {
  Blocks,
  getBlockPath,
  getPoints,
  isEqualShape,
  moveBlocks,
  rotateBlocks,
} from './blocks'
import { getOutOfBounds, getOverlaps } from './point'
import { Size } from './size'
import { addVector, createVector, Vector } from './vector'

export const getNextEntityRotation = (
  currentRotation: number,
  direction: EntityRotationDirection
): number => (360 + currentRotation + direction) % 360

export const getPlacedEntityBlocks = (data: EntityData | EntityData[]) =>
  (Array.isArray(data) ? data : [data]).reduce(
    (result, { shape, position, rotation }) => ({
      ...result,
      ...moveBlocks(rotateBlocks(shape, rotation), position),
    }),
    {}
  )

export const createEntityData = (
  shape: Blocks,
  position: Vector = createVector(0, 0),
  rotation: number = 0
) => ({
  shape,
  position,
  rotation,
})

export const isTransformed = (a: EntityData, b: EntityData): boolean =>
  isEqualShape(a.shape, b.shape) &&
  (a.rotation !== b.rotation || !isEqual(a.position, b.position))

export const getEntityMovementLimitedVector = (
  entity: EntityData,
  vector: Vector,
  size: Size,
  world: EntityData[]
): Vector => {
  const worldEntityPoints = getPoints(getPlacedEntityBlocks(world))

  const blockPath = getBlockPath(vector)

  const blockPathEndIndex = blockPath.findIndex((_, i, a) => {
    const points = getPoints(
      getPlacedEntityBlocks({
        ...entity,
        position: addVector(
          entity.position,
          a.slice(0, i + 1).reduce(addVector, createVector(0, 0))
        ),
      })
    )
    return (
      getOutOfBounds(size)(points).length > 0 ||
      getOverlaps(worldEntityPoints)(points).length > 0
    )
  })

  return blockPath
    .slice(0, blockPathEndIndex === -1 ? undefined : blockPathEndIndex)
    .reduce(addVector, createVector(0, 0))
}
