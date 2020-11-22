import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addEntity } from '../redux/actions/entities'
import { getAllBlocks } from '../redux/selectors/entities'
import { Point } from '../utils/math/Point'
import { Vector } from '../utils/math/Vector'
import { Block } from './Block'
import { Field } from './Field'

export const App = () => {
  const dispatch = useDispatch()
  const allBlocks = useSelector(getAllBlocks)

  useEffect(() => {
    dispatch(
      addEntity('tetromino', {
        shape: {
          [Point.toHash(0, 0)]: { color: 'purple' },
          [Point.toHash(-1, 0)]: { color: 'purple' },
          [Point.toHash(1, 0)]: { color: 'purple' },
          [Point.toHash(0, 1)]: { color: 'purple' },
        },
        position: Vector.serialize(5, 5),
        rotation: 0,
      })
    )
  }, [])

  console.log(allBlocks)

  return (
    <Field width={10} height={20}>
      {Object.entries(allBlocks).map(([blockPointHash, blockConfig]) => {
        const p = Point.fromHash(blockPointHash)
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
  )
}
