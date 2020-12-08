import { Middleware } from 'redux'
import { isGameInProgress } from '../../utils/game'
import { createRandomPiece } from '../../utils/piece'
import { addEntity } from '../actions/entities'
import { getEntityData } from '../selectors/entities'
import { getStatus } from '../selectors/game'
import { AllActions } from '../types'

export const addPiece: Middleware = ({ dispatch, getState }) => (next) => (
  action: AllActions
) => {
  next(action)

  const status = getStatus(getState())

  if (!isGameInProgress(status)) {
    return
  }

  const piece = getEntityData('piece')(getState())

  if (!piece) {
    dispatch(addEntity('piece', createRandomPiece()))
  }
}
