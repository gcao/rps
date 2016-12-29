/* global fetch */
import { translateMove } from '../../rps'
import { default as _capture } from '../../common/capture'
import { getImageClassifier, setImageClassifier } from '../../common/image-classifier'
import { addHandler } from '../../handlers'
import * as actions from './actions'
import { STATE_KEY } from './reducers'

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
  let image      = store.getState()[STATE_KEY].image
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

// Note that the action is changed by previous handlers
addHandler(actions.FLAG, (action, {store}) => {
  let saveFlag = store.getState()[STATE_KEY].saveFlag
  if (saveFlag) {
    let image = store.getState()[STATE_KEY].image
    let { imageClass } = action
    let saveAs = 'data/image-classifier/' + translateMove(imageClass) + (Math.random()*100000).toFixed(0) + '.json'
    fetch(saveAs, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(image),
    })
  }

  return action
})

// This logic can be included in previous handler as well. However it might be better to separate this
addHandler(actions.FLAG, (action, {store}) => {
  setTimeout(() => store.dispatch(actions.hideTraining()), HIDE_TRAINING_TIMEOUT)
})
