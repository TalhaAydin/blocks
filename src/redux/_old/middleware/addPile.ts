import { Middleware } from 'redux'
import { addEntity } from '../actions/entities'
import { GameActionType } from '../actions/game'
import { getStatus } from '../selectors/game'
import { AllActions } from '../types'
import { isGameInProgress } from '../../utils/game'
import { createVector } from '../../utils/vector'

export const addPile: Middleware = ({ dispatch, getState }) => (next) => (
  action: AllActions
) => {
  if (action.type !== GameActionType.SET_STATUS) {
    return next(action)
  }

  const previousStatus = getStatus(getState())

  next(action)

  const nextStatus = getStatus(getState())

  if (!isGameInProgress(previousStatus) && isGameInProgress(nextStatus)) {
    dispatch(
      addEntity('pile', {
        shape: {},
        position: createVector(0, 0),
        rotation: 0,
      })
    )
  }
}
