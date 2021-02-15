import { Middleware } from 'redux'
import { mapBlocks } from '../../utils/blocks'
import { createEntityData } from '../../utils/entities'
import { addEntity, deleteEntity } from '../actions/entities'
import { getEntityData } from '../selectors/entities'
import { AllActions } from '../types'

export const addGhost: Middleware = ({ dispatch, getState }) => (next) => (
  action: AllActions
) => {
  const stateBefore = getState()
  const pieceBefore = getEntityData('piece')(stateBefore)

  next(action)

  const stateAfter = getState()
  const pieceAfter = getEntityData('piece')(stateAfter)
  const ghostAfter = getEntityData('ghost')(stateAfter)

  if (!pieceBefore && pieceAfter && !ghostAfter) {
    dispatch(
      addEntity(
        'ghost',
        createEntityData(
          mapBlocks(pieceAfter.shape, (p, c) => [
            p,
            { ...c, color: 'transparent', z: -1 },
          ])
        )
      )
    )
  } else if (pieceBefore && !pieceAfter && ghostAfter) {
    dispatch(deleteEntity('ghost'))
  }
}
