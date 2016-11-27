const REPLACE_STATE_PATTERN = /^imageClassifier\.(initialize|destroy)$/
const UPDATE_STATE_PATTERN  = /^imageClassifier/

export default function reducers(state, action) {
  if (REPLACE_STATE_PATTERN.test(action.type)) {
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

