import { Middleware } from 'redux'
import {
  getEntityMovementLimitedVector,
  isTransformed,
} from '../../utils/entities'
import { createSize } from '../../utils/size'
import { addVector, createVector } from '../../utils/vector'
import { transformEntity } from '../actions/entities'
import { getEntities, getEntityData } from '../selectors/entities'
import { AllActions } from '../types'

export const transformGhost: Middleware = ({ dispatch, getState }) => (
  next
) => (action: AllActions) => {
  const stateBefore = getState()
  const pieceBefore = getEntityData('piece')(stateBefore)
  const ghostBefore = getEntityData('ghost')(stateBefore)

  if (!pieceBefore) {
    return next(action)
  }

  next(action)

  const stateAfter = getState()
  const pieceAfter = getEntityData('piece')(stateAfter)
  const ghostAfter = getEntityData('ghost')(stateAfter)

  if (
    !pieceAfter ||
    !ghostAfter ||
    !(isTransformed(pieceBefore, pieceAfter) || (!ghostBefore && ghostAfter))
  ) {
    return
  }

  const vector = getEntityMovementLimitedVector(
    pieceAfter,
    createVector(0, 25),
    createSize(10, 20),
    Object.entries(getEntities(stateAfter))
      .filter(([k, _]) => !['ghost', 'piece'].includes(k))
      .map(([_, e]) => e)
  )

  // const newGhost = createEntityData(
  //   piece.shape,
  //   addVector(piece.position, vector),
  //   piece.rotation
  // )

  // const newGhostPoints = getPoints(getPlacedEntityBlocks(newGhost))
  // const worldPoints = getPoints(
  //   getPlacedEntityBlocks([piece, ...Object.values(rest)])
  // )

  // if (
  //   getOutOfBounds(createSize(10, 20))(newGhostPoints).length === 0 &&
  //   getOverlaps(worldPoints)(newGhostPoints).length === 0
  // ) {
  dispatch(
    transformEntity(
      'ghost',
      addVector(pieceAfter.position, vector),
      pieceAfter.rotation
    )
  )
  // }
}
