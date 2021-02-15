import { isEqualShape } from '../../utils/blocks'
import { createOPiece } from '../../utils/piece'
import { IsBadState } from '../_old/stop'
import { EntityData } from '../reducers/entities'

export const isRotatedOPiece: IsBadState<EntityData | undefined> = (
  pieceAfter
) =>
  !!pieceAfter &&
  isEqualShape(createOPiece().shape, pieceAfter.shape) &&
  pieceAfter.rotation !== 0
