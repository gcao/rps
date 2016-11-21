/* globals fetch */
import { ImageClassifierProxy } from '../../rps/image-classifier'

import {
  translateMove,
} from '../../rps'

import * as actions from './actions'

var imageClassifier

export default function reducers(state, action) {
  let image
  let imageClass
  let result

  switch (action.type) {
    case actions.INITIALIZE:
      // TODO validate action.name
      let implementation = window[action.name || 'DefaultImageClassifier']
      imageClassifier = new ImageClassifierProxy(implementation)

      return Object.assign({}, state, {
        imageClassifier: {
          name: action.name
        }
      })

    case actions.CAPTURE:
      result = imageClassifier.predict(action.image)

      return update(state, {
        image: action.image,
        before: result.prediction,
        after: undefined,
      })

    case actions.FLAG:
      image = state.imageClassifier.image
      imageClass = action.imageClass

      if (state.saveTrainingData) {
        var saveAs = 'data/image-classifier/' + translateMove(imageClass) + (Math.random()*100000).toFixed(0) + '.json'
        fetch(saveAs, {
          method: 'POST',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify(image),
        })
      }

      imageClassifier.train(image, action.imageClass)
      result = imageClassifier.predict(image)

      return update(state, {
        imageClass: action.imageClass,
        after: result.prediction,
      })

    case actions.UPDATE:
      return update(state, action.payload)

    case actions.DESTROY:
      return Object.assign({}, state, {
        imageClassifier: undefined
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
