import { Action } from 'redux'
import { EntityData, EntityID } from '../../types/entities'

// types & type guards

export enum EntitiesActionType {
  ADD = 'ENTITIES_ADD',
}

export interface AddEntityAction extends Action<EntitiesActionType.ADD> {
  id: EntityID
  data: EntityData
}

export type EntitiesActions = AddEntityAction // | ... | ... | etc.

// implementations

export const addEntity = (id: EntityID, data: EntityData): AddEntityAction => ({
  type: EntitiesActionType.ADD,
  id,
  data,
})
