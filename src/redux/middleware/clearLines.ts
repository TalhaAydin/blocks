import { Middleware } from 'redux'
import { Blocks, getPoints, groupByRow } from '../../utils/blocks'
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

  const entityData = getEntityData(action.id)(getState())

  const fullLineBlocks: Blocks = Object.values(groupByRow(entityData.shape))
    .filter((points) => Object.keys(points).length === 10)
    .reduce((allBlocks, blocks) => ({ ...allBlocks, ...blocks }), {})

  const fullLinePoints = getPoints(fullLineBlocks)

  if (fullLinePoints.length > 0) {
    dispatch(deleteBlocks(action.id, fullLinePoints))
  }
}
