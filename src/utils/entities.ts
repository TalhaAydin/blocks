import { EntityRotationDirection } from '../redux/actions/entities'
import { EntityData } from '../redux/reducers/entities'
import { Blocks, moveBlocks, rotateBlocks } from './blocks'
import { Vector } from './vector'

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
  position: Vector,
  rotation: number
) => ({
  shape,
  position,
  rotation,
})
