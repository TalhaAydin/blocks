import { Middleware } from 'redux'
import { resetEntities } from '../actions/entities'
import { GameActionType, resetClearedLines } from '../actions/game'
import { resetMessages } from '../actions/messages'
import { GameStatus } from '../reducers/game'
import { AllActions } from '../types'

export const resetGame: Middleware = ({ dispatch }) => (next) => (
  action: AllActions
) => {
  next(action)

  if (
    action.type === GameActionType.SET_STATUS &&
    action.status === GameStatus.PENDING
  ) {
    dispatch(resetEntities())
    dispatch(resetMessages())
    dispatch(resetClearedLines())
  }
}
