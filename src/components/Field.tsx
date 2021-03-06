import { GameGrid } from '../ui/GameGrid'
import { GameBlock } from '../ui/GameBlock'
import { useDispatch, useSelector } from 'react-redux'
import { getAllBlocks } from '../redux/selectors/entities'
import { getPoint } from '../utils/point'
import { useKeyboardControls } from '../hooks/useKeyboardControls'
import { useEffect } from 'react'
import { setStatus } from '../redux/actions/game'
import { GameStatus } from '../redux/reducers/game'
import { getStatus } from '../redux/selectors/game'

export const Field: React.FC = () => {
  const dispatch = useDispatch()
  const status = useSelector(getStatus)
  const allBlocks = useSelector(getAllBlocks)
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
      {Object.entries(allBlocks).map(([blockPointHash, blockConfig]) => {
        const p = getPoint(blockPointHash)
        return (
          <GameBlock
            key={blockPointHash}
            color={blockConfig.color}
            x={p.x}
            y={p.y}
          />
        )
      })}
    </GameGrid>
  )
}
