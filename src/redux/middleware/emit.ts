import { Middleware } from 'redux'
import { AllActions } from '../types'
import { Subject } from 'rxjs'
import { Selector } from 'reselect'

export type GetEmitData<S extends {}, D extends {}> = (
  selectedStateAfter: S,
  selectedStateBefore: S
) => D

export const emit = <E extends {}>(subject: Subject<E>) => <
  R extends {},
  S extends {}
>(
  selectState: Selector<S, R>,
  selectStateBefore?: Selector<S, R>
) => (getEmitData: GetEmitData<R, E>): Middleware => ({ getState }) => (
  next
) => (action: AllActions) => {
  const prevState = selectStateBefore
    ? selectStateBefore(getState())
    : selectState(getState())
  next(action)
  const nextState = selectState(getState())
  subject.next(getEmitData(nextState, prevState))
}
