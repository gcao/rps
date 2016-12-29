import { addReducer } from '../../reducers'
import replace from '../../reducers/replace'
import update from '../../reducers/update'
import * as actions from './actions'

export const STATE_KEY = 'imageClassifier'

export default function reducers(state, action) {
  switch (action.type) {
    case actions.INITIALIZE:
      let implementation = action.payload
      return replace(state, STATE_KEY, {
        initialized: true,
        implementation,
      })

    case actions.CANCEL:
      return update(state, STATE_KEY, {
        showTraining: undefined,
      })

    case actions.SHOW_TRAINING:
      return update(state, STATE_KEY, {
        showTraining: true,
      })

    case actions.HIDE_TRAINING:
      return update(state, STATE_KEY, {
        showTraining: false,
      })

    case actions.FLAG:
    case actions.CAPTURE:
    case actions.TOGGLE_SAVE_FLAG:
      return update(state, STATE_KEY, action.payload)

    default:
      return state
  }
}
addReducer(reducers)
