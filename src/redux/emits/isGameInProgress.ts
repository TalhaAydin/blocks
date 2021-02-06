import { GetEmitData } from '../middleware/emit'

export const isGameInProgress: GetEmitData<boolean, boolean> = (
  selectedStateAfter
) => selectedStateAfter
