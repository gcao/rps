import { WIDTH, HEIGHT } from '../../common'
import { addHandler } from '../../handlers'
import { ImageClassifierProxy } from '../../rps/image-classifier'
import { INITIALIZE, CAPTURE, FLAG, update } from './actions'

let imageClassifier

export let initialize = (action) => {
  if (action.type !== INITIALIZE) {
    return
  }

  let implementation = window[action.payload || 'DefaultImageClassifier']
  imageClassifier    = new ImageClassifierProxy(implementation)
}
addHandler(initialize)

export let capture = (action, {store}) => {
  if (action.type !== CAPTURE) {
    return
  }

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
addHandler(capture)

export let flag = (action, {store}) => {
  if (action.type !== FLAG) {
    return
  }

  let image      = store.getState().imageClassifier.image
  let imageClass = action.payload.imageClass

  imageClassifier.train(image, imageClass)

  let result = imageClassifier.predict(image)
  let after  = result.prediction

  action.payload = Object.assign({}, action.payload, {
    imageClass,
    after,
    flagged: true,
  })
  return action
}
addHandler(flag)

const SHOW_TRAINING_TIMEOUT = 1500

// This logic can be included in flag as well. However it might be better to separate this
export let hideTraining = (action, {store}) => {
  if (action.type !== FLAG) {
    return
  }

  setTimeout(() => store.dispatch(update({showTraining: false})), SHOW_TRAINING_TIMEOUT)
}
addHandler(hideTraining)

function _capture(video, canvas) {
  let ctx = canvas.getContext('2d')
  ctx.drawImage(video, 0, 0)

  let imagePixels = ctx.getImageData(0, 0, WIDTH, HEIGHT)
  let image = []
  for (var i=0; i<WIDTH; i++) {
    image[i] = []
    for (var j=0; j<HEIGHT; j++) {
      var pixelIndex = (i * 4) * HEIGHT + j * 4
      // http://www.ajaxblender.com/howto-convert-image-to-grayscale-using-javascript.html
      var grayScale = (imagePixels.data[pixelIndex] + imagePixels.data[pixelIndex + 1] + imagePixels.data[pixelIndex + 2])/3
      image[i].push(grayScale)
    }
  }

  return image
}
