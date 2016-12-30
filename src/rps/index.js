export var ROCK     = 0
export var PAPER    = 1
export var SCISSORS = 2
export var UNKNOWN  = 3

export function translate(name) {
  switch (name) {
    case 'rock':      return ROCK
    case 'paper':     return PAPER
    case 'scissors':  return SCISSORS
    default:          return UNKNOWN
  }
}

export function translateMove(move) {
  switch (move) {
    case ROCK:      return 'rock'
    case PAPER:     return 'paper'
    case SCISSORS:  return 'scissors'
    default:        return 'unknown'
  }
}

export function getRandomMove() {
  return Math.floor(Math.random()*3)
}

export function computeResult(player1Move, player2Move) {
  if (player1Move === player2Move) {
    return 0
  } else if (player1Move === (player2Move + 1) % 3) {
    return 1
  } else {
    return 2
  }
}

export function findWinningMoveAgainst(move) {
  return (move + 1) % 3
}

