import { Middleware } from 'redux'
import { getHash } from '../../utils/coordinate'
import { createEntityData } from '../../utils/entities'
import { createPoint } from '../../utils/point'
import { createVector } from '../../utils/vector'
import { addEntity, EntitiesActionType } from '../actions/entities'
import { AllActions } from '../types'

export const addPiece: Middleware = ({ dispatch, getState }) => (next) => (
  action: AllActions
) => {
  if (action.type !== EntitiesActionType.DELETE) {
    return next(action)
  }

  dispatch(
    addEntity(
      action.id,
      createEntityData(
        {
          [getHash(createPoint(0, 0))]: { color: 'purple' },
          [getHash(createPoint(-1, 0))]: { color: 'purple' },
          [getHash(createPoint(1, 0))]: { color: 'purple' },
          [getHash(createPoint(0, 1))]: { color: 'purple' },
        },
        createVector(5, 5),
        0
      )
    )
  )
}
