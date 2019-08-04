import { addReducerFor, replace, update } from '../../reducers'
import { INITIALIZE, PLAY } from './actions'
import Round from '../../rps/Round'
import Action from '../../common/Action'

export const STATE_KEY = 'computerPlayer'

export function initialize(state: any, action: Action) {
  return replace(state, STATE_KEY, {
    initialized: true,
    rounds: [],
    implementation: action.payload,
  })
}

export function play(state: any, action: Action) {
  let { rounds } = state[STATE_KEY]
  let { player1Move, player2Move, prediction } = action.payload

  rounds = rounds.concat(new Round(player1Move, player2Move))

  return update(state, STATE_KEY, {
    rounds,
    prediction
  })
}

//addReducerFor(PLAY,       play)
//addReducerFor(INITIALIZE, initialize)

addReducerFor({
  [PLAY]: play,
  [INITIALIZE]: initialize,
})
