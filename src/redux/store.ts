import { applyMiddleware, createStore } from 'redux'
import { Subject } from 'rxjs'
import { emit } from './middleware/emit'
import { limitMovement } from './middleware/limitMovement'
import { rootReducer } from './reducers/root'
import { composeWithDevTools } from 'redux-devtools-extension'
import { fixRotation } from './middleware/fixRotation'
import { buildPile } from './middleware/buildPile'
import { addPiece } from './middleware/addPiece'
import { clearLines } from './middleware/clearLines'
import { gravitatePile } from './middleware/gravitatePile'
import { descendPiece } from './middleware/descendPiece'
import { addPile } from './middleware/addPile'
import { resetGame } from './middleware/resetGame'
import { dontRotate } from './middleware/dontRotate'
import { addGhost } from './middleware/addGhost'
import { transformGhost } from './middleware/transformGhost'
import { hasPiece } from './emit/hasPiece'

const hasPieceSubject = new Subject<boolean>()

hasPieceSubject.subscribe((value) => console.log(`hasPiece: ${value}`))

export const store = createStore(
  rootReducer,
  composeWithDevTools(
    applyMiddleware(
      emit(hasPieceSubject)(hasPiece),
      addPiece,
      dontRotate,
      buildPile,
      limitMovement,
      fixRotation,
      clearLines,
      gravitatePile,
      addPile,
      resetGame,
      descendPiece,
      addGhost,
      transformGhost
    )
  )
)
