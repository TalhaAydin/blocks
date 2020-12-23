import { Middleware } from 'redux'
import { mapBlocks } from '../../utils/blocks'
import { createEntityData } from '../../utils/entities'
import { addEntity, deleteEntity } from '../actions/entities'
import { getEntityData } from '../selectors/entities'
import { AllActions } from '../types'

export const addGhost: Middleware = ({ dispatch, getState }) => (next) => (
  action: AllActions
) => {
  const beforeState = getState()
  const beforePiece = getEntityData('piece')(beforeState)
  // const beforeGhost = getEntityData('ghost')(beforeState)

  next(action)

  const afterState = getState()
  const afterPiece = getEntityData('piece')(afterState)
  const afterGhost = getEntityData('ghost')(afterState)

  if (!beforePiece && afterPiece && !afterGhost) {
    dispatch(
      addEntity(
        'ghost',
        createEntityData(
          mapBlocks(afterPiece.shape, (p, c) => [
            p,
            { ...c, color: 'transparent' },
          ])
        )
      )
    )
  } else if (beforePiece && !afterPiece && afterGhost) {
    dispatch(deleteEntity('ghost'))
  }
}
