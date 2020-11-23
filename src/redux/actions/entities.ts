import { Action } from 'redux'
import { EntityData, EntityID } from '../../types/entities'
import { Vector } from '../../types/math'

// types & type guards

export enum EntityRotationDirection {
  Left = -90,
  Right = 90,
}

export enum EntitiesActionType {
  ADD = 'ENTITIES_ADD',
  MOVE = 'ENTITIES_MOVE',
  ROTATE = 'ENTITIES_ROTATE',
}

export interface AddEntityAction extends Action<EntitiesActionType.ADD> {
  id: EntityID
  data: EntityData
}

export interface MoveEntityAction extends Action<EntitiesActionType.MOVE> {
  id: EntityID
  vector: Vector
}

export interface RotateEntityAction extends Action<EntitiesActionType.ROTATE> {
  id: EntityID
  direction: EntityRotationDirection
}

export type EntitiesActions =
  | AddEntityAction
  | MoveEntityAction
  | RotateEntityAction

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

export const rotateEntity = (
  id: EntityID,
  direction: EntityRotationDirection
): RotateEntityAction => ({
  type: EntitiesActionType.ROTATE,
  id,
  direction,
})
