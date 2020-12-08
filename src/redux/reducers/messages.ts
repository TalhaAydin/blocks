import { Reducer } from 'redux'
import { MessagesActions, MessagesActionType } from '../actions/messages'

export interface Message {
  content: string
}

export type MessagesState = Message[]

const initialState: MessagesState = []

export const messagesReducer: Reducer<MessagesState, MessagesActions> = (
  state = initialState,
  action
) => {
  switch (action.type) {
    case MessagesActionType.ADD:
      return [...state, action.message]
    case MessagesActionType.RESET:
      return initialState
    default:
      return state
  }
}
