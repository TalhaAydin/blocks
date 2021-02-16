import { xor } from 'ramda'
import { createStore, Middleware, PreloadedState, Reducer } from 'redux'
import { Subject } from 'rxjs'
import { AllActions } from '../types'

export interface OnChangeConfig<S, E> {
  rootReducer?: Reducer<S> // needed for sims
  subject?: Subject<E>
  getPreEmitData?: (simAfter: S, before: S) => E
  getPostEmitData?: (after: S, before: S) => E
  stopOnPreEmit?: (data: E) => boolean
}

export const onChange = <S, E>({
  rootReducer,
  subject: s,
  getPreEmitData,
  getPostEmitData,
  stopOnPreEmit,
}: OnChangeConfig<S, E>): Middleware<{}, S> => ({ getState }) => (next) => (
  action: AllActions
) => {
  if (!xor(getPreEmitData, getPostEmitData)) {
    throw new Error(
      "Redux onChange Middleware: Need 'getPreEmitData' or 'getPostEmitData'"
    )
  }

  const subject = s || new Subject()

  const prevState = getState()

  if (getPreEmitData) {
    if (!rootReducer) {
      throw new Error(
        "Redux onChange Middleware: Need 'rootReducer' if 'getPreEmitData' is provided"
      )
    }
    const simStore = createStore(rootReducer, prevState as PreloadedState<S>)
    simStore.dispatch(action)
    const simNextState = simStore.getState()

    const data = getPreEmitData(simNextState, prevState)
    subject.next(data)
    if (stopOnPreEmit && stopOnPreEmit(data)) {
      return
    }
  }

  next(action)

  if (getPostEmitData) {
    const nextState = getState()
    const data = getPostEmitData(nextState, prevState)
    subject.next(data)
  }
}
