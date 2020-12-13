import { Action, AnyAction } from 'redux'
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
  RESET = 'ENTITIES_RESET',
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

export interface ResetEntityAction extends Action<EntitiesActionType.RESET> {}

export type EntitiesActions =
  | AddEntityAction
  | MoveEntityAction
  | RotateEntityAction
  | AddBlocksAction
  | DeleteBlocksAction
  | SetBlocksAction
  | DeleteEntityAction
  | ResetEntityAction

export type EntitiesActionsWithTarget = Exclude<
  EntitiesActions,
  AddEntityAction | ResetEntityAction
>

export const isEntitiesActionWithTarget = (
  action: AnyAction
): action is EntitiesActionsWithTarget =>
  Object.values(EntitiesActionType)
    .filter(
      (v) => ![EntitiesActionType.ADD, EntitiesActionType.RESET].includes(v)
    )
    .some((v) => v === action.type)

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

export const resetEntities = (): ResetEntityAction => ({
  type: EntitiesActionType.RESET,
})
