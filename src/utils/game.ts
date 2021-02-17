import { GameStatus } from '../redux/reducers/game'
import { createSize } from './size'

export const isGameInProgress = (status: GameStatus): boolean =>
  status === GameStatus.ACTIVE || status === GameStatus.PAUSED

export const getLevel = (lineClears: number[]) =>
  1 + Math.floor(lineClears.reduce((s, c) => s + c, 0) / 10)

export const getDescentDelay = (level: number) =>
  Math.max(100, 1000 - (level - 1) * 150)

export const fieldSize = createSize(10, 20)

export const isGameStatus = (arg: any): arg is GameStatus =>
  Object.values(GameStatus).includes(arg)
