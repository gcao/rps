import GameState from '../../rps/GameState'
import { addHandler } from '../../handlers'
import { getComputerPlayer, setComputerPlayer } from '../../common/computer-player'
import * as actions from './actions'
import { STATE_KEY } from './reducers'

addHandler(actions.INITIALIZE, (action) => {
  setComputerPlayer(action.payload)
})

addHandler(actions.PLAY, (action, {store}) => {
  let computerPlayer = getComputerPlayer()
  let move           = action.payload
  let rounds         = store.getState()[STATE_KEY].rounds
  let gameState      = new GameState(rounds)
  let before         = computerPlayer.predict(gameState)
  let computerMove   = before.winningMove

  computerPlayer.train(gameState, move)
  let after      = computerPlayer.predict(gameState)
  let prediction = {
    before: before,
    after:  after,
  }

  action.payload = {
    player1Move: move,
    player2Move: computerMove,
    prediction,
  }

  return action
})
