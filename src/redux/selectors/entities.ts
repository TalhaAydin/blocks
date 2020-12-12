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

export const getAllBlocks = createSelector(
  getEntities,
  (entities): Blocks => getPlacedEntityBlocks(Object.values(entities))
)

export const hasEntity = (id: EntityID) =>
  createSelector(getEntities, (entities): boolean => !!entities[id])
