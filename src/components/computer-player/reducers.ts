import { addReducer } from '../../reducers'
import replace from '../../reducers/replace'
import update from '../../reducers/update'
import { INITIALIZE, PLAY } from './actions'
import Round from '../../rps/Round'
import Action from '../../common/Action'

export const STATE_KEY = 'computerPlayer'

export default function reducers(state: any, action: Action) {
  switch (action.type) {
    case INITIALIZE:
      let implementation = action.payload
      return replace(state, STATE_KEY, {
        initialized: true,
        rounds: [],
        implementation,
      })

    case PLAY:
      let { rounds } = state[STATE_KEY]
      let { player1Move, player2Move, prediction } = action.payload

      rounds = rounds.concat(new Round(player1Move, player2Move))

      return update(
        state,
        STATE_KEY,
        { rounds, prediction },
      )

    default:
      return state
  }
}

addReducer(reducers)