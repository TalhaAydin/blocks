import { createStore, Middleware, Reducer } from 'redux'
import { Selector } from 'reselect'
import { AllActions } from '../types'

export type IsBadState<S = any> = (
  selectedStateAfter: S,
  selectedStateBefore: S
) => boolean

export const stop = <S extends {}>(rootReducer: Reducer<S>) => <R = any>(
  selectState: Selector<S, R>,
  selectStateBefore?: Selector<S, R>
) => (isBadState: IsBadState<R>): Middleware => ({ getState }) => (next) => (
  action: AllActions
) => {
  const stateBefore = getState()
  const simStore = createStore(rootReducer, stateBefore)
  simStore.dispatch(action)
  const stateAfter = simStore.getState()

  if (
    !isBadState(
      selectState(stateAfter),
      selectStateBefore
        ? selectStateBefore(stateBefore)
        : selectState(stateBefore)
    )
  ) {
    next(action)
  }
}
