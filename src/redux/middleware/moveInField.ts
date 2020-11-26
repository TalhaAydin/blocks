import { Middleware } from 'redux'
import { getPoints, moveBlocks, rotateBlocks } from '../../utils/blocks'
import { isInArea } from '../../utils/point'
import { createSize } from '../../utils/size'
import { EntitiesActionType } from '../actions/entities'
import { getEntityData } from '../selectors/entities'
import { AllActions } from '../types'

export const moveInField: Middleware = ({ getState }) => (next) => (
  action: AllActions
) => {
  if (action.type !== EntitiesActionType.MOVE) {
    return next(action)
  }

  const entityData = getEntityData(action.id)(getState())
  const rotatedShape = rotateBlocks(entityData.shape, entityData.rotation)
  const realPosition = moveBlocks(rotatedShape, entityData.position)
  const nextPosition = moveBlocks(realPosition, action.vector)

  if (isInArea(createSize(10, 20))(getPoints(nextPosition))) {
    return next(action)
  }
}
