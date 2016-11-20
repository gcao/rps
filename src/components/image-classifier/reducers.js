import { ImageClassifierProxy } from '../../rps/image-classifier'

import { INITIALIZE, CAPTURE, FLAG } from './actions'

var imageClassifier

export default function reducers(state, action) {
  switch (action.type) {
    case INITIALIZE:
      // TODO validate action.name
      let implementation = window[action.name || 'DefaultImageClassifier']
      imageClassifier = new ImageClassifierProxy(implementation)

      return update(state, {
        name: action.name,
      })

    case CAPTURE:
      let prediction = imageClassifier.predict(action.image)

      return update(state, {
        image: action.image,
        prediction,
      })

    case FLAG:
      imageClassifier.train(action.image, action.imageClass)

      return update(state, {
        imageClass: action.imageClass,
      })

    default:
      return state
  }
}

function update(state, update) {
  return Object.assign({}, state, {
    imageClassifier: Object.assign({}, state.imageClassifier, update)
  })
}
