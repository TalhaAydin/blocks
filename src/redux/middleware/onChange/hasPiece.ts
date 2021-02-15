import { identity } from 'ramda'
import { onChange } from '../onChange'
import { hasPiece as hasPieceSubject } from '../../../rxjs/subjects'
import { hasPiece as hasPieceSelector } from '../../selectors/entities'

export const hasPiece = onChange(null, {
  subject: hasPieceSubject,
  selector: hasPieceSelector,
  getData: identity,
})
