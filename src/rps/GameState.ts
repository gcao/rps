import Round from './Round'
import Move from './Move'

export default class GameState {
  rounds: Array<Round>

  constructor(rounds: Array<Round>) {
    this.rounds = rounds
  }

  getWinner(index: number): Move {
    if (index >= this.rounds.length) {
      return 0
    }

    let round: Round = this.rounds[index]
    if (round.player1Move === round.player2Move) {
      return 0
    } else if (round.player1Move === (round.player2Move + 1) % 3) {
      return 1
    } else {
      return 2
    }
  }

  getPlayer1WinningRate(n: number): number {
    if (this.rounds.length === 0) {
      return 0.5
    }

    let player1Score = 0
    let totalScore = 0

    if (!n || n <= 0 || n > this.rounds.length) {
      n = this.rounds.length
    }

    for (let i = this.rounds.length - n; i < this.rounds.length; i++) {
      totalScore += 2
      let winner = this.getWinner(i)
      if (winner === 1) {
        player1Score += 2
      } else if (winner === 0) {
        player1Score += 1
      }
    }

    return player1Score / totalScore
  }

  getPlayer2WinningRate(n: number): number {
    return 1 - this.getPlayer1WinningRate(n)
  }
}