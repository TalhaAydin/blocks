import { createSelector } from 'reselect'
import { RootState } from '../reducers/root'
import { EntitiesState, EntityData, EntityID } from '../reducers/entities'
import { Blocks } from '../../utils/blocks'
import { getPlacedEntityBlocks } from '../../utils/entities'

export const getEntities = (state: RootState): EntitiesState => state.entities

export const getEntityData = (id: EntityID) =>
  createSelector(
    getEntities,
    (entities): EntityData | undefined => entities[id]
  )

export const getAllPlacedBlocks = createSelector(
  getEntities,
  (entities): Blocks[] => Object.values(entities).map(getPlacedEntityBlocks)
)

export const hasEntity = (id: EntityID) =>
  createSelector(getEntities, (entities): boolean => !!entities[id])

export const hasPiece = hasEntity('piece')
