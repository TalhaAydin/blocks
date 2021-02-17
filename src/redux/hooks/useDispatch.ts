import { Action, createStore, PreloadedState, Reducer, Store } from 'redux'
import { Subject } from 'rxjs'

export const useDispatch = <S, A extends Action>(
  rootReducer: Reducer<S>,
  store: Store<S, A>,
  subject: Subject<[S, S]>
) => (action: A) => {
  const prevState = store.getState()
  const simStore = createStore(rootReducer, prevState as PreloadedState<S>)
  simStore.dispatch(action)
  const simNextState = simStore.getState()
  subject.next([prevState, simNextState])
}
