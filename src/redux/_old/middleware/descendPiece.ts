import { Middleware } from 'redux'
import { isEqual } from '../../utils/coordinate'
import { getDescentDelay } from '../../utils/game'
import { Movement } from '../../utils/vector'
import { EntitiesActionType, moveEntity } from '../actions/entities'
import { GameStatus } from '../reducers/game'
import { hasEntity } from '../selectors/entities'
import { getLevel, getStatus } from '../selectors/game'
import { AllActions } from '../types'

let timeoutId: number | null = null

export const descendPiece: Middleware = ({ getState, dispatch }) => (next) => (
  action: AllActions
) => {
  next(action)

  const state = getState()
  const status = getStatus(state)
  const hasPiece = hasEntity('piece')(state)
  const level = getLevel(state)

  // Clear timeout
  if (
    timeoutId &&
    ((action.type === EntitiesActionType.MOVE &&
      isEqual(action.vector, Movement.Down)) ||
      status === GameStatus.PAUSED ||
      !hasPiece)
  ) {
    window.clearTimeout(timeoutId)
    timeoutId = null
  }

  // Set timeout
  if (!timeoutId && status === GameStatus.ACTIVE && hasPiece) {
    timeoutId = window.setTimeout(() => {
      timeoutId = null
      dispatch(moveEntity('piece', Movement.Down))
    }, getDescentDelay(level))
  }
}
