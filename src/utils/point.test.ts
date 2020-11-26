import { createPoint, isWithinBounds } from './point'
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
