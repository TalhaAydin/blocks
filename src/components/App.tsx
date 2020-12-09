import { Field } from './Field'
import { Info } from './Info'

export const App = () => {
  return (
    <div
      style={{
        display: 'flex',
        height: '100%',
      }}
    >
      <div
        style={{
          flex: '0 0 50vh',
        }}
      >
        <Field />
      </div>
      <div
        style={{
          flex: '1 1 auto',
        }}
      >
        <Info />
      </div>
    </div>
  )
}
