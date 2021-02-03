import { Middleware } from 'redux'
import { AllActions } from '../types'
import { Subject } from 'rxjs'

export type GetEmitData<D extends {}, S extends {}> = (
  prevState: S,
  nextState: S
) => undefined | D

export const emit = <T extends {}>(subject: Subject<T>) => <S extends {}>(
  getEmitData: GetEmitData<T, S>
): Middleware => ({ getState }) => (next) => (action: AllActions) => {
  const prevState = getState()
  next(action)
  const nextState = getState()
  const emitData = getEmitData(prevState, nextState)
  if (emitData !== undefined) {
    subject.next(emitData)
  }
}
