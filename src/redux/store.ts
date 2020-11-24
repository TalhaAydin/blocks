import { applyMiddleware, createStore } from 'redux'
import { moveInField } from './middleware/moveInField'
import { rootReducer } from './reducers/root'
import { composeWithDevTools } from 'redux-devtools-extension'
import { rotateInField } from './middleware/rotateInField'

export const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(moveInField, rotateInField))
)
