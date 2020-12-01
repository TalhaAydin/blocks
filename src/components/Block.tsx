import { StandardLonghandProperties } from 'csstype'

export interface BlockProps {
  color: StandardLonghandProperties['backgroundColor']
  x: number
  y: number
}

export const Block: React.FC<BlockProps> = ({ color, x, y }) => {
  return (
    <div
      data-testid="game.block"
      style={{
        boxSizing: 'border-box',
        backgroundColor: color,
        width: '100%',
        height: '100%',
        gridColumn: `${x + 1} / span 1`,
        gridRow: `${y + 1} / span 1`,
      }}
    />
  )
}
