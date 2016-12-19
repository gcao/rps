import * as actions from './actions'
import replace from '../../reducers/replace'
import update from '../../reducers/update'

export const STATE_KEY = 'home'

export default function reducers(state, {type, payload}) {
  switch (type) {
    case actions.INITIALIZE:
      return replace(state, STATE_KEY, {})

    case actions.START:
      return update(state, STATE_KEY, {started: true})

    case actions.PAUSE:
      return update(state, 'video', {paused: true})

    case actions.RESUME:
      return update(state, 'video', {paused: false})

    case actions.DESTROY:
      return replace(state, STATE_KEY)

    default:
      return state
  }
}
