import { TOGGLE_SAVE_TRAINING_DATA } from './actions'

const REPLACE_STATE_PATTERN = /^imageClassifier\.[initialize|destroy]$/
const UPDATE_STATE_PATTERN  = /^imageClassifier/

export default function reducers(state, action) {
  if (TOGGLE_SAVE_TRAINING_DATA === action.type) {
    let saveTrainingData = state.imageClassifier && state.imageClassifier.saveTrainingData

    return Object.assign({}, state, {
      imageClassifier: Object.assign({}, state.imageClassifier, { saveTrainingData })
    })
  } else if (REPLACE_STATE_PATTERN.test(action.type)) {
    return Object.assign({}, state, {
      imageClassifier: action.payload
    })
  } else if (UPDATE_STATE_PATTERN.test(action.type)) {
    return Object.assign({}, state, {
      imageClassifier: Object.assign({}, state.imageClassifier, action.payload)
    })
  } else {
    return state
  }
}

