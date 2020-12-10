import { createSelector } from 'reselect'
import { GameState } from '../reducers/game'
import { RootState } from '../reducers/root'

export const getGame = (state: RootState): GameState => state.game

export const getStatus = createSelector(getGame, (game) => game.status)

export const getLineClearsCount = (lineCount: number) =>
  createSelector(
    getGame,
    (game) => game.lineClears.filter((l) => l === lineCount).length
  )

export const getTotalLinesCleared = createSelector(getGame, (game) =>
  game.lineClears.reduce((r, c) => r + c, 0)
)
