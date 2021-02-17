import { Subject } from 'rxjs'
import { filter, map } from 'rxjs/operators'
import { map as ramdaMap, nth } from 'ramda'

import { Vector } from '../utils/vector'
import { RootState } from '../redux/reducers/root'
import { AllActions } from '../redux/types'
import { getStatus } from '../redux/selectors/game'
import { setStatus } from '../redux/actions/game'
import { store } from '../redux/store'
import { isGameStatus } from '../utils/game'

export const simulation = new Subject<[RootState, RootState]>()
export const commit = new Subject<AllActions>()
export const change = new Subject<[RootState, RootState]>()

export const hasPiece = new Subject<boolean>()
export const hasPile = new Subject<boolean>()
export const badMove = new Subject<Vector | null>()

// check game status changes
simulation
  .pipe(
    map(ramdaMap(getStatus)),
    filter(([prev, next]) => prev !== next),
    map(nth(1)),
    filter(isGameStatus),
    map(setStatus)
  )
  .subscribe((a) => commit.next(a))

combineLatest([
  hasPiece.pipe(distinctUntilChanged()),
  isGameInProgress.pipe(distinctUntilChanged()),
])
  .pipe(filter(([p, g]) => g && !p))
  .subscribe(() => store.dispatch(addEntity('piece', createRandomPiece())))

commit.subscribe(store.dispatch)
