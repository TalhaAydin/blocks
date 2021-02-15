import { applyMiddleware, createStore } from 'redux'
import { isEqualShape } from '../../../utils/blocks'
import { createZPiece } from '../../../utils/piece'
import { addEntity, deleteEntity } from '../../actions/entities'
import { addClearedLines } from '../../actions/game'
import { rootReducer, RootState } from '../../reducers/root'
import { addGhost } from '../middleware/addGhost'

const createTestStore = (preloadedState?: Partial<RootState>) =>
  createStore(rootReducer, preloadedState, applyMiddleware(addGhost))

describe('addGhost()', () => {
  it('adds ghost', () => {
    const { getState, dispatch } = createTestStore()
    expect(getState().entities.ghost).toBeUndefined()
    dispatch(addEntity('piece', createZPiece()))
    expect(getState().entities.ghost).toBeDefined()
  })

  it('removes ghost', () => {
    const { getState, dispatch } = createTestStore()
    dispatch(addEntity('piece', createZPiece()))
    dispatch(deleteEntity('piece'))
    expect(getState().entities.ghost).toBeUndefined()
  })

  it('skips removing ghost', () => {
    const { getState, dispatch } = createTestStore()
    dispatch(addEntity('piece', createZPiece()))
    dispatch(addClearedLines(1))
    expect(getState().entities.ghost).toBeDefined()
  })

  it('skips adding ghost', () => {
    const { getState, dispatch } = createTestStore()
    dispatch(addClearedLines(1))
    expect(getState().entities.ghost).toBeUndefined()
  })

  it('adds ghost with same shape', () => {
    const { getState, dispatch } = createTestStore()
    dispatch(addEntity('piece', createZPiece()))
    expect(
      isEqualShape(getState().entities.ghost.shape, createZPiece().shape)
    ).toBeTrue()
  })

  it('adds transparent ghost', () => {
    const { getState, dispatch } = createTestStore()
    dispatch(addEntity('piece', createZPiece()))
    expect(
      Object.values(getState().entities.ghost.shape).every(
        ({ color }) => color === 'transparent'
      )
    ).toBeTrue()
  })
})
