import { Action } from 'redux'
import { EntityData, EntityID } from '../../types/entities'
import { Vector } from '../../types/math'

// types & type guards

export enum EntitiesActionType {
  ADD = 'ENTITIES_ADD',
  MOVE = 'ENTITIES_MOVE',
}

export interface AddEntityAction extends Action<EntitiesActionType.ADD> {
  id: EntityID
  data: EntityData
}

export interface MoveEntityAction extends Action<EntitiesActionType.MOVE> {
  id: EntityID
  vector: Vector
}

export type EntitiesActions = AddEntityAction | MoveEntityAction

// implementations

export const addEntity = (id: EntityID, data: EntityData): AddEntityAction => ({
  type: EntitiesActionType.ADD,
  id,
  data,
})

export const moveEntity = (id: EntityID, vector: Vector): MoveEntityAction => ({
  type: EntitiesActionType.MOVE,
  id,
  vector,
})
