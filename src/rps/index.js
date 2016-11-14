import jQuery from 'jquery'

export var ROCK     = 0
export var PAPER    = 1
export var SCISSORS = 2
export var UNKNOWN  = 3

var loadAndSave = location.toString().indexOf('loadAndSave') >= 0
var logNet      = location.toString().indexOf('logNet')      >= 0
var debugNet    = location.toString().indexOf('debugNet')    >= 0

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

export function shuffle(array) {
  var counter = array.length

  // While there are elements in the array
  while (counter > 0) {
    // Pick a random index
    var index = Math.floor(Math.random() * counter)

    // Decrease counter by 1
    counter--

    // And swap the last element with it
    var temp = array[counter]
    array[counter] = array[index]
    array[index] = temp
  }

  return array
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

export function showRound(player1Move, player2Move, result) {
  var resultClass = ''
  switch (result) {
    case 0:
      resultClass = 'draw'
      break
    case 1:
      resultClass = 'player1'
      break
    case 2:
      resultClass = 'player2'
      break
  }

  jQuery('.results').prepend('<div class="round ' + resultClass + '" style="display:none;"><div class="player1 ' + translateMove(player1Move) + '"></div><div class="vs"></div><div class="player2 ' + translateMove(player2Move) + '"></div></div>')
  jQuery('.results > :first-child').slideDown(600, 'swing')
}

export function toPercentage(val, digitsAfterDot) {
  digitsAfterDot = digitsAfterDot || 2
  return (val * 100).toFixed(digitsAfterDot) + "%"
}
