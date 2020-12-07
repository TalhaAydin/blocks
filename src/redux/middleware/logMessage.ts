import { Middleware } from 'redux'
import { GameActionType } from '../actions/game'
import { addMessage } from '../actions/messages'
import { GameStatus } from '../reducers/game'
import { AllActions } from '../types'

export const logMessage: Middleware = ({ dispatch, getState }) => (next) => (
  action: AllActions
) => {
  next(action)

  // if (
  //   action.type === GameActionType.SET_STATUS &&
  //   action.status === GameStatus.ACTIVE
  // ) {
  //   dispatch(addMessage('Press F1 to play'))
  // }
}
