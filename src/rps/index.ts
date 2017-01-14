import Move from './Move'

export function translate(name: string) {
  switch (name) {
    case 'rock': return Move.ROCK
    case 'paper': return Move.PAPER
    case 'scissors': return Move.SCISSORS
    default: return Move.DONTKNOW
  }
}

export function translateMove(move: Move): string {
  switch (move) {
    case Move.ROCK: return 'rock'
    case Move.PAPER: return 'paper'
    case Move.SCISSORS: return 'scissors'
    default: return 'dontknow'
  }
}

export function getRandomMove() {
  return Math.floor(Math.random() * 3)
}

export function computeResult(player1Move: Move, player2Move: Move): number {
  if (player1Move === player2Move) {
    return 0
  } else if (player1Move === (player2Move + 1) % 3) {
    return 1
  } else {
    return 2
  }
}

export function findWinningMoveAgainst(move: Move): number {
  return (move + 1) % 3
}