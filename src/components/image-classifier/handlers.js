import { default as _capture } from '../../common/capture'
import { getImageClassifier, setImageClassifier } from '../../common/image-classifier'
import { addHandler } from '../../handlers'
import * as actions from './actions'

const HIDE_TRAINING_TIMEOUT = 1500

addHandler(actions.INITIALIZE, action => {
  setImageClassifier(action.payload)
})

addHandler(actions.CAPTURE, (action, {store}) => {
  let image  = _capture(document.querySelector('video'), document.querySelector('canvas'))
  let result = getImageClassifier().predict(image)
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
})

addHandler(actions.FLAG, (action, {store}) => {
  let image      = store.getState().imageClassifier.image
  let imageClass = action.payload

  getImageClassifier().train(image, imageClass)

  let result = getImageClassifier().predict(image)
  let after  = result.prediction

  action.payload = {
    imageClass,
    after,
    flagged: true,
  }
  return action
})

// This logic can be included in previous handler as well. However it might be better to separate this
addHandler(actions.FLAG, (action, {store}) => {
  setTimeout(() => store.dispatch(actions.hideTraining()), HIDE_TRAINING_TIMEOUT)
})
