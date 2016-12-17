import { createAction } from 'redux-actions'

export const CAPTURE          = 'imageClassifier.capture'
export const FLAG             = 'imageClassifier.flag'
export const TOGGLE_SAVE_FLAG = 'imageClassifier.toggleSaveFlag'

export let capture        = createAction(CAPTURE)
export let flag           = createAction(FLAG)
export let toggleSaveFlag = createAction(TOGGLE_SAVE_FLAG)
