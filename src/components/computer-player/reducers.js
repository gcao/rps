import { addReducer } from '../../reducers'
import replace from '../../reducers/replace'
import update from '../../reducers/update'
import { INITIALIZE, PLAY } from './actions'

export const STATE_KEY = 'computerPlayer'

export default function reducers(state, action) {
  switch (action.type) {
    case INITIALIZE:
      return replace(state, STATE_KEY, action.payload)

    case PLAY:
      let { rounds }  = state
      let player1Move = action.payload.player1Move
      let player2Move = action.payload.player2Move
      let prediction  = action.payload.prediction

      rounds.push([player1Move, player2Move])

      return update(
        replace(state, 'rounds', rounds),
        STATE_KEY,
        { prediction },
      )

    default:
      return state
  }
}

addReducer(reducers)
