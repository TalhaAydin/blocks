import { Action } from 'redux'
import { GameStatus } from '../reducers/game'

// types & type guards

export enum GameActionType {
  SET_STATUS = 'GAME_SET_STATUS',
  ADD_LINE_CLEAR = 'GAME_ADD_LINE_CLEAR',
  RESET_LINE_CLEARS = 'GAME_RESET_LINE_CLEARS',
}

export interface SetStatusGameAction extends Action<GameActionType.SET_STATUS> {
  status: GameStatus
}

export interface AddClearedLinesGameAction
  extends Action<GameActionType.ADD_LINE_CLEAR> {
  count: number
}

export interface ResetClearedLinesGameAction
  extends Action<GameActionType.RESET_LINE_CLEARS> {}

export type GameActions =
  | SetStatusGameAction
  | AddClearedLinesGameAction
  | ResetClearedLinesGameAction

// implementations

export const setStatus = (status: GameStatus): SetStatusGameAction => ({
  type: GameActionType.SET_STATUS,
  status,
})

export const addClearedLines = (count: number): AddClearedLinesGameAction => ({
  type: GameActionType.ADD_LINE_CLEAR,
  count,
})

export const resetClearedLines = (): ResetClearedLinesGameAction => ({
  type: GameActionType.RESET_LINE_CLEARS,
})
