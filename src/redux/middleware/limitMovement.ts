import { Middleware } from 'redux'
import { getEntityMovementLimitedVector } from '../../utils/entities'
import { EntitiesActionType } from '../actions/entities'
import { getEntities } from '../selectors/entities'
import { AllActions } from '../types'
import { isZeroVector } from '../../utils/vector'
import { createSize } from '../../utils/size'

export const limitMovement: Middleware = ({ dispatch, getState }) => (next) => (
  action: AllActions
) => {
  if (action.type !== EntitiesActionType.MOVE) {
    return next(action)
  }

  const { [action.id]: entityData, ...restEntityData } = getEntities(getState())

  if (!entityData) {
    return next(action)
  }

  const vector = getEntityMovementLimitedVector(
    entityData,
    action.vector,
    createSize(10, 20),
    Object.values(restEntityData)
  )

  if (!isZeroVector(vector)) {
    next({ ...action, vector })
  }
}
