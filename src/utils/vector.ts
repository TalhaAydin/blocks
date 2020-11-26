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
  return {
    type: 'vector',
    x: parseInt(split[1], 10),
    y: parseInt(split[2], 10),
  }
}

export const addVector = (vectorA: Vector, vectorB: Vector): Vector => ({
  type: 'vector',
  x: vectorA.x + vectorB.x,
  y: vectorA.y + vectorB.y,
})

export const Movement: Record<string, Vector> = {
  Left: createVector(-1, 0),
  Right: createVector(1, 0),
  Up: createVector(0, -1),
  Down: createVector(0, 1),
}
