import { Reducer } from 'redux'
import {
  EntitiesActions,
  EntitiesActionType,
  isEntitiesActionWithTarget,
} from '../actions/entities'
import { getNextEntityRotation } from '../../utils/entities'
import { addVector, Vector } from '../../utils/vector'
import { Blocks, filterBlocks } from '../../utils/blocks'
import { getHash } from '../../utils/coordinate'

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
  if (isEntitiesActionWithTarget(action) && !state[action.id]) {
    throw new Error(
      `${action.type}: Entity with id '${action.id}' does not exist`
    )
  }

  if (action.type === EntitiesActionType.ADD && state[action.id]) {
    throw new Error(
      `${action.type}: Entity with id '${action.id}' already exists`
    )
  }

  switch (action.type) {
    case EntitiesActionType.ADD:
      return {
        ...state,
        [action.id]: action.data,
      }
    case EntitiesActionType.TRANSFORM:
      return {
        ...state,
        [action.id]: {
          ...state[action.id],
          position: action.position,
          rotation: action.rotation,
        },
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
    case EntitiesActionType.DELETE:
      const nextState = { ...state }
      delete nextState[action.id]
      return nextState
    case EntitiesActionType.ADD_BLOCKS:
      return {
        ...state,
        [action.id]: {
          ...state[action.id],
          shape: {
            ...state[action.id].shape,
            ...action.blocks,
          },
        },
      }
    case EntitiesActionType.DELETE_BLOCKS:
      const pointHashes = action.points.map(getHash)
      return {
        ...state,
        [action.id]: {
          ...state[action.id],
          shape: filterBlocks(
            state[action.id].shape,
            (point) => !pointHashes.includes(getHash(point))
          ),
        },
      }
    case EntitiesActionType.SET_BLOCKS:
      return {
        ...state,
        [action.id]: {
          ...state[action.id],
          shape: action.blocks,
        },
      }
    case EntitiesActionType.RESET:
      return initialState
    default:
      return state
  }
}
