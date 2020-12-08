import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useKey } from '../hooks/useKey'
import {
  addEntity,
  EntityRotationDirection,
  moveEntity,
  rotateEntity,
} from '../redux/actions/entities'
import { setStatus } from '../redux/actions/game'
import { addMessage } from '../redux/actions/messages'
import { GameStatus } from '../redux/reducers/game'
import { getAllBlocks } from '../redux/selectors/entities'
import { getStatus } from '../redux/selectors/game'
import { gameMessages } from '../utils/messages'
import { createRandomPiece } from '../utils/piece'
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
    gameStatus === GameStatus.ACTIVE || gameStatus === GameStatus.PAUSED
  )

  useKey(
    'Escape',
    () => dispatch(setStatus(GameStatus.OVER)),
    gameStatus === GameStatus.ACTIVE
  )

  useKey(
    'F1',
    () => dispatch(setStatus(GameStatus.ACTIVE)),
    gameStatus === GameStatus.OVER
  )

  /*
  useEffect(() => {
    document.addEventListener('keydown', (e) => {
      console.log(e.code)
      if (e.code === 'Space') {
        dispatch(moveEntity('tetromino', createVector(0, 25)))
      }
      if (e.code === 'ArrowDown') {
        dispatch(moveEntity('tetromino', Movement.Down))
      }
      if (e.code === 'ArrowLeft') {
        dispatch(moveEntity('tetromino', Movement.Left))
      }
      if (e.code === 'ArrowRight') {
        dispatch(moveEntity('tetromino', Movement.Right))
      }
      if (e.code === 'ArrowUp') {
        dispatch(
          rotateEntity(
            'tetromino',
            EntityRotationDirection[e.ctrlKey ? 'Left' : 'Right']
          )
        )
      }
    })
    dispatch(
      addEntity('pile', {
        shape: {},
        position: createVector(0, 0),
        rotation: 0,
      })
    )
    dispatch(addEntity('tetromino', createRandomPiece()))
  }, [dispatch])
  */

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
