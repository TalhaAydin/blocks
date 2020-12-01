import { Action } from 'redux'
import { Blocks } from '../../utils/blocks'
import { Point } from '../../utils/point'
import { Vector } from '../../utils/vector'
import { EntityData, EntityID } from '../reducers/entities'

// types & type guards

export enum EntityRotationDirection {
  Left = -90,
  Right = 90,
}

export enum EntitiesActionType {
  ADD = 'ENTITIES_ADD',
  MOVE = 'ENTITIES_MOVE',
  ROTATE = 'ENTITIES_ROTATE',
  ADD_BLOCKS = 'ENTITIES_ADD_BLOCKS',
  DELETE_BLOCKS = 'ENTITIES_DELETE_BLOCKS',
  SET_BLOCKS = 'ENTITIES_SET_BLOCKS',
  DELETE = 'ENTITIES_DELETE',
  MOVEMENT_LIMITED = 'ENTITIES_MOVEMENT_LIMITED',
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

export interface AddBlocksAction extends Action<EntitiesActionType.ADD_BLOCKS> {
  id: EntityID
  blocks: Blocks
}

export interface DeleteBlocksAction
  extends Action<EntitiesActionType.DELETE_BLOCKS> {
  id: EntityID
  points: Point[]
}

export interface SetBlocksAction extends Action<EntitiesActionType.SET_BLOCKS> {
  id: EntityID
  blocks: Blocks
}

export interface DeleteEntityAction extends Action<EntitiesActionType.DELETE> {
  id: EntityID
}

export interface EntityMovementLimitedAction
  extends Action<EntitiesActionType.MOVEMENT_LIMITED> {
  id: EntityID
  vector: Vector
  original: Vector
}

export type EntitiesActions =
  | AddEntityAction
  | MoveEntityAction
  | RotateEntityAction
  | AddBlocksAction
  | DeleteBlocksAction
  | SetBlocksAction
  | DeleteEntityAction
  | EntityMovementLimitedAction

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

export const addBlocks = (id: EntityID, blocks: Blocks): AddBlocksAction => ({
  type: EntitiesActionType.ADD_BLOCKS,
  id,
  blocks,
})

export const setBlocks = (id: EntityID, blocks: Blocks): SetBlocksAction => ({
  type: EntitiesActionType.SET_BLOCKS,
  id,
  blocks,
})

export const deleteBlocks = (
  id: EntityID,
  points: Point[]
): DeleteBlocksAction => ({
  type: EntitiesActionType.DELETE_BLOCKS,
  id,
  points,
})

export const deleteEntity = (id: EntityID): DeleteEntityAction => ({
  type: EntitiesActionType.DELETE,
  id,
})

export const movementLimited = (
  id: EntityID,
  vector: Vector,
  original: Vector
) => ({
  type: EntitiesActionType.MOVEMENT_LIMITED,
  id,
  vector,
  original,
})
