import { useDispatch as createUseDispatch } from '../redux/hooks/useDispatch'
import { rootReducer } from '../redux/reducers/root'
import { store } from '../redux/store'
import { simulation } from '../rxjs/subjects'

export const useDispatch = () =>
  createUseDispatch(rootReducer, store, simulation)
