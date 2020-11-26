export interface Coordinate {
  readonly type: string
  readonly x: number
  readonly y: number
}

export const getHash = <T extends Coordinate>({ type, x, y }: T): string =>
  `${type}:${x}:${y}`
