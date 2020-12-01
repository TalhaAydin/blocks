interface FieldProps {
  width: number
  height: number
}

export const Field: React.FC<FieldProps> = ({ width, height, children }) => {
  return (
    <div
      data-testid="game.field"
      style={{
        display: 'grid',
        gridTemplateColumns: `repeat(${width}, 20px)`,
        gridTemplateRows: `repeat(${height}, 20px)`,
        gap: '1px 1px',
      }}
    >
      {children}
    </div>
  )
}
