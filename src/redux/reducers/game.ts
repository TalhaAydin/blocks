import { Reducer } from 'redux'
import { GameActions, GameActionType } from '../actions/game'

export enum GameStatus {
  PENDING,
  ACTIVE,
  PAUSED,
  OVER,
}

export interface GameState {
  status: GameStatus
  linesCleared: number
}

const initialState: GameState = {
  status: GameStatus.PENDING,
  linesCleared: 0,
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
    case GameActionType.ADD_CLEARED_LINES:
      return {
        ...state,
        linesCleared: state.linesCleared + action.count,
      }
    default:
      return state
  }
}