import { useSelector } from 'react-redux'
import { getStatus, getLinesCleared } from '../redux/selectors/game'
import { InfoGlossary } from '../ui/InfoGlossary'
import { InfoGlossaryEntry as Entry } from '../ui/InfoGlossaryEntry'
import { InfoScreen } from '../ui/InfoScreen'
import { InfoSection } from '../ui/InfoSection'
import { InfoTable } from '../ui/InfoTable'
import { InfoTableCell as Cell } from '../ui/InfoTableCell'
import { InfoTableHeader as Header } from '../ui/InfoTableHeader'
import { InfoTableRow as Row } from '../ui/InfoTableRow'
import {
  isPieceControllable,
  isGameCreatable,
  isGameEndable,
  isGamePausable,
  isGameStartable,
} from '../utils/controls'

export const Info: React.FC = () => {
  const gameStatus = useSelector(getStatus)
  const linesCleared = useSelector(getLinesCleared)
  const isControllable = isPieceControllable(gameStatus)

  return (
    <InfoScreen>
      <h1>Blocks</h1>
      <p>
        Source:{' '}
        <a
          href="https://github.com/TalhaAydin/blocks"
          style={{ color: 'white' }}
          target="_blank"
        >
          github.com/TalhaAydin/blocks
        </a>
      </p>
      <InfoSection header="Game">
        <InfoTable>
          <Row>
            <Header>Status</Header>
            <Cell>{gameStatus}</Cell>
          </Row>
          <Row>
            <Header>Level</Header>
            <Cell>0</Cell>
          </Row>
          <Row>
            <Header>Score</Header>
            <Cell>0</Cell>
          </Row>
        </InfoTable>
      </InfoSection>
      <InfoSection header="Statistics">
        <InfoTable>
          <Row>
            <Header>Lines cleared</Header>
            <Cell>{linesCleared}</Cell>
          </Row>
        </InfoTable>
      </InfoSection>
      <InfoSection header="Game controls">
        <InfoGlossary>
          <Entry
            term="⌨ F1"
            details="Create a new game"
            enabled={isGameCreatable(gameStatus)}
          />
          <Entry
            term="⌨ Enter"
            details="Start game"
            enabled={isGameStartable(gameStatus)}
          />
          <Entry
            term="⌨ P"
            details="Pause / unpause game"
            enabled={isGamePausable(gameStatus)}
          />
          <Entry
            term="⌨ Escape"
            details="End game"
            enabled={isGameEndable(gameStatus)}
          />
        </InfoGlossary>
      </InfoSection>
      <InfoSection header="Block controls">
        <InfoGlossary>
          <Entry term="⌨ Left" details="Move left" enabled={isControllable} />
          <Entry term="⌨ Right" details="Move right" enabled={isControllable} />
          <Entry term="⌨ Down" details="Move down" enabled={isControllable} />
          <Entry term="⌨ Up" details="Rotate right" enabled={isControllable} />
          <Entry
            term="⌨ Ctrl + Up"
            details="Rotate left"
            enabled={isControllable}
          />
          <Entry
            term="⌨ Space"
            details="Drop to bottom"
            enabled={isControllable}
          />
        </InfoGlossary>
      </InfoSection>
    </InfoScreen>
  )
}
