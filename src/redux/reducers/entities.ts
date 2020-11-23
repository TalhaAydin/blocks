import { Reducer } from 'redux'
import { EntitiesActions, EntitiesActionType } from '../actions/entities'
import { EntityID, EntityData } from '../../types/entities'
import { addVector } from '../../utils/math'

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
    case EntitiesActionType.MOVE:
      return {
        ...state,
        [action.id]: {
          ...state[action.id],
          position: addVector(state[action.id].position, action.vector),
        },
      }
    case EntitiesActionType.ROTATE:
      return {
        ...state,
        [action.id]: {
          ...state[action.id],
          rotation: (state[action.id].rotation + action.direction) % 360,
        },
      }
    default:
      return state
  }
}
