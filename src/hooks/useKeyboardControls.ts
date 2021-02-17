import { useSelector } from 'react-redux'
import { useDispatch } from '../hooks/useDispatch'
import {
  EntityRotationDirection,
  moveEntity,
  rotateEntity,
} from '../redux/actions/entities'
import { setStatus } from '../redux/actions/game'
import { GameStatus } from '../redux/reducers/game'
import { getStatus } from '../redux/selectors/game'
import {
  isGamePausable,
  isGameStartable,
  isGameEndable,
  isGameCreatable,
  isPieceControllable,
} from '../utils/controls'
import { createVector, Movement } from '../utils/vector'
import { useKey } from './useKey'

export const useKeyboardControls = () => {
  const dispatch = useDispatch()
  const gameStatus = useSelector(getStatus)

  useKey(
    'Enter',
    () => dispatch(setStatus(GameStatus.ACTIVE)),
    isGameStartable(gameStatus)
  )

  useKey(
    'KeyP',
    () =>
      dispatch(
        setStatus(
          gameStatus === GameStatus.ACTIVE
            ? GameStatus.PAUSED
            : GameStatus.ACTIVE
        )
      ),
    isGamePausable(gameStatus)
  )

  useKey(
    'Escape',
    () => dispatch(setStatus(GameStatus.OVER)),
    isGameEndable(gameStatus)
  )

  useKey(
    'F1',
    () => dispatch(setStatus(GameStatus.PENDING)),
    isGameCreatable(gameStatus)
  )

  useKey(
    'Space',
    () => dispatch(moveEntity('piece', createVector(0, 25))),
    isPieceControllable(gameStatus)
  )

  useKey(
    'ArrowDown',
    () => dispatch(moveEntity('piece', Movement.Down)),
    isPieceControllable(gameStatus)
  )

  useKey(
    'ArrowLeft',
    () => dispatch(moveEntity('piece', Movement.Left)),
    isPieceControllable(gameStatus)
  )

  useKey(
    'ArrowRight',
    () => dispatch(moveEntity('piece', Movement.Right)),
    isPieceControllable(gameStatus)
  )

  useKey(
    'ArrowUp',
    (e) =>
      dispatch(
        rotateEntity(
          'piece',
          EntityRotationDirection[e.ctrlKey ? 'Left' : 'Right']
        )
      ),
    isPieceControllable(gameStatus)
  )
}
