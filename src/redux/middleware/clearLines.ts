import { Middleware } from 'redux'
import { getPoints } from '../../utils/blocks'
import { Point } from '../../utils/point'
import { deleteBlocks, EntitiesActionType } from '../actions/entities'
import { getEntityData } from '../selectors/entities'
import { AllActions } from '../types'

export const clearLines: Middleware = ({ dispatch, getState }) => (next) => (
  action: AllActions
) => {
  if (action.type !== EntitiesActionType.ADD_BLOCKS) {
    return next(action)
  }

  next(action)

  // als er 10 stuks op een lijn zitten, dan verwijder je die lijn
  const entityData = getEntityData(action.id)(getState())

  const fullLinePoints = Object.values(
    getPoints(entityData.shape).reduce<Record<number, Point[]>>(
      (groupObject, point) => ({
        ...groupObject,
        [point.y]: [...(groupObject[point.y] || []), point],
      }),
      {}
    )
  )
    .filter((points) => points.length === 10)
    .flat()

  if (fullLinePoints.length > 0) {
    dispatch(deleteBlocks(action.id, fullLinePoints))
  }
}
