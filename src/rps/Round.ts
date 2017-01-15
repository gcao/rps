import Move from './Move'

export default class Round {
  player1Move: Move
  player2Move: Move

  constructor(player1Move: Move, player2Move: Move) {
    this.player1Move = player1Move
    this.player2Move = player2Move
  }
}