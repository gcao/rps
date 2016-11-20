import { ImageClassifierProxy } from '../../rps/image-classifier'

import { INITIALIZE, CAPTURE, FLAG } from './actions'

var imageClassifier

export default function reducers(state, action) {
  let image
  let result

  switch (action.type) {
    case INITIALIZE:
      // TODO validate action.name
      let implementation = window[action.name || 'DefaultImageClassifier']
      imageClassifier = new ImageClassifierProxy(implementation)

      return update(state, {
        name: action.name,
      })

    case CAPTURE:
      result = imageClassifier.predict(action.image)

      return update(state, {
        image: action.image,
        before: result.prediction,
        after: undefined,
      })

    case FLAG:
      image = state.imageClassifier.image
      imageClassifier.train(image, action.imageClass)
      result = imageClassifier.predict(image)

      return update(state, {
        imageClass: action.imageClass,
        after: result.prediction,
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
