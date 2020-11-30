import { Middleware } from 'redux'
import { createRandomPiece } from '../../utils/piece'
import { addEntity, EntitiesActionType } from '../actions/entities'
import { AllActions } from '../types'

export const addPiece: Middleware = ({ dispatch, getState }) => (next) => (
  action: AllActions
) => {
  if (action.type !== EntitiesActionType.DELETE) {
    return next(action)
  }

  next(action)

  dispatch(addEntity(action.id, createRandomPiece()))
}
