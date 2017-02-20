import Move from '../Move'

export default class Prediction {
  probabilities: Array<number>
  debugInfo: any

  get myMove(): Move {
    let p = this.probabilities
    let move = p.indexOf(Math.max(p[0], p[1], p[2]))
    return move
  }

  get winningMove(): Move {
    return findWinningMoveAgainst(this.myMove)
  }

  get maxProbability(): number {
    return Math.max(...this.probabilities)
    // let max = 0
    // this.probabilities.forEach(probability => {
    //   if (max < probability) {
    //     max = probability
    //   }
    // })
    // return max
  }

  constructor(probabilities: Array<number>, debugInfo?: any) {
    this.probabilities = probabilities
    this.debugInfo = debugInfo
  }
}

function findWinningMoveAgainst(move: Move): Move {
  if (move === Move.DONTKNOW) {
    return Move.DONTKNOW
  } else {
    return (move + 1) % 3
  }
}