import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useKey } from '../hooks/useKey'
import {
  EntityRotationDirection,
  moveEntity,
  rotateEntity,
} from '../redux/actions/entities'
import { setStatus } from '../redux/actions/game'
import { addMessage } from '../redux/actions/messages'
import { GameStatus } from '../redux/reducers/game'
import { getAllBlocks } from '../redux/selectors/entities'
import { getStatus } from '../redux/selectors/game'
import { isGameInProgress } from '../utils/game'
import { gameMessages } from '../utils/messages'
import { getPoint } from '../utils/point'
import { createVector, Movement } from '../utils/vector'
import { Block } from './Block'
import { Console } from './Console'
import { Field } from './Field'

export const App = () => {
  const dispatch = useDispatch()
  const allBlocks = useSelector(getAllBlocks)
  const gameStatus = useSelector(getStatus)

  useEffect(() => {
    dispatch(addMessage({ content: gameMessages.pending }))
  }, [])

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

  return (
    <div
      style={{
        display: 'flex',
        height: '100%',
      }}
    >
      <div
        style={{
          flex: '0 0 50vh',
        }}
      >
        <Field width={10} height={20}>
          {Object.entries(allBlocks).map(([blockPointHash, blockConfig]) => {
            const p = getPoint(blockPointHash)
            return (
              <Block
                key={blockPointHash}
                color={blockConfig.color}
                x={p.x}
                y={p.y}
              />
            )
          })}
        </Field>
      </div>
      <div
        style={{
          flex: '1 1 auto',
        }}
      >
        <Console />
      </div>
    </div>
  )
}
