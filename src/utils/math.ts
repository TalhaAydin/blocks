import { Coordinate, Point, RotationMatrix, Size, Vector } from '../types/math'

export const isPointHash = (hash: string): boolean =>
  /^point:-?\d+:-?\d+$/.test(hash)
export const isVectorHash = (hash: string): boolean =>
  /^vector:-?\d+:-?\d+$/.test(hash)

export const createPoint = (x: number, y: number): Point => ({
  type: 'point',
  x,
  y,
})

export const createVector = (x: number, y: number): Vector => ({
  type: 'vector',
  x,
  y,
})

export const createSize = (width: number, height: number): Size => ({
  width,
  height,
})

export const getHash = <T extends Coordinate>({ type, x, y }: T): string =>
  `${type}:${x}:${y}`

export const getPoint = (hash: string): Point => {
  if (!isPointHash(hash)) {
    throw new TypeError('Not a hash of Point')
  }
  const split = hash.split(':', 3)
  return { type: 'point', x: parseInt(split[1], 10), y: parseInt(split[2], 10) }
}

export const getVector = (hash: string): Vector => {
  if (!isVectorHash(hash)) {
    throw new TypeError('Not a hash of Vector')
  }
  const split = hash.split(':', 3)
  return {
    type: 'vector',
    x: parseInt(split[1], 10),
    y: parseInt(split[2], 10),
  }
}

export const movePoint = (point: Point, vector: Vector): Point => ({
  type: 'point',
  x: point.x + vector.x,
  y: point.y + vector.y,
})

export const addVector = (vectorA: Vector, vectorB: Vector): Vector => ({
  type: 'vector',
  x: vectorA.x + vectorB.x,
  y: vectorA.y + vectorB.y,
})

export const isInArea = (size: Size) => (point: Point | Point[]) =>
  (Array.isArray(point) ? point : [point]).every(
    (p) => p.x < size.width && p.y < size.height && p.x >= 0 && p.y >= 0
  )

export const Movement: Record<string, Vector> = {
  Left: createVector(-1, 0),
  Right: createVector(1, 0),
  Up: createVector(0, -1),
  Down: createVector(0, 1),
}
