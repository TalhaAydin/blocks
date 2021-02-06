import { combineLatest } from 'rxjs'
import { filter, distinctUntilChanged } from 'rxjs/operators'

import { hasPiece, isGameInProgress } from '../subjects'
import { createRandomPiece } from '../../utils/piece'
import { addEntity } from '../../redux/actions/entities'
import { store } from '../../redux/store'

combineLatest([
  hasPiece.pipe(distinctUntilChanged()),
  isGameInProgress.pipe(distinctUntilChanged()),
])
  .pipe(filter(([p, g]) => g && !p))
  .subscribe(() => store.dispatch(addEntity('piece', createRandomPiece())))
