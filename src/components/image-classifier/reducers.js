import { ImageClassifierProxy, DefaultImageClassifier } from '../../rps/image-classifier'

import { INITIALIZE } from './actions'

export default function reducers(state, action) {
  switch (action.type) {
    case INITIALIZE:
      return Object.assign({}, state, {
        imageClassifier: new ImageClassifierProxy(DefaultImageClassifier),
      })
    default:
      return state
  }
}

