export const InfoTable: React.FC = ({ children }) => {
  return (
    <table style={{ borderCollapse: 'collapse' }}>
      <tbody>{children}</tbody>
    </table>
  )
}
