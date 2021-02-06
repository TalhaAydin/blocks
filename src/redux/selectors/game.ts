import { createSelector } from 'reselect'
import { getLevel as getLevelUtil } from '../../utils/game'
import { GameState } from '../reducers/game'
import { RootState } from '../reducers/root'
import { isGameInProgress as isGameInProgressUtil } from '../../utils/game'

export const getGame = (state: RootState): GameState => state.game

export const getStatus = createSelector(getGame, (game) => game.status)

export const getLineClears = createSelector(getGame, (game) => game.lineClears)

export const getLineClearsCount = (lineCount: number) =>
  createSelector(
    getLineClears,
    (lineClears) => lineClears.filter((l) => l === lineCount).length
  )

export const getTotalLinesCleared = createSelector(
  getLineClears,
  (lineClears) => lineClears.reduce((r, c) => r + c, 0)
)

export const getLevel = createSelector(getLineClears, getLevelUtil)

export const getScore = createSelector(getLineClears, (lineClears) =>
  lineClears.reduce(
    (score, lineCount, i, a) =>
      score + [100, 300, 500, 800][lineCount - 1] * getLevelUtil(a.slice(0, i)),
    0
  )
)

export const isGameInProgress = createSelector(getStatus, isGameInProgressUtil)
