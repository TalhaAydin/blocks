import { Middleware } from 'redux'
import { getPoints, moveBlocks } from '../../utils/blocks'
import { areInArea, createSize } from '../../utils/math'
import { EntitiesActionType } from '../actions/entities'
import { getEntityData } from '../selectors/entities'
import { AllActions } from '../types'

export const keepInField: Middleware = ({ dispatch, getState }) => (next) => (
  action: AllActions
) => {
  if (action.type !== EntitiesActionType.MOVE) {
    return next(action)
  }

  const entityData = getEntityData(action.id)(getState())
  const realPosition = moveBlocks(entityData.shape, entityData.position)
  const nextPosition = moveBlocks(realPosition, action.vector)

  if (areInArea(createSize(10, 20), getPoints(nextPosition))) {
    return next(action)
  }
}
