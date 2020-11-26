export const getNumberSequence = (start: number, end: number): number[] =>
  Array(Math.abs(end - start) + 1)
    .fill(0)
    .map(start > end ? (_, i) => start - i : (_, i) => start + i)
