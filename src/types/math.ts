// coordinates
export interface Coordinate {
  readonly type: string
  readonly x: number
  readonly y: number
}
export interface Point extends Coordinate {
  readonly type: 'point'
}
export interface Vector extends Coordinate {
  readonly type: 'vector'
}

// hash
export type PointHash = string
export type VectorHash = string
