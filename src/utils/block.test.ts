import { rotateBlockPoint } from './blocks'
import { createPoint } from './math'

describe('rotatePoint()', () => {
  it('rotates 90 degrees', () => {
    expect(rotateBlockPoint(createPoint(0, -1), 90)).toEqual(createPoint(1, 0))
  })
  it('rotates 180 degrees', () => {
    expect(rotateBlockPoint(createPoint(0, -1), 180)).toEqual(createPoint(0, 1))
  })
  it('rotates 270 degrees', () => {
    expect(rotateBlockPoint(createPoint(0, -1), 270)).toEqual(
      createPoint(-1, 0)
    )
  })
  it('rotates 0 degrees', () => {
    expect(rotateBlockPoint(createPoint(0, -1), 0)).toEqual(createPoint(0, -1))
  })
})
