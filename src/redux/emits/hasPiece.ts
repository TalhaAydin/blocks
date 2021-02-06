import { GetEmitData } from '../middleware/emit'

export const hasPiece: GetEmitData<boolean, boolean> = (selectedStateAfter) =>
  selectedStateAfter
