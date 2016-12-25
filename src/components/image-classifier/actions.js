import { createAction } from 'redux-actions'
import { WIDTH, HEIGHT } from '../../common'
import { addHandler } from '../../handlers'
import { ImageClassifierProxy } from '../../rps/image-classifier'

export const INITIALIZE       = 'imageClassifier.initialize'
export const UPDATE           = 'imageClassifier.update'
export const CAPTURE          = 'imageClassifier.capture'
export const FLAG             = 'imageClassifier.flag'
export const TOGGLE_SAVE_FLAG = 'imageClassifier.toggleSaveFlag'

export let initialize     = createAction(INITIALIZE)
export let update         = createAction(UPDATE)
export let capture        = createAction(CAPTURE)
export let flag           = createAction(FLAG)
export let toggleSaveFlag = createAction(TOGGLE_SAVE_FLAG)

let imageClassifier

addHandler((action, {store}) => {
  if (action.type === INITIALIZE) {
    let implementation = window[action.payload || 'DefaultImageClassifier']
    imageClassifier    = new ImageClassifierProxy(implementation)
  } else if (action.type === CAPTURE) {
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
  } else if (action.type === FLAG) {
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
})

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
