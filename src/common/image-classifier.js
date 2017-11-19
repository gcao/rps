import { ImageClassifierProxy } from '../rps/image-classifier'

let imageClassifier

export function setImageClassifier(implementation) {
  implementation = implementation || 'DefaultImageClassifier'

  if (imageClassifier && imageClassifier.implementation === implementation) {
    return
  }

  imageClassifier = new ImageClassifierProxy(window[implementation])
}

export function getImageClassifier() {
  if (!imageClassifier) {
    // TODO find out when this module is reloaded
    // debugger
    setImageClassifier()
  }
  return imageClassifier
}

if (module.hot) {
  module.hot.dispose(function() {
    debugger
  })
}
