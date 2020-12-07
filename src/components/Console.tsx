import { useSelector } from 'react-redux'
import { getMessages } from '../redux/selectors/messages'

export const Console = () => {
  const messages = useSelector(getMessages)

  return (
    <div
      style={{
        backgroundColor: 'black',
        color: 'lightgreen',
        width: '100%',
        height: '100%',
      }}
    >
      {messages.map((m, i) => (
        <div key={`${m}${i}`}>{m.content}</div>
      ))}
    </div>
  )
}
