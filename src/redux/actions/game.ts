import { Action } from 'redux'
import { GameStatus } from '../reducers/game'

// types & type guards

export enum GameActionType {
  SET_STATUS = 'GAME_SET_STATUS',
  ADD_CLEARED_LINES = 'GAME_ADD_LINES_CLEARED',
}

export interface SetStatusGameAction extends Action<GameActionType.SET_STATUS> {
  status: GameStatus
}

export interface AddClearedLinesGameAction
  extends Action<GameActionType.ADD_CLEARED_LINES> {
  count: number
}

export type GameActions = SetStatusGameAction | AddClearedLinesGameAction

// implementations

export const setStatus = (status: GameStatus): SetStatusGameAction => ({
  type: GameActionType.SET_STATUS,
  status,
})

export const addClearedLines = (count: number): AddClearedLinesGameAction => ({
  type: GameActionType.ADD_CLEARED_LINES,
  count,
})
