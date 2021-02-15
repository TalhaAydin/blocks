import { identity } from 'ramda'
import { onChange } from '../onChange'
import { hasPile as hasPileSubject } from '../../../rxjs/subjects'
import { hasEntity } from '../../selectors/entities'

export const hasPile = onChange(null, {
  subject: hasPileSubject,
  selector: hasEntity('pile'),
  getData: identity,
})
