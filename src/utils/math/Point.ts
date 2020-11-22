import { Vector } from './Vector'

export type PointHash = string
export type PointSerialized = [number, number]

export class Point {
  constructor(public readonly x: number = 0, public readonly y: number = 0) {}

  public isWithinBounds(width: number, length: number) {
    return this.x < width && this.y < length
  }

  public toHash() {
    return Point.toHash(this.x, this.y)
  }

  public serialize() {
    return Point.serialize(this.x, this.y)
  }

  public move(vector: Vector) {
    return new Point(this.x + vector.x, this.y + vector.y)
  }

  public static toHash(x: number, y: number) {
    return `${x},${y}`
  }

  public static serialize(x: number, y: number): [number, number] {
    return [x, y]
  }

  public static fromHash(hash: PointHash) {
    const point = hash.split(',', 2).map((c) => parseInt(c, 10))
    return new Point(point[0], point[1])
  }

  public static deserialize(serialization: PointSerialized) {
    return new Point(serialization[0], serialization[1])
  }
}
