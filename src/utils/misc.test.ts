import { getNumberSequence } from './misc'

describe('getNumberSequence()', () => {
  test('handles ascending sequences', () => {
    expect(getNumberSequence(-5, -2)).toEqual([-5, -4, -3, -2])
    expect(getNumberSequence(-5, 3)).toEqual([-5, -4, -3, -2, -1, 0, 1, 2, 3])
    expect(getNumberSequence(1, 6)).toEqual([1, 2, 3, 4, 5, 6])
  })

  test('handles descending sequences', () => {
    expect(getNumberSequence(-2, -5)).toEqual([-2, -3, -4, -5])
    expect(getNumberSequence(3, -5)).toEqual([3, 2, 1, 0, -1, -2, -3, -4, -5])
    expect(getNumberSequence(6, 1)).toEqual([6, 5, 4, 3, 2, 1])
  })

  test('handles single values', () => {
    expect(getNumberSequence(0, 0)).toEqual([0])
    expect(getNumberSequence(3, 3)).toEqual([3])
    expect(getNumberSequence(-5, -5)).toEqual([-5])
  })
})
