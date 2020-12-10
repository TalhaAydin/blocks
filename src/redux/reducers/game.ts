import { Reducer } from 'redux'
import { GameActions, GameActionType } from '../actions/game'

export enum GameStatus {
  PENDING = 'Game Pending',
  ACTIVE = 'Game Active',
  PAUSED = 'Game Paused',
  OVER = 'Game Over',
}

export interface GameState {
  status: GameStatus
  lineClears: number[]
}

const initialState: GameState = {
  status: GameStatus.PENDING,
  lineClears: [],
}

export const gameReducer: Reducer<GameState, GameActions> = (
  state = initialState,
  action
) => {
  switch (action.type) {
    case GameActionType.SET_STATUS:
      return {
        ...state,
        status: action.status,
      }
    case GameActionType.ADD_LINE_CLEAR:
      return {
        ...state,
        lineClears: [...state.lineClears, action.count],
      }
    case GameActionType.RESET_LINE_CLEARS:
      return {
        ...state,
        lineClears: [],
      }
    default:
      return state
  }
}
