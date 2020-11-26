import { Middleware } from 'redux'
import { getBlockPath, getPoints } from '../../utils/blocks'
import { getPlacedEntityBlocks } from '../../utils/entities'
import { EntitiesActionType } from '../actions/entities'
import { getEntities } from '../selectors/entities'
import { AllActions } from '../types'
import { addVector, createVector } from '../../utils/vector'
import { getOutOfBounds, getOverlaps } from '../../utils/point'
import { createSize } from '../../utils/size'

export const limitMovement: Middleware = ({ getState }) => (next) => (
  action: AllActions
) => {
  if (action.type !== EntitiesActionType.MOVE) {
    return next(action)
  }

  const { [action.id]: entityData, ...restEntityData } = getEntities(getState())

  const restPoints = getPoints(
    getPlacedEntityBlocks(Object.values(restEntityData))
  )

  let resultVector = createVector(0, 0)
  getBlockPath(action.vector).every((v) => {
    const nextVector = addVector(resultVector, v)
    const nextPoints = getPoints(
      getPlacedEntityBlocks({
        ...entityData,
        position: addVector(entityData.position, nextVector),
      })
    )
    if (
      getOutOfBounds(createSize(10, 20))(nextPoints).length > 0 ||
      getOverlaps(restPoints)(nextPoints).length > 0
    ) {
      return false
    }
    resultVector = nextVector
    return true
  })

  return next({ ...action, vector: resultVector })
}
