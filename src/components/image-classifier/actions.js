import { createAction } from 'redux-actions'

export const INITIALIZE       = 'imageClassifier.initialize'
export const RESET            = 'imageClassifier.reset'
export const RETRAIN          = 'imageClassifier.retrain'
export const RETRAIN_PROGRESS = 'imageClassifier.retrainProgress'
export const RETRAIN_CANCEL   = 'imageClassifier.retrainCancel'
export const RETRAIN_END      = 'imageClassifier.retrainEnd'
export const RETRAIN_IMAGE    = 'imageClassifier.retrainImage'
export const CANCEL           = 'imageClassifier.cancel'
export const SHOW_TRAINING    = 'imageClassifier.showTraining'
export const HIDE_TRAINING    = 'imageClassifier.hideTraining'
export const CAPTURE          = 'imageClassifier.capture'
export const FLAG             = 'imageClassifier.flag'
export const CLEAR_TRAINING   = 'imageClassifier.clearTraining'
export const TOGGLE_SAVE_FLAG = 'imageClassifier.toggleSaveFlag'
export const LOAD             = 'imageClassifier.load'
export const SAVE             = 'imageClassifier.save'

export let initialize      = createAction(INITIALIZE)
export let reset           = createAction(RESET)
export let retrain         = createAction(RETRAIN)
export let retrainProgress = createAction(RETRAIN_PROGRESS)
export let retrainCancel   = createAction(RETRAIN_CANCEL)
export let retrainEnd      = createAction(RETRAIN_END)
export let retrainImage    = createAction(RETRAIN_IMAGE)
export let cancel          = createAction(CANCEL)
export let showTraining    = createAction(SHOW_TRAINING)
export let hideTraining    = createAction(HIDE_TRAINING)
export let capture         = createAction(CAPTURE)
export let flag            = createAction(FLAG)
export let clearTraining   = createAction(CLEAR_TRAINING)
export let toggleSaveFlag  = createAction(TOGGLE_SAVE_FLAG)
export let load            = createAction(LOAD)
export let save            = createAction(SAVE)
