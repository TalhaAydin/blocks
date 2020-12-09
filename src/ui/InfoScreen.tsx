export const InfoScreen: React.FC = ({ children }) => {
  return (
    <div
      style={{
        backgroundColor: 'black',
        color: 'lightgreen',
        width: '100%',
        height: '100%',
        fontFamily: 'monospace',
        padding: '16px',
        boxSizing: 'border-box',
      }}
    >
      {children}
    </div>
  )
}
