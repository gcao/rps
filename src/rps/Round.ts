import Move from './Move'

export default class Round {
  player1Move: Move
  player2Move: Move

  get result(): number {
    if (this.player1Move === this.player2Move) {
      return 0.5
    } else if (this.player1Move === (this.player2Move + 1) % 3) {
      return 1
    } else {
      return 0
    }
  }

  constructor(player1Move: Move, player2Move: Move) {
    this.player1Move = player1Move
    this.player2Move = player2Move
  }
}