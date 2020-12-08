import { Middleware } from 'redux'
import { getPlacedEntityBlocks } from '../../utils/entities'
import { isDownVector } from '../../utils/vector'
import {
  addBlocks,
  deleteEntity,
  EntitiesActionType,
} from '../actions/entities'
import { getEntityData } from '../selectors/entities'
import { AllActions } from '../types'

export const buildPile: Middleware = ({ dispatch, getState }) => (next) => (
  action: AllActions
) => {
  if (action.type !== EntitiesActionType.MOVEMENT_LIMITED) {
    return next(action)
  }

  if (!isDownVector(action.original)) {
    return next(action)
  }

  next(action)

  const entityData = getEntityData(action.id)(getState())

  if (!entityData) {
    return
  }

  const blocks = getPlacedEntityBlocks(entityData)
  dispatch(deleteEntity(action.id))
  dispatch(addBlocks('pile', blocks))
}
