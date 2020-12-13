import {
  createPoint,
  getOutOfBounds,
  getOverlaps,
  isWithinBounds,
} from './point'
import { createSize } from './size'

describe('isWithinBounds()', () => {
  describe('with single Point', () => {
    it('returns true if Point is inside of area specified by Size', () => {
      const func = isWithinBounds(createSize(10, 10))
      expect(func(createPoint(9, 9))).toBe(true)
      expect(func(createPoint(0, 0))).toBe(true)
    })

    it('returns false if Point is outside of area specified by Size', () => {
      const func = isWithinBounds(createSize(10, 10))
      expect(func(createPoint(9, 10))).toBe(false)
      expect(func(createPoint(0, -1))).toBe(false)
    })
  })
  describe('with multiple Points', () => {
    it('returns true if all Points are inside of area specified by Size', () => {
      const func = isWithinBounds(createSize(10, 10))
      expect(func([createPoint(9, 9), createPoint(0, 0)])).toBe(true)
    })

    it('returns false if one Point is outside of area specified by Size', () => {
      const func = isWithinBounds(createSize(10, 10))
      expect(func([createPoint(9, 9), createPoint(0, -1)])).toBe(false)
    })
  })
})

describe('getOverlaps()', () => {
  it('returns the overlapping points', () => {
    expect(
      getOverlaps([createPoint(0, 0)])([createPoint(0, 0)])
    ).toIncludeSameMembers([createPoint(0, 0)])

    expect(
      getOverlaps([
        createPoint(7, 13),
        createPoint(8, 13),
        createPoint(9, 13),
      ])([createPoint(8, 13), createPoint(8, 14), createPoint(8, 15)])
    ).toIncludeSameMembers([createPoint(8, 13)])
  })
  it('returns empty on no overlaps', () => {
    expect(
      getOverlaps([
        createPoint(7, 13),
        createPoint(8, 13),
        createPoint(9, 13),
      ])([createPoint(11, 13), createPoint(11, 14), createPoint(11, 15)])
    ).toHaveLength(0)
  })
})

describe('getOutOfBounds()', () => {
  it('returns all out of bounds points', () => {
    expect(
      getOutOfBounds(createSize(5, 5))([createPoint(5, 5), createPoint(4, 4)])
    ).toIncludeSameMembers([createPoint(5, 5)])

    expect(
      getOutOfBounds(createSize(5, 5))([
        createPoint(5, 4),
        createPoint(4, 5),
        createPoint(5, 5),
        createPoint(4, 4),
      ])
    ).toIncludeSameMembers([
      createPoint(5, 5),
      createPoint(5, 4),
      createPoint(4, 5),
    ])
  })
  it('returns empty if all points are within bounds', () => {
    expect(
      getOutOfBounds(createSize(5, 5))([
        createPoint(4, 4),
        createPoint(3, 3),
        createPoint(2, 2),
        createPoint(1, 1),
        createPoint(0, 0),
      ])
    ).toHaveLength(0)
  })
})
