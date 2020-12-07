import { MessagesState } from '../reducers/messages'
import { RootState } from '../reducers/root'

export const getMessages = (state: RootState): MessagesState => state.messages
