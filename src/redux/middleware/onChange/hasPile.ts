import { onChange } from '../onChange'
import { hasPile as hasPileSubject } from '../../../rxjs/subjects'
import { hasEntity } from '../../selectors/entities'
import { RootState } from '../../reducers/root'

export const hasPile = onChange<RootState, boolean>({
  subject: hasPileSubject,
  getPostEmitData: (after) => hasEntity('pile')(after),
})
