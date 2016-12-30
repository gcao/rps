import { createAction } from 'redux-actions'

export const INITIALIZE       = 'imageClassifier.initialize'
export const RESET            = 'imageClassifier.reset'
export const RETRAIN          = 'imageClassifier.retrain'
export const CANCEL_RETRAIN   = 'imageClassifier.cancelRetrain'
export const END_RETRAIN      = 'imageClassifier.endRetrain'
export const RETRAIN_IMAGE    = 'imageClassifier.retrainImage'
export const CANCEL           = 'imageClassifier.cancel'
export const SHOW_TRAINING    = 'imageClassifier.showTraining'
export const HIDE_TRAINING    = 'imageClassifier.hideTraining'
export const CAPTURE          = 'imageClassifier.capture'
export const FLAG             = 'imageClassifier.flag'
export const TOGGLE_SAVE_FLAG = 'imageClassifier.toggleSaveFlag'
export const LOAD             = 'imageClassifier.load'
export const SAVE             = 'imageClassifier.save'

export let initialize     = createAction(INITIALIZE)
export let reset          = createAction(RESET)
export let retrain        = createAction(RETRAIN)
export let cancelRetrain  = createAction(CANCEL_RETRAIN)
export let endRetrain     = createAction(END_RETRAIN)
export let retrainImage   = createAction(RETRAIN_IMAGE)
export let cancel         = createAction(CANCEL)
export let showTraining   = createAction(SHOW_TRAINING)
export let hideTraining   = createAction(HIDE_TRAINING)
export let capture        = createAction(CAPTURE)
export let flag           = createAction(FLAG)
export let toggleSaveFlag = createAction(TOGGLE_SAVE_FLAG)
export let load           = createAction(LOAD)
export let save           = createAction(SAVE)
