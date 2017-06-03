/* global fetch */
import Rx from 'rxjs'
import { ROCK, PAPER, SCISSORS, UNKNOWN, translateMove } from '../../rps'
import { default as _capture } from '../../common/capture'
import { getImageClassifier, setImageClassifier } from '../../common/image-classifier'
import { addHandler, removeHandlers } from '../../handlers'
import * as actions from './actions'
import { STATE_KEY } from './reducers'

const HIDE_TRAINING_TIMEOUT = 1500
const RETRAIN_WAIT          = 500
const LAYERS_TO_VISUALIZE   = [1, 2, 3, 4, 5, 6]

export function initialize(action) {
  setImageClassifier(action.payload)
}

export function capture(action, {store}) {
  let image  = _capture(document.querySelector('video'), document.querySelector('canvas'))
  let result = getImageClassifier().predict(image)
  let before = result.prediction
  let layers = LAYERS_TO_VISUALIZE.map(i => result.debug.layers[i])

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
}

export function flag(action, {store}) {
  let image      = store.getState()[STATE_KEY].image
  let imageClass = action.payload

  getImageClassifier().train(image, imageClass)

  let result = getImageClassifier().predict(image)
  let after  = result.prediction
  let layers = LAYERS_TO_VISUALIZE.map(i => result.debug.layers[i])

  action.payload = {
    imageClass,
    after,
    flagged: true,
    layers,
  }
  return action
}

export function flag2(action, {store}) {
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
}

export function flag3(action, {store}) {
  setTimeout(() => store.dispatch(actions.hideTraining()), HIDE_TRAINING_TIMEOUT)
}

export function clearTraining(action, {store}) {
  fetch('data/image-classifier', {method: 'DELETE'})
}

export function load(action, {store}) {
  let { implementation } = store.getState()[STATE_KEY]
  let imageClassifier = getImageClassifier()
  let url = `models/${implementation}.json`
  fetch(url).then(resp => resp.json(data => imageClassifier.fromJSON(data)))
}

export function save(action, {store}) {
  let { implementation } = store.getState()[STATE_KEY]
  let imageClassifier = getImageClassifier()
  let url = `models/${implementation}.json`
  fetch(url, {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(imageClassifier.toJSON()),
  })
}

// Use RxJs
// TODO show progress
// TODO show image and training result
// TODO support cancellation
export function retrain(action, {store}) {
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
}

export function retrainImage(action, {store}) {
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
}

let handlers = []

export function registerHandlers() {
  handlers.push(addHandler(actions.INITIALIZE, initialize))
  handlers.push(addHandler(actions.CAPTURE, capture))
  handlers.push(addHandler(actions.FLAG, flag))
  // Note that the action is changed by previous handlers
  handlers.push(addHandler(actions.FLAG, flag2))
  // This logic can be included in previous handler as well. However it might be better to separate this
  handlers.push(addHandler(actions.FLAG, flag3))
  handlers.push(addHandler(actions.CLEAR_TRAINING, clearTraining))
  handlers.push(addHandler(actions.LOAD, load))
  handlers.push(addHandler(actions.SAVE, save))
  handlers.push(addHandler(actions.RETRAIN, retrain))
  handlers.push(addHandler(actions.RETRAIN_IMAGE, retrainImage))
}

export function deregisterHandlers() {
  removeHandlers(handlers)
}

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
