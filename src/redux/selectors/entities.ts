import { createSelector } from 'reselect'
import { RootState } from '../reducers/root'
import { EntitiesState, EntityData, EntityID } from '../reducers/entities'
import { Blocks, moveBlocks, rotateBlocks } from '../../utils/blocks'
import { getPlacedEntityBlocks } from '../../utils/entities'

export const getEntities = (state: RootState): EntitiesState => state.entities

export const getEntityData = (id: EntityID) =>
  createSelector(getEntities, (entities): EntityData => entities[id])

export const getAllBlocks = createSelector(
  getEntities,
  (entities): Blocks => {
    return Object.values(entities).reduce(
      (result, entity) => ({
        ...result,
        ...getPlacedEntityBlocks(entity),
      }),
      {}
    )
  }
)
