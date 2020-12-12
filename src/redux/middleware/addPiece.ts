import { Middleware } from 'redux'
import { getPoints } from '../../utils/blocks'
import { getPlacedEntityBlocks } from '../../utils/entities'
import { isGameInProgress } from '../../utils/game'
import { createRandomPiece } from '../../utils/piece'
import { getOverlaps } from '../../utils/point'
import { addEntity } from '../actions/entities'
import { setStatus } from '../actions/game'
import { GameStatus } from '../reducers/game'
import { getEntities, getEntityData } from '../selectors/entities'
import { getStatus } from '../selectors/game'
import { AllActions } from '../types'

export const addPiece: Middleware = ({ dispatch, getState }) => (next) => (
  action: AllActions
) => {
  next(action)

  const state = getState()

  if (!isGameInProgress(getStatus(state)) || getEntityData('piece')(state)) {
    return
  }

  const nextPiece = createRandomPiece()
  const nextPiecePoints = getPoints(getPlacedEntityBlocks(nextPiece))
  const restPoints = getPoints(
    getPlacedEntityBlocks(Object.values(getEntities(state)))
  )

  if (getOverlaps(restPoints)(nextPiecePoints).length > 0) {
    dispatch(setStatus(GameStatus.OVER))
  } else {
    dispatch(addEntity('piece', nextPiece))
  }
}
