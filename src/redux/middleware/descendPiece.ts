import { Middleware } from 'redux'
import { Movement } from '../../utils/vector'
import { moveEntity } from '../actions/entities'
import { GameActionType } from '../actions/game'
import { GameStatus } from '../reducers/game'
import { AllActions } from '../types'

let intervalId: number

export const descendPiece: Middleware = ({ dispatch }) => (next) => (
  action: AllActions
) => {
  if (action.type !== GameActionType.SET_STATUS) {
    return next(action)
  }

  next(action)

  if (action.status !== GameStatus.ACTIVE) {
    window.clearInterval(intervalId)
    return
  }

  intervalId = window.setInterval(
    () => dispatch(moveEntity('tetromino', Movement.Down)),
    1000
  )
}
