import { Middleware } from 'redux'
import { isDownVector, Movement } from '../../utils/vector'
import { EntitiesActionType, moveEntity } from '../actions/entities'
import { AllActions } from '../types'
import { intervalState } from './descendPiece'

export const resetDescent: Middleware = ({ dispatch }) => (next) => (
  action: AllActions
) => {
  if (action.type !== EntitiesActionType.MOVE || !isDownVector(action.vector)) {
    return next(action)
  }

  next(action)

  window.clearInterval(intervalState.id)
  intervalState.id = window.setInterval(
    () => dispatch(moveEntity('piece', Movement.Down)),
    1000
  )
}
