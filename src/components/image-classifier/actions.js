import { createAction } from 'redux-actions'

export const INITIALIZE       = 'imageClassifier.initialize'
export const UPDATE           = 'imageClassifier.update'
export const CAPTURE          = 'imageClassifier.capture'
export const FLAG             = 'imageClassifier.flag'
export const TOGGLE_SAVE_FLAG = 'imageClassifier.toggleSaveFlag'

export let initialize     = createAction(INITIALIZE)
export let update         = createAction(UPDATE)
export let capture        = createAction(CAPTURE)
export let flag           = createAction(FLAG)
export let toggleSaveFlag = createAction(TOGGLE_SAVE_FLAG)
