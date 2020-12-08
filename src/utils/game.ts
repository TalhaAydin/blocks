import { GameStatus } from '../redux/reducers/game'

export const isGameInProgress = (status: GameStatus): boolean =>
  status === GameStatus.ACTIVE || status === GameStatus.PAUSED
