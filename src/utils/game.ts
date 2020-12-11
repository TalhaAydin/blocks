import { GameStatus } from '../redux/reducers/game'

export const isGameInProgress = (status: GameStatus): boolean =>
  status === GameStatus.ACTIVE || status === GameStatus.PAUSED

export const getLevel = (lineClears: number[]) =>
  1 + Math.floor(lineClears.reduce((s, c) => s + c, 0) / 10)
