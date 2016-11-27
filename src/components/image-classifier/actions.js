/* globals fetch */
import { translateMove } from '../../rps'
import { ImageClassifierProxy } from '../../rps/image-classifier'

export const INITIALIZE                = 'imageClassifier.initialize'
export const CAPTURE                   = 'imageClassifier.capture'
export const FLAG                      = 'imageClassifier.flag'
export const TOGGLE_SAVE_TRAINING_DATA = 'imageClassifier.toggleSaveTrainingData'
export const DESTROY                   = 'imageClassifier.destroy'

var imageClassifier

export function initialize(name) {
  // TODO validate action.name
  let implementation = window[name || 'DefaultImageClassifier']
  imageClassifier = new ImageClassifierProxy(implementation)

  return {
    type: INITIALIZE,
    payload: { name }
  }
}

export function capture(image) {
  let result = imageClassifier.predict(image)

  return {
    type: CAPTURE,
    payload: {
      image,
      before: result.prediction
    }
  }
}

export function flag(image, imageClass, saveTrainingData) {
  return dispatch => {
    if (saveTrainingData) {
      let saveAs = 'data/image-classifier/' + translateMove(imageClass) + (Math.random()*100000).toFixed(0) + '.json'
      fetch(saveAs, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(image),
      })
    }

    imageClassifier.train(image, imageClass)
    let result = imageClassifier.predict(image)

    dispatch({
      type: FLAG,
      payload: {
        imageClass,
        after: result.prediction
      }
    })
  }
}

export function toggleSaveTrainingData() {
  return {
    type: TOGGLE_SAVE_TRAINING_DATA,
  }
}

export function destroy() {
  return {
    type: DESTROY,
  }
}
