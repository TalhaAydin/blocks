import { combineReducers } from 'redux'
import { entitiesReducer as entities } from './entities'

export const rootReducer = combineReducers({
  entities,
})

export type RootState = ReturnType<typeof rootReducer>
