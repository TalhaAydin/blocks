import { combineLatest } from 'rxjs'
import { filter, distinctUntilChanged } from 'rxjs/operators'

import { hasPile, isGameInProgress } from '../subjects'
import { addEntity } from '../../redux/actions/entities'
import { store } from '../../redux/store'
import { createVector } from '../../utils/vector'

combineLatest([
  hasPile.pipe(distinctUntilChanged()),
  isGameInProgress.pipe(distinctUntilChanged()),
])
  .pipe(filter(([p, g]) => g && !p))
  .subscribe(() =>
    store.dispatch(
      addEntity('pile', {
        shape: {},
        position: createVector(0, 0),
        rotation: 0,
      })
    )
  )
