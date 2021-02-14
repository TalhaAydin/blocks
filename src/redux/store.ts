import { composeWithDevTools } from 'redux-devtools-extension'
import { applyMiddleware, createStore } from 'redux'
import { and, identity } from 'ramda'

// redux
import { rootReducer } from './reducers/root'
import { emit } from './middleware/emit'
import { stop } from './middleware/stop'

// selectors
import {
  hasPiece as hasPieceSelector,
  getPiece as getPieceSelector,
} from './selectors/entities'
import { isGameInProgress as isGameInProgressSelector } from './selectors/game'

// emit data
import { hasPiece as getHasPieceEmitData } from './emits/hasPiece'
import { isGameInProgress as getIsGameInProgressEmitData } from './emits/isGameInProgress'

// subjects
import {
  hasPiece as hasPieceSubject,
  isGameInProgress as isGameInProgressSubject,
} from '../rxjs/subjects'

// side effects
import '../rxjs/effects/addPiece'

const _stop = stop(rootReducer)

export const store = createStore(
  rootReducer,
  composeWithDevTools(
    // prettier-ignore
    applyMiddleware(
      emit(hasPieceSubject)(hasPieceSelector)(identity),
      emit(isGameInProgressSubject)(isGameInProgressSelector)(identity),
      _stop(getPieceSelector)((pieceBefore, pieceAfter) => true)
      // addPiece,
      // dontRotate,

      // todo
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
