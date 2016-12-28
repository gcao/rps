import { default as _capture } from '../../common/capture'
import { addHandler } from '../../handlers'
import { ImageClassifierProxy } from '../../rps/image-classifier'
import * as actions from './actions'

const HIDE_TRAINING_TIMEOUT = 1500

let imageClassifier

export let initialize = (action) => {
  let implementation = window[action.payload || 'DefaultImageClassifier']
  imageClassifier    = new ImageClassifierProxy(implementation)
}
addHandler(initialize, actions.INITIALIZE)

export let capture = (action, {store}) => {
  let image  = _capture(document.querySelector('video'), document.querySelector('canvas'))
  let result = imageClassifier.predict(image)
  let before = result.prediction
  action.payload = Object.assign({}, action.payload, {
    image,
    before,
    after: undefined,
    captured: true,
    flagged: false,
    showTraining: true,
  })
  return action
}
addHandler(capture, actions.CAPTURE)

export let flag = (action, {store}) => {
  let image      = store.getState().imageClassifier.image
  let imageClass = action.payload

  imageClassifier.train(image, imageClass)

  let result = imageClassifier.predict(image)
  let after  = result.prediction

  action.payload = {
    imageClass,
    after,
    flagged: true,
  }
  return action
}
addHandler(flag, actions.FLAG)

// This logic can be included in flag() as well. However it might be better to separate this
export let hideTraining = (action, {store}) => {
  setTimeout(() => store.dispatch(actions.hideTraining()), HIDE_TRAINING_TIMEOUT)
}
addHandler(hideTraining, actions.FLAG)
