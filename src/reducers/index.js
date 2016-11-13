import {
  PLAY
} from '../actions'

export default function reducers(state, action) {
  switch (action.type) {
  case PLAY:
    return Object.assign({}, state, {
    })
  default:
    return state
  }
}

