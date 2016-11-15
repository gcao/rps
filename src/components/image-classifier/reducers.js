import { ImageClassifierProxy, DefaultImageClassifier } from '../../rps/image-classifier'

import { INITIALIZE, CAPTURE } from './actions'

export default function reducers(state, action) {
  switch (action.type) {
    case INITIALIZE:
      return Object.assign({}, state, {
        imageClassifier: new ImageClassifierProxy(DefaultImageClassifier),
      })
    case CAPTURE:
      return Object.assign({}, state, {
        image: action.image,
      })
    default:
      return state
  }
}

