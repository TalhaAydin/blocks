import { useDispatch, useSelector } from 'react-redux'
import {
  EntityRotationDirection,
  moveEntity,
  rotateEntity,
} from '../redux/actions/entities'
import { setStatus } from '../redux/actions/game'
import { GameStatus } from '../redux/reducers/game'
import { getStatus } from '../redux/selectors/game'
import { isGameInProgress } from '../utils/game'
import { createVector, Movement } from '../utils/vector'
import { useKey } from './useKey'

export const useKeyboardControls = () => {
  const dispatch = useDispatch()
  const gameStatus = useSelector(getStatus)

  useKey(
    'Enter',
    () => dispatch(setStatus(GameStatus.ACTIVE)),
    gameStatus === GameStatus.PENDING
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
    isGameInProgress(gameStatus)
  )

  useKey(
    'Escape',
    () => dispatch(setStatus(GameStatus.OVER)),
    gameStatus === GameStatus.ACTIVE
  )

  useKey(
    'F1',
    () => dispatch(setStatus(GameStatus.PENDING)),
    gameStatus === GameStatus.OVER
  )

  useKey(
    'Space',
    () => dispatch(moveEntity('piece', createVector(0, 25))),
    gameStatus === GameStatus.ACTIVE
  )

  useKey(
    'ArrowDown',
    () => dispatch(moveEntity('piece', Movement.Down)),
    gameStatus === GameStatus.ACTIVE
  )

  useKey(
    'ArrowLeft',
    () => dispatch(moveEntity('piece', Movement.Left)),
    gameStatus === GameStatus.ACTIVE
  )

  useKey(
    'ArrowRight',
    () => dispatch(moveEntity('piece', Movement.Right)),
    gameStatus === GameStatus.ACTIVE
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
    gameStatus === GameStatus.ACTIVE
  )
}
