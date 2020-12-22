import { createPoint, Point } from './point'

// https://en.wikipedia.org/wiki/Rotation_matrix
export const rotatePoint = (point: Point, angleInRadians: number): Point =>
  createPoint(
    point.x * Math.cos(angleInRadians) - point.y * Math.sin(angleInRadians),
    point.x * Math.sin(angleInRadians) + point.y * Math.cos(angleInRadians)
  )

// https://en.wikipedia.org/wiki/Radian
export const getRadians = (angleInDegrees: number) =>
  angleInDegrees * (Math.PI / 180)
