import { Middleware } from 'redux'
import { gameMessages } from '../../utils/messages'
import { GameActionType } from '../actions/game'
import { addMessage } from '../actions/messages'
import { GameStatus } from '../reducers/game'
import { AllActions } from '../types'

export const logStatusMessage: Middleware = ({ dispatch }) => (next) => (
  action: AllActions
) => {
  next(action)

  if (action.type !== GameActionType.SET_STATUS) {
    return
  }

  dispatch(
    addMessage({
      content: {
        [GameStatus.PENDING]: gameMessages.pending,
        [GameStatus.ACTIVE]: gameMessages.active,
        [GameStatus.PAUSED]: gameMessages.paused,
        [GameStatus.OVER]: gameMessages.over,
      }[action.status],
    })
  )
}
