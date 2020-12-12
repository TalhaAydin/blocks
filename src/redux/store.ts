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
import { dontRotate } from './middleware/dontRotate'

export const store = createStore(
  rootReducer,
  composeWithDevTools(
    applyMiddleware(
      addPiece,
      dontRotate,
      limitMovement,
      fixRotation,
      buildPile,
      clearLines,
      gravitatePile,
      logStatusMessage,
      addPile,
      resetGame,
      descendPiece
    )
  )
)
