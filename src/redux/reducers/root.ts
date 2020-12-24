import { combineReducers } from 'redux'
import { entitiesReducer as entities } from './entities'
import { gameReducer as game } from './game'

export const rootReducer = combineReducers({
  entities,
  game,
})

export type RootState = ReturnType<typeof rootReducer>
