import { Middleware } from 'redux'
import { getPoints } from '../../utils/blocks'
import { createOPiece } from '../../utils/piece'
import { getOverlaps } from '../../utils/point'
import { EntitiesActionType } from '../actions/entities'
import { getEntityData } from '../selectors/entities'
import { AllActions } from '../types'

export const dontRotate: Middleware = ({ dispatch, getState }) => (next) => (
  action: AllActions
) => {
  if (action.type !== EntitiesActionType.ROTATE) {
    return next(action)
  }

  const currentPiece = getEntityData(action.id)(getState())

  if (!currentPiece) {
    return next(action)
  }

  const oPiecePoints = getPoints(createOPiece().shape)
  const currentPiecePoints = getPoints(currentPiece.shape)

  if (
    getOverlaps(oPiecePoints)(currentPiecePoints).length !== oPiecePoints.length
  ) {
    return next(action)
  }
}
