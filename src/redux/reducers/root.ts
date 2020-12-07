import { combineReducers } from 'redux'
import { entitiesReducer as entities } from './entities'
import { gameReducer as game } from './game'
import { messagesReducer as messages } from './messages'

export const rootReducer = combineReducers({
  entities,
  game,
  messages,
})

export type RootState = ReturnType<typeof rootReducer>
