import { addReducer } from '../../reducers'
import replace from '../../reducers/replace'
import update from '../../reducers/update'
import * as actions from './actions'

export const STATE_KEY = 'home'

export default function reducers(state, {type, payload}) {
  switch (type) {
    case actions.INITIALIZE:
      return replace(state, STATE_KEY, {
        initialized: true,
        rounds: [],
      })

    case actions.START:
      return update(state, STATE_KEY, {
        started: true,
      })

    case actions.STOP:
      return update(state, STATE_KEY, {
        started: false,
      })

    case actions.PAUSE:
      return update(state, STATE_KEY, {
        videoPaused: true,
      })

    case actions.RESUME:
      return update(state, STATE_KEY, {
        videoPaused: false,
      })

    case actions.DETECT:
      return update(state, STATE_KEY, {
        image: payload,
      })

    case actions.PLAY:
      let { rounds }  = state[STATE_KEY]
      let { player1Move, player2Move } = payload

      rounds = rounds.concat([player1Move, player2Move])

      return update(state, STATE_KEY, {
        rounds
      })

    default:
      return state
  }
}
addReducer(reducers)
