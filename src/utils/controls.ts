import { GameStatus } from '../redux/reducers/game'
import { isGameInProgress } from './game'

export const isGameStartable = (status: GameStatus): boolean =>
  status === GameStatus.PENDING

export const isGamePausable = (status: GameStatus): boolean =>
  isGameInProgress(status)

export const isGameEndable = (status: GameStatus): boolean =>
  isGameInProgress(status)

export const isGameCreatable = (status: GameStatus): boolean =>
  status === GameStatus.OVER

export const isPieceControllable = (status: GameStatus): boolean =>
  status === GameStatus.ACTIVE
