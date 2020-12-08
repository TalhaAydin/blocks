import { Middleware } from 'redux'
import { createRandomPiece } from '../../utils/piece'
import { addEntity, EntitiesActionType } from '../actions/entities'
import { getEntityData } from '../selectors/entities'
import { AllActions } from '../types'

export const addPiece: Middleware = ({ dispatch, getState }) => (next) => (
  action: AllActions
) => {
  next(action)

  const piece = getEntityData('piece')(getState())

  if (!piece) {
    dispatch(addEntity('piece', createRandomPiece()))
  }
}
