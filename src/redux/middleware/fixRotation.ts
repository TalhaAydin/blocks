import { Middleware } from 'redux'
import { getPoints, moveBlocks } from '../../utils/blocks'
import {
  getNextEntityRotation,
  getPlacedEntityBlocks,
} from '../../utils/entities'
import { getOutOfBounds, getOverlaps } from '../../utils/point'
import { createSize } from '../../utils/size'
import { createVector, isZeroVector } from '../../utils/vector'
import { EntitiesActionType, moveEntity } from '../actions/entities'
import { getEntities } from '../selectors/entities'
import { AllActions } from '../types'

export const fixRotation: Middleware = ({ dispatch, getState }) => (next) => (
  action: AllActions
) => {
  if (action.type !== EntitiesActionType.ROTATE) {
    return next(action)
  }

  const { [action.id]: entityData, ...restEntityData } = getEntities(getState())

  if (!entityData) {
    return next(action)
  }

  const placedEntityBlocks = getPlacedEntityBlocks({
    ...entityData,
    rotation: getNextEntityRotation(entityData.rotation, action.direction),
  })

  const restPoints = getPoints(
    getPlacedEntityBlocks(Object.values(restEntityData))
  )

  const simulationVectors = [
    createVector(0, 0),
    createVector(0, -1),
    createVector(-1, 0),
    createVector(-2, 0),
    createVector(1, 0),
    createVector(2, 0),
  ]

  simulationVectors.some((v) => {
    const nextPoints = getPoints(moveBlocks(placedEntityBlocks, v))

    if (
      getOutOfBounds(createSize(10, 20))(nextPoints).length === 0 &&
      getOverlaps(restPoints)(nextPoints).length === 0
    ) {
      if (!isZeroVector(v)) {
        dispatch(moveEntity(action.id, v))
      }
      next(action)
      return true
    }

    return false
  })
}
