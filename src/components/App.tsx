import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  addEntity,
  EntityRotationDirection,
  moveEntity,
  rotateEntity,
} from '../redux/actions/entities'
import { addMessage } from '../redux/actions/messages'
import { getAllBlocks } from '../redux/selectors/entities'
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

  useEffect(() => {
    dispatch(addMessage({ content: gameMessages.pending }))
  }, [])

  useEffect(() => {
    document.addEventListener('keydown', (e) => {
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
  }, [])

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
