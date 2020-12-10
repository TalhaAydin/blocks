export const InfoTableHeader: React.FC = ({ children }) => {
  return (
    <th scope="row" style={{ fontWeight: 'normal', textAlign: 'left' }}>
      {children}
    </th>
  )
}
