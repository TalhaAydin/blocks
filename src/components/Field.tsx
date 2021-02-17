import { GameGrid } from '../ui/GameGrid'
import { GameBlock } from '../ui/GameBlock'
import { useSelector } from 'react-redux'
import { useDispatch } from '../hooks/useDispatch'
import { getAllPlacedBlocks } from '../redux/selectors/entities'
import { getPoint, Point } from '../utils/point'
import { useKeyboardControls } from '../hooks/useKeyboardControls'
import { useEffect } from 'react'
import { setStatus } from '../redux/actions/game'
import { GameStatus } from '../redux/reducers/game'
import { getStatus } from '../redux/selectors/game'
import { getHash } from '../utils/coordinate'
import { BlockConfig } from '../utils/blocks'

export const Field: React.FC = () => {
  const dispatch = useDispatch()
  const status = useSelector(getStatus)
  const allPlacedBlocks = useSelector(getAllPlacedBlocks)
  useKeyboardControls()

  useEffect(() => {
    const handler = () => {
      if (status === GameStatus.ACTIVE) {
        dispatch(setStatus(GameStatus.PAUSED))
      }
    }
    window.addEventListener('blur', handler)
    return () => {
      window.removeEventListener('blur', handler)
    }
  }, [dispatch, status])

  return (
    <GameGrid width={10} height={20}>
      {allPlacedBlocks.map((placedBlocks) =>
        Object.entries(placedBlocks)
          .map<[Point, BlockConfig]>(([h, c]) => [getPoint(h), c])
          .map(([blockPoint, blockConfig]) => (
            <GameBlock
              key={getHash(blockPoint)}
              color={blockConfig.color}
              x={blockPoint.x}
              y={blockPoint.y}
              z={blockConfig.z}
            />
          ))
      )}
    </GameGrid>
  )
}
