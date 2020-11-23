import { createSelector } from 'reselect'
import { RootState } from '../reducers/root'
import { EntitiesState } from '../reducers/entities'
import { moveBlocks } from '../../utils/blocks'
import { Blocks } from '../../types/blocks'

export const getEntities = (state: RootState): EntitiesState => state.entities

export const getAllBlocks = createSelector(
  getEntities,
  (entities): Blocks => {
    return Object.values(entities).reduce(
      (result, { shape, position }) => ({
        ...result,
        ...moveBlocks(shape, position),
      }),
      {}
    )
  }
)
