import { Coordinate } from './coordinate'

export interface Vector extends Coordinate {
  readonly type: 'vector'
}

export type VectorHash = string

export const isVectorHash = (hash: string): boolean =>
  /^vector:-?\d+:-?\d+$/.test(hash)

export const createVector = (x: number, y: number): Vector => ({
  type: 'vector',
  x,
  y,
})

export const getVector = (hash: string): Vector => {
  if (!isVectorHash(hash)) {
    throw new TypeError('Not a hash of Vector')
  }
  const split = hash.split(':', 3)
  return createVector(parseInt(split[1], 10), parseInt(split[2], 10))
}

export const addVector = (vectorA: Vector, vectorB: Vector): Vector =>
  createVector(vectorA.x + vectorB.x, vectorA.y + vectorB.y)

export const Movement: Record<string, Vector> = {
  Left: createVector(-1, 0),
  Right: createVector(1, 0),
  Up: createVector(0, -1),
  Down: createVector(0, 1),
}

export const isZeroVector = (vector: Vector): boolean =>
  vector.x === 0 && vector.y === 0

export const isDownVector = (vector: Vector): boolean => vector.y > 0
