import { identity } from 'ramda'
import { onChange } from '../onChange'
import { isGameInProgress as isGameInProgressSubject } from '../../../rxjs/subjects'
import { isGameInProgress as isGameInProgressSelector } from '../../selectors/game'

export const isGameInProgress = onChange(null, {
  subject: isGameInProgressSubject,
  selector: isGameInProgressSelector,
  getData: identity,
})
