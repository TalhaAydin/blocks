import { composeWithDevTools } from 'redux-devtools-extension'
import { applyMiddleware, createStore } from 'redux'

// redux
import { rootReducer } from './reducers/root'

// middleware
import { hasPiece } from './middleware/onChange/hasPiece'
import { isGameInProgress } from './middleware/onChange/isGameInProgess'
import { dontRotate } from './middleware/onChange/dontRotate'
import { hasPile } from './middleware/onChange/hasPile'
import { badMove } from './middleware/onChange/badMove'

// side effects
import '../rxjs/effects'

export const store = createStore(
  rootReducer,
  composeWithDevTools(
    // prettier-ignore
    applyMiddleware(
      hasPiece,
      hasPile,
      isGameInProgress,
      badMove,
      dontRotate
    )
  )
)
