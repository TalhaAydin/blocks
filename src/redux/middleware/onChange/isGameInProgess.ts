import { onChange } from '../onChange'
import { isGameInProgress as isGameInProgressSubject } from '../../../rxjs/subjects'
import { isGameInProgress as isGameInProgressSelector } from '../../selectors/game'
import { RootState } from '../../reducers/root'

export const isGameInProgress = onChange<RootState, boolean>({
  subject: isGameInProgressSubject,
  getPostEmitData: (after) => isGameInProgressSelector(after),
})
