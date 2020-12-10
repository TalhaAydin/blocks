import { StandardLonghandProperties } from 'csstype'

export interface GameBlockProps {
  color: StandardLonghandProperties['backgroundColor']
  x: number
  y: number
}

export const GameBlock: React.FC<GameBlockProps> = ({ color, x, y }) => {
  return (
    <div
      data-testid="game.block"
      style={{
        boxSizing: 'border-box',
        border: 'solid 1px black',
        backgroundColor: color,
        width: '100%',
        height: '100%',
        gridColumn: `${x + 1} / span 1`,
        gridRow: `${y + 1} / span 1`,
      }}
    />
  )
}
