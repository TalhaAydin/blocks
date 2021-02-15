import { createStore, Middleware, Reducer } from 'redux'
import { Selector } from 'reselect'
import { Subject } from 'rxjs'
import { AllActions } from '../types'

export interface OnChangeConfig<E, S, R> {
  subject: Subject<E>
  selector: Selector<S, R>
  selectorBefore?: Selector<S, R>
  getData: (after: R, before: R) => E
}

export interface OnBeforeChangeConfig<E, S, R> extends OnChangeConfig<E, S, R> {
  rootReducer: Reducer<S>
  stopOnEmit: (data: E) => boolean
}

export const onChange = <E, S, R>(
  before: OnBeforeChangeConfig<E, S, R> | null,
  after: OnChangeConfig<E, S, R> | null
): Middleware => ({ getState }) => (next) => (action: AllActions) => {
  const prevState = getState()

  if (before) {
    const {
      selector,
      getData,
      subject,
      selectorBefore,
      rootReducer,
      stopOnEmit,
    } = before
    const simStore = createStore(rootReducer, prevState)
    simStore.dispatch(action)
    const simNextState = simStore.getState()

    const data = getData(
      selector(simNextState),
      selectorBefore ? selectorBefore(prevState) : selector(prevState)
    )

    if (data !== undefined) {
      subject.next(data)

      if (stopOnEmit(data)) {
        return
      }
    }
  }

  next(action)

  if (after) {
    const nextState = getState()
    const { selector, getData, subject, selectorBefore } = after
    const data = getData(
      selector(nextState),
      selectorBefore ? selectorBefore(prevState) : selector(prevState)
    )
    if (data !== undefined) {
      subject.next(data)
    }
  }
}
