import { filter } from 'rxjs/operators'
import { addBlocks, deleteEntity } from '../../redux/actions/entities'
import { getEntityData } from '../../redux/selectors/entities'
import { store } from '../../redux/store'
import {
  getEntityMovementLimitedVector,
  getPlacedEntityBlocks,
} from '../../utils/entities'
import { fieldSize } from '../../utils/game'
import { addVector, isDownVector, isVector } from '../../utils/vector'
import { badMove } from '../subjects'

badMove.pipe(filter(isVector), filter(isDownVector)).subscribe((vector) => {
  const { dispatch, getState } = store

  const piece = getEntityData('piece')(getState())
  const pile = getEntityData('pile')(getState())

  if (!piece || !pile) {
    return
  }

  const limitedVector = getEntityMovementLimitedVector(
    piece,
    vector,
    fieldSize,
    [pile]
  )

  dispatch(deleteEntity('piece'))
  dispatch(
    addBlocks(
      'pile',
      getPlacedEntityBlocks({
        ...piece,
        position: addVector(piece.position, limitedVector),
      })
    )
  )
})
