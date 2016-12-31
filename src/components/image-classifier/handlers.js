/* global fetch */
import Rx from 'rxjs'
import { ROCK, PAPER, SCISSORS, UNKNOWN, translateMove } from '../../rps'
import { default as _capture } from '../../common/capture'
import { getImageClassifier, setImageClassifier } from '../../common/image-classifier'
import { addHandler } from '../../handlers'
import * as actions from './actions'
import { STATE_KEY } from './reducers'
import drawActivations from './drawActivations'

const HIDE_TRAINING_TIMEOUT = 1500
const RETRAIN_WAIT          = 500

addHandler(actions.INITIALIZE, action => {
  setImageClassifier(action.payload)
})

addHandler(actions.CAPTURE, (action, {store}) => {
  let image  = _capture(document.querySelector('video'), document.querySelector('canvas'))
  let result = getImageClassifier().predict(image)
  let before = result.prediction
  let layers = [1, 2].map(i => drawActivations(result.debug.layers[i]))
  action.payload = Object.assign({}, action.payload, {
    image,
    before,
    after: undefined,
    captured: true,
    flagged: false,
    showTraining: true,
    layers,
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

addHandler(actions.LOAD, (action, {store}) => {
  let { implementation } = store.getState()[STATE_KEY]
  let imageClassifier = getImageClassifier()
  let url = `models/${implementation}.json`
  fetch(url).then(resp => resp.json(data => imageClassifier.fromJSON(data)))
})

addHandler(actions.SAVE, (action, {store}) => {
  let { implementation } = store.getState()[STATE_KEY]
  let imageClassifier = getImageClassifier()
  let url = `models/${implementation}.json`
  fetch(url, {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(imageClassifier.toJSON()),
  })
})

// Use RxJs
// TODO show progress
// TODO show image and training result
// TODO support cancellation
addHandler(actions.RETRAIN, (action, {store}) => {
  let url = 'data/image-classifier/'
  fetch(url).then(resp => resp.json().then(urls => {
    urls = shuffle(urls)
    Rx.Observable.zip(
      Rx.Observable.from(urls).map(url => Rx.Observable.ajax.getJSON(url)),
      Rx.Observable.from(urls),
      Rx.Observable.range(1, urls.length),
      Rx.Observable.interval(RETRAIN_WAIT).takeWhile(() => store.getState()[STATE_KEY].retrain),
    ).subscribe(
      ([resp, url, progress]) => {
        // Handle cancellation
        if (!store.getState()[STATE_KEY].retrain) {
          return
        }

        let imageClass
        if (url.indexOf('rock') >= 0) {
          imageClass = ROCK
        } else if (url.indexOf('paper') >= 0) {
          imageClass = PAPER
        } else if (url.indexOf('scissors') >= 0) {
          imageClass = SCISSORS
        } else {
          imageClass = UNKNOWN
        }
        resp.subscribe(image => {
          // Handle cancellation
          if (!store.getState()[STATE_KEY].retrain) {
            return
          }

          store.dispatch(actions.retrainProgress(100 * progress / urls.length))
          store.dispatch(actions.retrainImage({image, imageClass}))
        })
      },
      null,
      () => {
        setTimeout(() => store.dispatch(actions.retrainEnd()), 500)
      }
    )
  }))
})

addHandler(actions.RETRAIN_IMAGE, (action, {store}) => {
  let { image, imageClass } = action.payload
  let imageClassifier = getImageClassifier()
  let result          = imageClassifier.predict(image)
  let before          = result.prediction

  imageClassifier.train(image, imageClass)

  result    = imageClassifier.predict(image)
  let after = result.prediction

  action.payload = Object.assign({}, action.payload, {
    before,
    after,
  })
  return action
})

function shuffle(array) {
  var counter = array.length

  // While there are elements in the array
  while (counter > 0) {
    // Pick a random index
    var index = Math.floor(Math.random() * counter)

    // Decrease counter by 1
    counter--

    // And swap the last element with it
    var temp = array[counter]
    array[counter] = array[index]
    array[index] = temp
  }

  return array
}
