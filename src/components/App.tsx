import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addEntity, moveEntity } from '../redux/actions/entities'
import { getAllBlocks } from '../redux/selectors/entities'
import { Movement } from '../types/vector'
import { createPoint, createVector, getHash, getPoint } from '../utils/math'
import { Block } from './Block'
import { Field } from './Field'

export const App = () => {
  const dispatch = useDispatch()
  const allBlocks = useSelector(getAllBlocks)

  useEffect(() => {
    document.addEventListener('keydown', (e) => {
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
        dispatch(moveEntity('tetromino', Movement.Up))
      }
    })
    dispatch(
      addEntity('tetromino', {
        shape: {
          [getHash(createPoint(0, 0))]: { color: 'purple' },
          [getHash(createPoint(-1, 0))]: { color: 'purple' },
          [getHash(createPoint(1, 0))]: { color: 'purple' },
          [getHash(createPoint(0, 1))]: { color: 'purple' },
        },
        position: createVector(5, 5),
        rotation: 0,
      })
    )
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
          width: '200px',
          height: '400px',
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