import { identity } from 'ramda'
import { onChange } from '../onChange'
import { hasPile as hasPileSubject } from '../../../rxjs/subjects'
import { hasPile as hasPileSelector } from '../../selectors/entities'

export const hasPile = onChange(null, {
  subject: hasPileSubject,
  selector: hasPileSelector,
  getData: identity,
})
