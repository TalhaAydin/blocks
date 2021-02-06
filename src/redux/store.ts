import { composeWithDevTools } from 'redux-devtools-extension'
import { applyMiddleware, createStore } from 'redux'

// redux
import { rootReducer } from './reducers/root'
import { emit } from './middleware/emit'

// selectors
import { hasPiece as hasPieceSelector } from './selectors/entities'
import { isGameInProgress as isGameInProgressSelector } from './selectors/game'

// emit data
import { hasPiece as getHasPieceEmitData } from './emits/hasPiece'
import { isGameInProgress as getIsGameInProgressEmitData } from './emits/isGameInProgress'

// subjects
import { hasPiece as hasPieceSubject } from '../rxjs/subjects'
import { isGameInProgress as isGameInProgressSubject } from '../rxjs/subjects'

// side effects
import '../rxjs/effects/addPiece'

export const store = createStore(
  rootReducer,
  composeWithDevTools(
    applyMiddleware(
      emit(hasPieceSubject)(hasPieceSelector)(getHasPieceEmitData),
      emit(isGameInProgressSubject)(isGameInProgressSelector)(
        getIsGameInProgressEmitData
      )
      // addPiece,
      // dontRotate,
      // buildPile,
      // limitMovement,
      // fixRotation,
      // clearLines,
      // gravitatePile,
      // addPile,
      // resetGame,
      // descendPiece,
      // addGhost,
      // transformGhost
    )
  )
)
