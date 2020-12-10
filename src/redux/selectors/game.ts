import { createSelector } from 'reselect'
import { GameState } from '../reducers/game'
import { RootState } from '../reducers/root'

export const getGame = (state: RootState): GameState => state.game

export const getStatus = createSelector(getGame, (game) => game.status)

export const getLinesCleared = createSelector(
  getGame,
  (game) => game.linesCleared
)
