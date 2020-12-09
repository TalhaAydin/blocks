import { InfoScreen } from '../ui/InfoScreen'
import { InfoSection } from '../ui/InfoSection'

export const Info: React.FC = () => {
  return (
    <InfoScreen>
      <h1>Blocks</h1>
      <InfoSection header="Game">
        <table>
          <tbody>
            <tr>
              <th scope="row">Status</th>
              <td>Pending</td>
            </tr>
            <tr>
              <th scope="row">Level</th>
              <td>0</td>
            </tr>
            <tr>
              <th scope="row">Score</th>
              <td>0</td>
            </tr>
          </tbody>
        </table>
      </InfoSection>
      <InfoSection header="Statistics">
        <table>
          <tbody>
            <tr>
              <th scope="row">Lines cleared</th>
              <td>0</td>
            </tr>
          </tbody>
        </table>
      </InfoSection>
      <InfoSection header="Game controls">
        <dl>
          <dt>Enter</dt>
          <dd>Start game</dd>
        </dl>
        <dl>
          <dt>Enter</dt>
          <dd>Start game</dd>
        </dl>
      </InfoSection>
    </InfoScreen>
  )
}
