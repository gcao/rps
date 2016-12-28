import { createAction } from 'redux-actions'

export const INITIALIZE = 'computerPlayer.initialize'
export const PLAY       = 'computerPlayer.play'

export let initialize = createAction(INITIALIZE)
export let play       = createAction(PLAY)
