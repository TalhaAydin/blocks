import { Middleware } from 'redux'
import { getPoints, moveBlocks } from '../../utils/blocks'
import {
  getNextEntityRotation,
  getPlacedEntityBlocks,
} from '../../utils/entities'
import { getOutOfBounds, getOverlaps } from '../../utils/point'
import { createSize } from '../../utils/size'
import { addVector, createVector, isZeroVector } from '../../utils/vector'
import {
  addEntity,
  deleteEntity,
  EntitiesActionType,
} from '../actions/entities'
import { EntityData } from '../reducers/entities'
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

  const rotatedEntityData: EntityData = {
    ...entityData,
    rotation: getNextEntityRotation(entityData.rotation, action.direction),
  }
  const placedEntityBlocks = getPlacedEntityBlocks(rotatedEntityData)

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
    createVector(0, 1),
    createVector(0, 2),
  ]

  simulationVectors.some((v) => {
    const blocks = moveBlocks(placedEntityBlocks, v)
    const points = getPoints(blocks)

    if (
      getOutOfBounds(createSize(10, 20))(points).length === 0 &&
      getOverlaps(restPoints)(points).length === 0
    ) {
      if (isZeroVector(v)) {
        next(action)
      } else {
        dispatch(deleteEntity(action.id))
        dispatch(
          addEntity(action.id, {
            ...rotatedEntityData,
            position: addVector(rotatedEntityData.position, v),
          })
        )
      }
      return true
    }

    return false
  })
}
