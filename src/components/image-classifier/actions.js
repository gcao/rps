import { createAction } from 'redux-actions'

export const INITIALIZE       = 'imageClassifier.initialize'
export const CANCEL           = 'imageClassifier.cancel'
export const SHOW_TRAINING    = 'imageClassifier.showTraining'
export const HIDE_TRAINING    = 'imageClassifier.hideTraining'
export const CAPTURE          = 'imageClassifier.capture'
export const FLAG             = 'imageClassifier.flag'
export const TOGGLE_SAVE_FLAG = 'imageClassifier.toggleSaveFlag'

export let initialize     = createAction(INITIALIZE)
export let cancel         = createAction(CANCEL)
export let showTraining   = createAction(SHOW_TRAINING)
export let hideTraining   = createAction(HIDE_TRAINING)
export let capture        = createAction(CAPTURE)
export let flag           = createAction(FLAG)
export let toggleSaveFlag = createAction(TOGGLE_SAVE_FLAG)
