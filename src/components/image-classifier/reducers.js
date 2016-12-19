import replace from '../../reducers/replace'
import update from '../../reducers/update'

const REPLACE_STATE_PATTERN = /^imageClassifier\.(initialize|destroy)$/
const UPDATE_STATE_PATTERN  = /^imageClassifier/

export const STATE_KEY = 'imageClassifier'

export default function reducers(state, action) {
  if (REPLACE_STATE_PATTERN.test(action.type)) {
    return replace(state, STATE_KEY, action.payload)
  } else if (UPDATE_STATE_PATTERN.test(action.type)) {
    return update(state, STATE_KEY, action.payload)
  } else {
    return state
  }
}

