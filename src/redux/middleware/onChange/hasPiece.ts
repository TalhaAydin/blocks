import { identity } from 'ramda'
import { onChange } from '../onChange'
import { hasPiece as hasPieceSubject } from '../../../rxjs/subjects'
import { hasEntity } from '../../selectors/entities'

export const hasPiece = onChange(null, {
  subject: hasPieceSubject,
  selector: hasEntity('piece'),
  getData: identity,
})
