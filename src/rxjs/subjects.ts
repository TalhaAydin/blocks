import { Subject } from 'rxjs'

export const hasPiece = new Subject<boolean>()
export const isGameInProgress = new Subject<boolean>()
