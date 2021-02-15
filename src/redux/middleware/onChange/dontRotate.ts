import { Subject } from 'rxjs'

import { onChange } from '../onChange'
import { rootReducer } from '../../reducers/root'
import { getPiece } from '../../selectors/entities'
import { isEqualShape } from '../../../utils/blocks'
import { createOPiece } from '../../../utils/piece'

export const dontRotate = onChange(
  {
    subject: new Subject(),
    selector: getPiece,
    getData: (pieceAfter) =>
      !!pieceAfter &&
      isEqualShape(createOPiece().shape, pieceAfter.shape) &&
      pieceAfter.rotation !== 0,
    rootReducer,
    stopOnEmit: (data) => data === true,
  },
  null
)
