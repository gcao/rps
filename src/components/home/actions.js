import { createAction } from 'redux-actions'

export const INITIALIZE = 'home.initialize'
export const START      = 'home.start'
export const STOP       = 'home.stop'
export const PAUSE      = 'home.pause'
export const RESUME     = 'home.resume'
export const PLAY       = 'home.play'
export const DETECT     = 'home.detect'

export let initialize = createAction(INITIALIZE)
export let start      = createAction(START)
export let stop       = createAction(STOP)
export let pause      = createAction(PAUSE)
export let resume     = createAction(RESUME)
export let play       = createAction(PLAY)
export let detect     = createAction(DETECT)
