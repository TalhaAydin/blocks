import { Reducer } from 'redux'
import { EntitiesActions, EntitiesActionType } from '../actions/entities'
import { EntityID, EntityData } from '../../types/entities'

export type EntitiesState = Record<EntityID, EntityData>

const initialState: EntitiesState = {}

export const entitiesReducer: Reducer<EntitiesState, EntitiesActions> = (
  state = initialState,
  action
) => {
  switch (action.type) {
    case EntitiesActionType.ADD:
      return {
        ...state,
        [action.id]: action.data,
      }
    default:
      return state
  }
}
