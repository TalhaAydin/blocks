import { onChange } from '../onChange'
import { rootReducer, RootState } from '../../reducers/root'
import { isEqualShape } from '../../../utils/blocks'
import { createOPiece } from '../../../utils/piece'
import { getEntityData } from '../../selectors/entities'

export const dontRotate = onChange<RootState, boolean>({
  rootReducer,
  stopOnPreEmit: (data) => data === true,
  getPreEmitData: (after) => {
    const pieceAfter = getEntityData('piece')(after)
    return (
      !!pieceAfter &&
      isEqualShape(createOPiece().shape, pieceAfter.shape) &&
      pieceAfter.rotation !== 0
    )
  },
})
