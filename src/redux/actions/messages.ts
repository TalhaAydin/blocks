import { Action } from 'redux'
import { Message } from '../reducers/messages'

// types & type guards

export enum MessagesActionType {
  ADD = 'MESSAGES_ADD',
  RESET = 'MESSAGES_RESET',
}

export interface AddMessagesAction extends Action<MessagesActionType.ADD> {
  message: Message
}

export interface ResetMessagesAction extends Action<MessagesActionType.RESET> {}

export type MessagesActions = AddMessagesAction | ResetMessagesAction

// implementations

export const addMessage = (message: Message): AddMessagesAction => ({
  type: MessagesActionType.ADD,
  message,
})

export const resetMessages = (): ResetMessagesAction => ({
  type: MessagesActionType.RESET,
})
