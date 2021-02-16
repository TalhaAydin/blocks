import { onChange } from '../onChange'
import { hasPiece as hasPieceSubject } from '../../../rxjs/subjects'
import { hasEntity } from '../../selectors/entities'
import { RootState } from '../../reducers/root'

export const hasPiece = onChange<RootState, boolean>({
  subject: hasPieceSubject,
  getPostEmitData: (after) => hasEntity('piece')(after),
})
