import { ImageClassifierProxy } from '../../rps/image-classifier'

import { INITIALIZE, CAPTURE, FLAG } from './actions'

var imageClassifier

export default function reducers(state, action) {
  switch (action.type) {
    case INITIALIZE:
      let name = action.imageClassifier || 'DefaultImageClassifier'

      imageClassifier = new ImageClassifierProxy(window[name])
      return state

    case CAPTURE:
      imageClassifier.predict(action.image)

      return Object.assign({}, state, {
        image: action.image,
      })

    case FLAG:
      imageClassifier.train(action.image, action.imageClass)

      return Object.assign({}, state, {
        imageClass: action.imageClass,
      })

    default:
      return state
  }
}

