/* globals fetch */
import { translateMove } from '../../rps'
import { ImageClassifierProxy } from '../../rps/image-classifier'

export const initialize       = 'imageclassifier.initialize'
export const capture          = 'imageclassifier.capture'
export const flag             = 'imageclassifier.flag'
export const toggle_save_flag = 'imageclassifier.toggleSaveflag'
export const destroy          = 'imageclassifier.destroy'

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

export function flag(image, imageClass, saveFlag) {
  return dispatch => {
    if (saveFlag) {
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

export function toggleSaveFlag(saveFlag) {
  saveFlag = !saveFlag
  return {
    type: TOGGLE_SAVE_FLAG,
    payload: { saveFlag }
  }
}

export function destroy() {
  return {
    type: DESTROY,
  }
}
