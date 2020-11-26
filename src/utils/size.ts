export interface Size {
  readonly width: number
  readonly height: number
}

export const createSize = (width: number, height: number): Size => ({
  width,
  height,
})
