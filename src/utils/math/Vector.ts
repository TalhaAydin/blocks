import { Point } from './Point'

export type VectorHash = string
export type VectorSerialized = [number, number]

export class Vector extends Point {
  public static fromPoints(a: Point, b: Point) {
    return new this(b.x - a.x, b.y - a.y)
  }
}
