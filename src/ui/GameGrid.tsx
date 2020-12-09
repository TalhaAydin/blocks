interface GameGridProps {
  width: number
  height: number
}

export const GameGrid: React.FC<GameGridProps> = ({
  width,
  height,
  children,
}) => {
  return (
    <div
      data-testid="game.field"
      style={{
        height: '100%',
        display: 'grid',
        gridTemplateColumns: `repeat(${width}, 1fr)`,
        gridTemplateRows: `repeat(${height}, 1fr)`,
        gap: '1px 1px',
      }}
    >
      {children}
    </div>
  )
}
