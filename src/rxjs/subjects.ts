import { Subject } from 'rxjs'
import { Vector } from '../utils/vector'

export const hasPiece = new Subject<boolean>()
export const hasPile = new Subject<boolean>()
export const isGameInProgress = new Subject<boolean>()
export const badMove = new Subject<Vector | null>()
