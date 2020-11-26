import { Reducer } from 'redux'
import { EntitiesActions, EntitiesActionType } from '../actions/entities'
import { getNextEntityRotation } from '../../utils/entities'
import { addVector, Vector } from '../../utils/vector'
import { Blocks } from '../../utils/blocks'

export type EntityPosition = Vector
export type EntityRotation = number // 0 | 90 | 180 | 270
export type EntityShape = Blocks

export type EntityID = string
export interface EntityData {
  readonly shape: EntityShape
  readonly position: EntityPosition
  readonly rotation: EntityRotation
}

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
          rotation: getNextEntityRotation(
            state[action.id].rotation,
            action.direction
          ),
        },
      }
    default:
      return state
  }
}
