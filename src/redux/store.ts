import { applyMiddleware, createStore } from 'redux'
import { limitMovement } from './middleware/limitMovement'
import { rootReducer } from './reducers/root'
import { composeWithDevTools } from 'redux-devtools-extension'
import { fixRotation } from './middleware/fixRotation'
import { buildPile } from './middleware/buildPile'
import { addPiece } from './middleware/addPiece'
import { clearLines } from './middleware/clearLines'
import { gravitatePile } from './middleware/gravitatePile'
import { descendPiece } from './middleware/descendPiece'
import { logStatusMessage } from './middleware/logMessage'
import { addPile } from './middleware/addPile'
import { resetGame } from './middleware/resetGame'
import { resetDescent } from './middleware/resetDescent'

export const store = createStore(
  rootReducer,
  composeWithDevTools(
    applyMiddleware(
      limitMovement,
      fixRotation,
      buildPile,
      addPiece,
      clearLines,
      gravitatePile,
      descendPiece,
      logStatusMessage,
      addPile,
      resetGame,
      resetDescent
    )
  )
)
