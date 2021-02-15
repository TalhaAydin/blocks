import { onChange } from '../onChange'
import { rootReducer } from '../../reducers/root'
import { getEntityData } from '../../selectors/entities'
import { getPoints } from '../../../utils/blocks'
import { isWithinBounds } from '../../../utils/point'
import { fieldSize } from '../../../utils/game'
import { getPlacedEntityBlocks } from '../../../utils/entities'
import { substractVector, Vector } from '../../../utils/vector'
import { badMove as badMoveSubject } from '../../../rxjs/subjects'
import { isEqual } from '../../../utils/coordinate'

export const badMove = onChange(
  {
    subject: badMoveSubject,
    selector: getEntityData('piece'),
    getData: (pieceAfter, pieceBefore): null | Vector =>
      pieceBefore &&
      pieceAfter &&
      !isEqual(pieceAfter.position, pieceBefore.position) &&
      !isWithinBounds(fieldSize)(getPoints(getPlacedEntityBlocks(pieceAfter)))
        ? substractVector(pieceAfter.position, pieceBefore.position)
        : null,
    rootReducer,
    stopOnEmit: (data) => data !== null,
  },
  null
)
