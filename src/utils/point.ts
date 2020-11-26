import { Coordinate } from './coordinate'
import { Size } from './size'
import { Vector } from './vector'

export interface Point extends Coordinate {
  readonly type: 'point'
}

export type PointHash = string

export const isPointHash = (hash: string): boolean =>
  /^point:-?\d+:-?\d+$/.test(hash)

export const createPoint = (x: number, y: number): Point => ({
  type: 'point',
  x,
  y,
})

export const getPoint = (hash: string): Point => {
  if (!isPointHash(hash)) {
    throw new TypeError('Not a hash of Point')
  }
  const split = hash.split(':', 3)
  return { type: 'point', x: parseInt(split[1], 10), y: parseInt(split[2], 10) }
}

export const movePoint = (point: Point, vector: Vector): Point => ({
  type: 'point',
  x: point.x + vector.x,
  y: point.y + vector.y,
})

export const isInArea = (size: Size) => (point: Point | Point[]) =>
  (Array.isArray(point) ? point : [point]).every(
    (p) => p.x < size.width && p.y < size.height && p.x >= 0 && p.y >= 0
  )
