import { Action } from 'redux'
import { Message } from '../reducers/messages'

// types & type guards

export enum MessagesActionType {
  ADD = 'MESSAGES_ADD',
}

export interface AddMessagesAction extends Action<MessagesActionType.ADD> {
  message: Message
}

export type MessagesActions = AddMessagesAction

// implementations

export const addMessage = (message: Message): AddMessagesAction => ({
  type: MessagesActionType.ADD,
  message,
})
