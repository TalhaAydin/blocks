import { applyMiddleware, createStore } from 'redux'
import { keepInField } from './middleware/keepInField'
import { rootReducer } from './reducers/root'
import { composeWithDevTools } from 'redux-devtools-extension'

export const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(keepInField))
)
