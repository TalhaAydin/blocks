import { useSelector } from 'react-redux'
import { GameStatus } from '../redux/reducers/game'
import {
  getLevel,
  getLineClearsCount,
  getScore,
  getStatus,
  getTotalLinesCleared,
} from '../redux/selectors/game'
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
  const totalLinesCleared = useSelector(getTotalLinesCleared)
  const singleLineClears = useSelector(getLineClearsCount(1))
  const doubleLineClears = useSelector(getLineClearsCount(2))
  const tripleLineClears = useSelector(getLineClearsCount(3))
  const quadLineClears = useSelector(getLineClearsCount(4))
  const score = useSelector(getScore)
  const level = useSelector(getLevel)

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
            <Cell>{level}</Cell>
          </Row>
          <Row>
            <Header>Score</Header>
            <Cell>{score}</Cell>
          </Row>
        </InfoTable>
      </InfoSection>
      <InfoSection header="Statistics">
        <InfoTable>
          <Row>
            <Header>1-Line clears</Header>
            <Cell>{singleLineClears} x 1</Cell>
          </Row>
          <Row>
            <Header>2-Line clears</Header>
            <Cell>{doubleLineClears} x 2</Cell>
          </Row>
          <Row>
            <Header>3-Line clears</Header>
            <Cell>{tripleLineClears} x 3</Cell>
          </Row>
          <Row>
            <Header>4-Line clears</Header>
            <Cell>{quadLineClears} x 4</Cell>
          </Row>
          <Row>
            <Header>Total lines cleared</Header>
            <Cell>{totalLinesCleared}</Cell>
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
            details={`${
              gameStatus === GameStatus.PAUSED ? 'Unpause' : 'Pause'
            } game`}
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
