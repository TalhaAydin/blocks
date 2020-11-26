import { Middleware } from 'redux'
import { getPoints, moveBlocks, rotateBlocks } from '../../utils/blocks'
import { getNextEntityRotation } from '../../utils/entities'
import { isWithinBounds } from '../../utils/point'
import { createSize } from '../../utils/size'
import { EntitiesActionType } from '../actions/entities'
import { getEntityData } from '../selectors/entities'
import { AllActions } from '../types'

export const fixRotation: Middleware = ({ dispatch, getState }) => (next) => (
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

  if (isWithinBounds(createSize(10, 20))(getPoints(result))) {
    return next(action)
  }
}
