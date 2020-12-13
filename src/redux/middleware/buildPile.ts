import { Middleware } from 'redux'
import { isEqual } from '../../utils/coordinate'
import { getPlacedEntityBlocks } from '../../utils/entities'
import { addVector, isDownVector } from '../../utils/vector'
import {
  addBlocks,
  deleteEntity,
  EntitiesActionType,
  setBlocks,
} from '../actions/entities'
import { getEntityData } from '../selectors/entities'
import { AllActions } from '../types'

export const buildPile: Middleware = ({ dispatch, getState }) => (next) => (
  action: AllActions
) => {
  if (action.type !== EntitiesActionType.MOVE || !isDownVector(action.vector)) {
    return next(action)
  }

  const entityBefore = getEntityData(action.id)(getState())
  if (!entityBefore) {
    return
  }

  next(action)

  const entityAfter = getEntityData(action.id)(getState())
  if (!entityAfter) {
    return
  }

  if (
    isEqual(
      entityAfter.position,
      addVector(entityBefore.position, action.vector)
    )
  ) {
    return
  }

  const blocks = getPlacedEntityBlocks(entityAfter)
  dispatch(setBlocks(action.id, {}))
  dispatch(addBlocks('pile', blocks))
  dispatch(deleteEntity(action.id))
}
