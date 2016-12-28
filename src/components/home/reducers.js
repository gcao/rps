import { addReducer } from '../../reducers'
import replace from '../../reducers/replace'
import update from '../../reducers/update'
import * as actions from './actions'

export const STATE_KEY = 'home'

export default function reducers(state, {type, payload}) {
  switch (type) {
    case actions.START:
      return update(state, STATE_KEY, {started: true})

    case actions.STOP:
      return update(state, STATE_KEY, {started: false})

    case actions.PAUSE:
      return update(state, 'video', {paused: true})

    case actions.RESUME:
      return update(state, 'video', {paused: false})

    case actions.DETECT:
      return update(state, STATE_KEY, {image: payload})

    case actions.DESTROY:
      return replace(state, STATE_KEY)

    default:
      return state
  }
}
addReducer(reducers)
