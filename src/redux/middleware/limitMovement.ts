import { Middleware } from 'redux'
import { getBlockPath, getPoints } from '../../utils/blocks'
import { getPlacedEntityBlocks } from '../../utils/entities'
import { EntitiesActionType } from '../actions/entities'
import { getEntities } from '../selectors/entities'
import { AllActions } from '../types'
import { addVector, createVector, isZeroVector } from '../../utils/vector'
import { getOutOfBounds, getOverlaps } from '../../utils/point'
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

  const restPoints = getPoints(
    getPlacedEntityBlocks(Object.values(restEntityData))
  )

  const blockPath = getBlockPath(action.vector)

  const blockPathEndIndex = blockPath.findIndex((_, i, a) => {
    const points = getPoints(
      getPlacedEntityBlocks({
        ...entityData,
        position: addVector(
          entityData.position,
          a.slice(0, i + 1).reduce(addVector, createVector(0, 0))
        ),
      })
    )
    return (
      getOutOfBounds(createSize(10, 20))(points).length > 0 ||
      getOverlaps(restPoints)(points).length > 0
    )
  })

  const vector = blockPath
    .slice(0, blockPathEndIndex === -1 ? undefined : blockPathEndIndex)
    .reduce(addVector, createVector(0, 0))

  if (!isZeroVector(vector)) {
    next({ ...action, vector })
  }
}
