import { Middleware } from 'redux'
import { getPoints, moveBlocks, rotateBlocks } from '../../utils/blocks'
import { getNextEntityRotation } from '../../utils/entities'
import { isInArea, createSize } from '../../utils/math'
import { EntitiesActionType } from '../actions/entities'
import { getEntityData } from '../selectors/entities'
import { AllActions } from '../types'

export const rotateInField: Middleware = ({ dispatch, getState }) => (next) => (
  action: AllActions
) => {
  if (action.type !== EntitiesActionType.ROTATE) {
    return next(action)
  }

  const entityData = getEntityData(action.id)(getState())
  const result = moveBlocks(
    rotateBlocks(
      entityData.shape,
      getNextEntityRotation(entityData.rotation, action.direction)
    ),
    entityData.position
  )

  if (isInArea(createSize(10, 20))(getPoints(result))) {
    return next(action)
  }
}
