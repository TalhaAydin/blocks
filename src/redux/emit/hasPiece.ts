import { GetEmitData } from '../middleware/emit'
import { RootState } from '../reducers/root'
import { hasEntity } from '../selectors/entities'

export const hasPiece: GetEmitData<boolean, RootState> = (
  prevState,
  nextState
) => {
  const hasPieceBefore = hasEntity('piece')(prevState)
  const hasPieceAfter = hasEntity('piece')(nextState)

  return hasPieceBefore !== hasPieceAfter ? hasPieceAfter : undefined
}
