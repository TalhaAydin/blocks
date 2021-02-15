import { Middleware } from 'redux'
import { Blocks, groupByRow, mapBlocks } from '../../utils/blocks'
import { getNumberSequence } from '../../utils/misc'
import { createPoint } from '../../utils/point'
import { createSize } from '../../utils/size'
import { EntitiesActionType, setBlocks } from '../actions/entities'
import { getEntityData } from '../selectors/entities'
import { AllActions } from '../types'

export const gravitatePile: Middleware = ({ dispatch, getState }) => (next) => (
  action: AllActions
) => {
  if (action.type !== EntitiesActionType.DELETE_BLOCKS) {
    return next(action)
  }

  next(action)

  const size = createSize(10, 20)
  const entityData = getEntityData(action.id)(getState())

  if (!entityData) {
    return
  }

  const currentRows = groupByRow(entityData.shape)
  const currentRowKeys = Object.keys(currentRows)
    .map((k) => parseInt(k, 10))
    .sort((a, b) => a - b)
  const currentRowCount = currentRowKeys.length

  const newBlocks = getNumberSequence(
    size.height - currentRowCount,
    size.height - 1
  ).reduce((blocks, rowY, i): Blocks => {
    return {
      ...blocks,
      ...mapBlocks(currentRows[currentRowKeys[i]], (p, c) => [
        createPoint(p.x, rowY),
        c,
      ]),
    }
  }, {})

  dispatch(setBlocks(action.id, newBlocks))
}
