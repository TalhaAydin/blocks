import { GameGrid } from '../ui/GameGrid'
import { GameBlock } from '../ui/GameBlock'
import { useSelector } from 'react-redux'
import { getAllBlocks } from '../redux/selectors/entities'
import { getPoint } from '../utils/point'
import { useKeyboardControls } from '../hooks/useKeyboardControls'

export const Field: React.FC = () => {
  const allBlocks = useSelector(getAllBlocks)
  useKeyboardControls()

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
