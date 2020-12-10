import { Middleware } from 'redux'
import { Movement } from '../../utils/vector'
import { moveEntity } from '../actions/entities'
import { GameActionType } from '../actions/game'
import { GameStatus } from '../reducers/game'
import { AllActions } from '../types'

export interface IntervalState {
  id?: number
}

export const intervalState: IntervalState = {
  id: undefined,
}

export const descendPiece: Middleware = ({ dispatch }) => (next) => (
  action: AllActions
) => {
  if (action.type !== GameActionType.SET_STATUS) {
    return next(action)
  }

  next(action)

  if (action.status !== GameStatus.ACTIVE) {
    window.clearInterval(intervalState.id)
    return
  }

  intervalState.id = window.setInterval(
    () => dispatch(moveEntity('piece', Movement.Down)),
    1000
  )
}
