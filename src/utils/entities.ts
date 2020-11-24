import { EntityRotationDirection } from '../redux/actions/entities'

export const getNextEntityRotation = (
  currentRotation: number,
  direction: EntityRotationDirection
): number => (360 + currentRotation + direction) % 360
