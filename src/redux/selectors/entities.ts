import { createSelector } from 'reselect'
import { RootState } from '../reducers/root'
import { EntitiesState, EntityData, EntityID } from '../reducers/entities'
import { Blocks, moveBlocks, rotateBlocks } from '../../utils/blocks'

export const getEntities = (state: RootState): EntitiesState => state.entities

export const getEntityData = (id: EntityID) =>
  createSelector(getEntities, (entities): EntityData => entities[id])

export const getAllBlocks = createSelector(
  getEntities,
  (entities): Blocks => {
    return Object.values(entities).reduce(
      (result, { shape, position, rotation }) => ({
        ...result,
        ...moveBlocks(rotateBlocks(shape, rotation), position),
      }),
      {}
    )
  }
)
