import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  addEntity,
  EntityRotationDirection,
  moveEntity,
  rotateEntity,
} from '../redux/actions/entities'
import { getAllBlocks } from '../redux/selectors/entities'
import { createRandomPiece } from '../utils/piece'
import { getPoint } from '../utils/point'
import { createVector, Movement } from '../utils/vector'
import { Block } from './Block'
import { Field } from './Field'

export const App = () => {
  const dispatch = useDispatch()
  const allBlocks = useSelector(getAllBlocks)

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
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%',
      }}
    >
      <div
        style={{
          display: 'inline-block',
          borderLeft: 'solid 5px black',
          borderRight: 'solid 5px black',
          borderBottom: 'solid 5px black',
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
    </div>
  )
}
