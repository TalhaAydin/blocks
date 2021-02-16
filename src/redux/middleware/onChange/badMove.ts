import { onChange } from '../onChange'
import { rootReducer, RootState } from '../../reducers/root'
import { getEntityData } from '../../selectors/entities'
import { getPoints } from '../../../utils/blocks'
import { getOverlaps, isWithinBounds } from '../../../utils/point'
import { fieldSize } from '../../../utils/game'
import { getPlacedEntityBlocks } from '../../../utils/entities'
import { substractVector, Vector } from '../../../utils/vector'
import { badMove as badMoveSubject } from '../../../rxjs/subjects'
import { isEqual } from '../../../utils/coordinate'

export const badMove = onChange<RootState, Vector | null>({
  rootReducer,
  subject: badMoveSubject,
  stopOnPreEmit: (data) => data !== null,
  getPreEmitData: (simAfter, before) => {
    const pieceBefore = getEntityData('piece')(before)
    const pieceAfter = getEntityData('piece')(simAfter)
    const pileAfter = getEntityData('pile')(simAfter)

    return pieceBefore &&
      pieceAfter &&
      !isEqual(pieceAfter.position, pieceBefore.position) &&
      !(
        isWithinBounds(fieldSize)(
          getPoints(getPlacedEntityBlocks(pieceAfter))
        ) &&
        pileAfter &&
        0 ===
          getOverlaps(getPoints(getPlacedEntityBlocks(pieceAfter)))(
            getPoints(getPlacedEntityBlocks(pileAfter))
          ).length
      )
      ? substractVector(pieceAfter.position, pieceBefore.position)
      : null
  },
})
