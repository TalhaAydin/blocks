import { getBlockPath, rotateBlockPoint } from './blocks'
import { createPoint } from './point'
import { createVector } from './vector'

describe('rotateBlockPoint()', () => {
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

describe('getBlockVectorPath()', () => {
  it('handles vector to left', () => {
    expect(getBlockPath(createVector(-5, 0))).toEqual([
      createVector(-1, 0),
      createVector(-1, 0),
      createVector(-1, 0),
      createVector(-1, 0),
      createVector(-1, 0),
    ])
  })

  it('handles vector to right', () => {
    expect(getBlockPath(createVector(3, 0))).toEqual([
      createVector(1, 0),
      createVector(1, 0),
      createVector(1, 0),
    ])
  })

  it('handles vector to top', () => {
    expect(getBlockPath(createVector(0, -5))).toEqual([
      createVector(0, -1),
      createVector(0, -1),
      createVector(0, -1),
      createVector(0, -1),
      createVector(0, -1),
    ])
  })

  it('handles vector to bottom', () => {
    expect(getBlockPath(createVector(0, 4))).toEqual([
      createVector(0, 1),
      createVector(0, 1),
      createVector(0, 1),
      createVector(0, 1),
    ])
  })

  it('handles vector to top left', () => {
    expect(getBlockPath(createVector(-2, -1))).toEqual([
      createVector(-1, 0),
      createVector(-1, 0),
      createVector(0, -1),
    ])
  })

  it('handles vector to top right', () => {
    expect(getBlockPath(createVector(3, -2))).toEqual([
      createVector(1, 0),
      createVector(1, 0),
      createVector(1, 0),
      createVector(0, -1),
      createVector(0, -1),
    ])
  })

  it('handles vector to bottom left', () => {
    expect(getBlockPath(createVector(-2, 2))).toEqual([
      createVector(-1, 0),
      createVector(-1, 0),
      createVector(0, 1),
      createVector(0, 1),
    ])
  })

  it('handles vector to bottom right', () => {
    expect(getBlockPath(createVector(1, 1))).toEqual([
      createVector(1, 0),
      createVector(0, 1),
    ])
  })
})
