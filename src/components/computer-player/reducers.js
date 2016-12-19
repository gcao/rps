import { INITIALIZE, PLAY } from './actions'

export default function reducers(state, action) {
  switch (action.type) {
    case INITIALIZE:
      return Object.assign({}, state, {
        computerPlayer: {
          name: action.name,
        }
      })

    case PLAY:
      let { rounds } = state
      let player1Move = action.payload.player1Move
      let player2Move = action.payload.player2Move
      let prediction = action.payload.prediction
      rounds.push([player1Move, player2Move])

      return Object.assign({}, state, {
        rounds,
        computerPlayer: Object.assign({}, state.computerPlayer, {
          prediction,
        })
      })

    default:
      return state
  }
}

